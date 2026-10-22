import { loadData, saveData } from './storage.js';
import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import AddStarterForm from "./components/start/AddStarterForm.js";
import EditStarterForm from "./components/start/EditStarterForm.js";
import FeedingForm from "./components/start/FeedingForm.js";
import ActiveLoafItem from "./components/bake/ActiveLoafItem.js";
import BakeHistoryItem from "./components/bake/BakeHistoryItem.js";
import RecipeSelector from "./components/bake/RecipeSelector.js";
import SaveRecipeForm from "./components/bake/SaveRecipeForm.js";
import AddInGroup from "./components/bake/AddInGroup.js";
import LoafCountControl from "./components/bake/LoafCountControl.js";
import IngredientChecklistItem from "./components/bake/IngredientChecklistItem.js";
import AppNavbar from "./components/shared/AppNavbar.js";
import AppFooter from "./components/shared/AppFooter.js";
import LoafMascotForm from './components/bake/LoafMascotForm.js';
import AppToast from './components/shared/AppToast.js';
import bakeSteps from "./data/bakeSteps.js";
import recipes from './data/recipes.js';
import { addInGroups, addIns } from './data/addIns.js';

createApp({
    components: {
        AppNavbar,
        AppFooter,
        AddStarterForm,
        EditStarterForm,
        FeedingForm,
        ActiveLoafItem,
        BakeHistoryItem,
        RecipeSelector,
        SaveRecipeForm,
        AddInGroup,
        LoafCountControl,
        IngredientChecklistItem,
        LoafMascotForm,
        AppToast
    },
    data: function () {
        return {
            bakeView: 'plan',
            selectedStarterId: 1, //Track which starter is selected.
            nextStarterId: 3, //For handling added starters.
            starters: [ //Example starters
                {
                    id: 1,
                    name: 'Doughlene',
                    description: 'Mother Starter',
                    status: 'Active',
                    age: '15 years, 6 months',
                    lastFed: 'Today at 8:00 AM',
                    feedingRatio: '1:2:2',
                    flour: 'Kirkland All-Purpose Unbleached',
                    nextFeedingCountdown: '7h 45m',
                    nextFeedingTime: 'Today at 4:00 PM'
                },
                {
                    id: 2,
                    name: 'Rustic Levain',
                    description: 'From Doughlene',
                    status: 'Active',
                    age: '1 day',
                    lastFed: 'Today at 8:00 AM',
                    feedingRatio: '1:2:2',
                    flour: 'Kirkland All-Purpose Unbleached',
                    nextFeedingCountdown: '11h 45m',
                    nextFeedingTime: 'Today at 8:00 PM'
                }
            ],

            selectedRecipeId: '',     //Track the selected recipe.
            nextRecipeId: 1,
            highlightRecipeSelection: false,
            loafCount: 1,
            selectedLoafImage: 'TheSourBro.png',
            customIngredients: {    //Starting ingredient amounts for custom recipes, measured per loaf (avoids confusion)
                starter: 100,
                water: 350,
                flour: 500,
                salt: 10
            },
            recipes: recipes,
            addInGroups: addInGroups,
            addIns: addIns,
            selectedAddInIds: [],
            nextOtherIngredientId: 1,
            readyIngredients: [],

            nextActiveLoafId: 1,
            activeLoaves: [],
            bakeSteps: bakeSteps,

            nextHistoryId: 1,
            bakeHistory: [],
            batchName: '',
        };
    },
    created() {
        const savedData = loadData();

        if (!savedData || typeof savedData !== 'object') return;

        for (const key of Object.keys(this.savedState)) {
            if (Object.hasOwn(savedData, key)) {
                this[key] = savedData[key];
            }
        }
    },

    watch: {
        savedState: {
            deep: true,
            handler(data) {
                saveData(data);
            }
        }
    },

    computed: {     //Compute values from the data. Vue recalculates when the data changes.
        selectedStarter() {     //Find the starter whose id matches the selectedStarterId for displaying.
            return this.starters.find(starter => starter.id === this.selectedStarterId);
        },
        selectedRecipe() {  //find() gets the one recipe whose id matches current selection.
            return this.recipes.find(recipe => recipe.id === this.selectedRecipeId) || null;
        },
        currentIngredients() {  //Use the selected recipe's amounts, or the custom amounts when making custom recipe.
            if (this.selectedRecipe) {
                return this.selectedRecipe.ingredients;
            }
            return this.customIngredients;
        },
        scaledIngredients() {   //Multiply each per-loaf ingredient amount by the number of loaves.
            return {
                starter: this.currentIngredients.starter * this.loafCount,
                water: this.currentIngredients.water * this.loafCount,
                flour: this.currentIngredients.flour * this.loafCount,
                salt: this.currentIngredients.salt * this.loafCount
            };
        },
        hydrationPercentage() {     //Estimate hydration, water divided by flour, then rounded to a whole percentage.
            if (!this.recipeAmountsValid) return null;

            return Math.round((this.currentIngredients.water / this.currentIngredients.flour) * 100);
        },
        selectedAddIns() {  //Keep checked add-ins, calculate each one's total grams per batch.
            return this.addIns
                .filter(addIn => this.selectedAddInIds.includes(addIn.id))
                .map(addIn => ({
                    id: addIn.id,
                    name: addIn.name,
                    totalGrams: addIn.gramsPerLoaf * this.loafCount
                }));
        },
        checklistIngredients() {
            const requiredIngredients = [
                {
                    id: 'starter',
                    name: 'Active starter',
                    grams: this.scaledIngredients.starter
                },
                {
                    id: 'water',
                    name: 'Water',
                    grams: this.scaledIngredients.water
                },
                {
                    id: 'flour',
                    name: 'Flour',
                    grams: this.scaledIngredients.flour
                },
                {
                    id: 'salt',
                    name: 'Salt',
                    grams: this.scaledIngredients.salt
                }
            ];

            const selectedAddInIngredients = this.selectedAddIns.map(
                addIn => ({
                    id: addIn.id,
                    name: addIn.name,
                    grams: addIn.totalGrams
                })
            );
            return [
                ...requiredIngredients,
                ...selectedAddInIngredients
            ];
        },
        recipeAmountsValid() {
            const amounts = this.currentIngredients;

            return (
                Number.isFinite(amounts.starter) && amounts.starter >= 1 &&
                Number.isFinite(amounts.water) && amounts.water >= 1 &&
                Number.isFinite(amounts.flour) && amounts.flour >= 1 &&
                Number.isFinite(amounts.salt) && amounts.salt >= 0
            );
        },

        savedState() {
            return {
                starters: this.starters,
                selectedStarterId: this.selectedStarterId,
                nextStarterId: this.nextStarterId,

                recipes: this.recipes,
                nextRecipeId: this.nextRecipeId,

                addIns: this.addIns,
                nextOtherIngredientId: this.nextOtherIngredientId,

                activeLoaves: this.activeLoaves,
                nextActiveLoafId: this.nextActiveLoafId,

                bakeHistory: this.bakeHistory,
                nextHistoryId: this.nextHistoryId
            };
        },
    },

    methods: {
        changeLoafImage(image) {
            this.selectedLoafImage = image;

            if (this.selectedRecipe) {
                this.selectedRecipe.image = image;
            }
        },
        saveEditingStarter(starterChanges) {
            if (!starterChanges) return;

            const starter = this.starters.find(starter => starter.id === starterChanges.id);

            if (!starter) return;

            starter.name = starterChanges.name;
            starter.description = starterChanges.description;
            starter.feedingRatio = starterChanges.feedingRatio;
            starter.flour = starterChanges.flour;
            starter.image = starterChanges.image;
            this.$refs.toast.show(starter.name + ' updated.');
        },
        selectStarter(id) {     //Change the selected starter and close any open delete confirmation.
            this.selectedStarterId = id;
        },
        saveFeeding(starterChanges) {     //Update the matching starter with the changes emitted by FeedingForm.
           if (!starterChanges) return;

           const starter = this.starters.find(starter => starter.id === starterChanges.id);

           if (!starter) return;

           starter.lastFed = starterChanges.lastFed;
           starter.feedingRatio = starterChanges.feedingRatio;
           starter.nextFeedingCountdown = starterChanges.nextFeedingCountdown;
           starter.nextFeedingTime = starterChanges.nextFeedingTime;
           starter.status = starterChanges.status;
            this.$refs.toast.show('Feeding logged for ' + starter.name + '.');
        },
        //Receive validated values from AddStarterForm, create the record, and update the main array. PARENT
        addStarter(formValues) {  //Create starter from "Add Starter" form.
            const source = this.starters.find(  //Look up the source of the starter if Levain is chosen.
                starter => starter.id === formValues.sourceId
            );

            const starter = {   //Build new record. ? : if/else choices set its description based on type and source.
                id: this.nextStarterId,
                name: formValues.name,
                image: formValues.image || 'SmilingSourdoughStarter.png',
                description: formValues.type === 'mother'
                    ? 'Mother Starter'
                    : source ? `From ${source.name}` : 'Recipe Levain',
                status: 'New',
                age: 'Just created',
                lastFed: 'Not fed yet',
                feedingRatio: formValues.feedingRatio,
                flour: formValues.flour,
                nextFeedingCountdown: 'Not scheduled',
                nextFeedingTime: 'Not scheduled'
            };
            this.starters.push(starter);    //Add the record to the array, then show it as the selected starter.
            this.nextStarterId += 1;
            this.selectedStarterId = starter.id;
        },
        deleteSelectedStarter() {
            this.starters = this.starters.filter(
                starter => starter.id !== this.selectedStarterId
            );

            this.selectedStarterId = this.starters.length > 0
                ? this.starters[0].id
                : null;
        },
        //Apply the validated count emitted by LoafCountControl.
        updateLoafCount(newCount) {
            this.loafCount = newCount;
            this.readyIngredients = [];
        },
        bakeAgain(bake) {
            this.selectedRecipeId = bake.recipeId;
            this.selectRecipe();
            this.loafCount = bake.loafCount || 1;

            this.restoreBakeIngredients(bake);

            this.batchName = bake.nickname || bake.name;
            this.selectedLoafImage = bake.image || 'TheSourBro.png';
            this.highlightRecipeSelection = true;
            this.bakeView = 'plan';
        },
        restoreBakeIngredients(bake) {
            if (!bake.ingredients || !bake.ingredients.length) return;

            const amounts = {};
            const addIns = [];

            for (const ingredient of bake.ingredients) {
                if (this.isMixIngredient(ingredient)) {
                    amounts[ingredient.name.toLowerCase()] = ingredient.grams / this.loafCount;
                } else {
                    addIns.push(ingredient);
                }
            }

            this.restoreRecipeAmounts(amounts);
            this.restoreBakeAddIns(addIns);
        },
        isMixIngredient(ingredient) {
            const name = ingredient.name.toLowerCase();

            return !ingredient.isAddIn &&
                ['starter', 'water', 'flour', 'salt'].includes(name);
        },
        restoreRecipeAmounts(amounts) {
            const recipe = this.selectedRecipe;

            if (!recipe ||
                recipe.ingredients.starter !== amounts.starter ||
                recipe.ingredients.water !== amounts.water ||
                recipe.ingredients.flour !== amounts.flour ||
                recipe.ingredients.salt !== amounts.salt) {
                this.customIngredients = amounts;
                this.selectedRecipeId = 'custom';
            }
        },
        restoreBakeAddIns(ingredients) {
            this.selectedAddInIds = [];

            for (const ingredient of ingredients) {
                const gramsPerLoaf = ingredient.grams / this.loafCount;
                const addIn = this.addIns.find(item =>
                    item.name === ingredient.name && item.gramsPerLoaf === gramsPerLoaf
                );

                if (addIn) {
                    this.selectedAddInIds.push(addIn.id);
                } else {
                    this.addOtherIngredient({ name: ingredient.name, group: 'Other', gramsPerLoaf });
                }
            }
        },
        //Delete the requested record after DeleteConfirmation emits confirm.
        confirmDelete(type, itemId) {
            if (!type || itemId === undefined || itemId === null) {
                return;
            }

            if (type === 'bake') {
                this.bakeHistory = this.bakeHistory.filter(bake => bake.id !== itemId);
            }

            if (type === 'recipe') {
                this.recipes = this.recipes.filter(
                    recipe => recipe.id !== itemId
                );

                if (this.selectedRecipeId === itemId) {
                    this.selectedRecipeId = '';
                    this.selectRecipe();
                }
            }
        },
        saveEditingBake(bakeChanges) {
            if (!bakeChanges) return;

            const bake = this.bakeHistory.find(bake => bake.id === bakeChanges.id);

            if (!bake) return;

            bake.nickname = bakeChanges.nickname;
            bake.bakedDateInput = bakeChanges.bakedDateInput;
            bake.bakedDate = bakeChanges.bakedDate;
            bake.rating = bakeChanges.rating;
            bake.hydrationInput = bakeChanges.hydrationInput;
            bake.hydration = bakeChanges.hydration;
            bake.bulkTime = bakeChanges.bulkTime;
            bake.coldProof = bakeChanges.coldProof;
            bake.notes = bakeChanges.notes;
            bake.image = bakeChanges.image;
            this.$refs.toast.show((bake.nickname || bake.name) + ' updated.');
        },
        //Add the recipe emitted by SaveRecipeForm to the parent-owned array.
        saveNewRecipe(recipeName) {
            if (!this.recipeAmountsValid) return;
            const name = typeof recipeName === 'string'
                ? recipeName.trim()
                : '';

            if (name === '') {
                return;
            }

            const newRecipe = {
                id: 'saved-' + this.nextRecipeId,
                name: name,
                type: 'saved',
                ingredients: { ...this.currentIngredients },
                addInIds: [...this.selectedAddInIds],
                image: this.selectedLoafImage
            };

            this.recipes.push(newRecipe);
            this.nextRecipeId += 1;
            this.selectedRecipeId = newRecipe.id;
        },

        // Apply the edited name only to a saved recipe.
        //Apply validated changes emitted by RecipeManagerForm.
        saveRecipeDetails(recipeChanges) {
            if (!recipeChanges) {
                return;
            }

            const recipe = this.recipes.find(
                recipe => recipe.id === recipeChanges.id
            );

            if (!recipe || recipe.type !== 'saved') {
                return;
            }

            recipe.name = recipeChanges.name;
        },
        // Add a custom ingredient to the category where it was entered.
        addOtherIngredient(ingredientValues) {
            if (!ingredientValues) {
                return;
            }

            const name = ingredientValues.name.trim();
            const group = ingredientValues.group;
            const grams = Number(ingredientValues.gramsPerLoaf);

            if (
                name === '' ||
                !group ||
                !Number.isFinite(grams) ||
                grams <= 0
            ) {
                return;
            }

            const addIn = {
                id: 'other-' + this.nextOtherIngredientId,
                name: name,
                group: group,
                gramsPerLoaf: grams
            };

            this.addIns.push(addIn);
            this.nextOtherIngredientId += 1;

            this.selectedAddInIds.push(addIn.id);
        },
        syncReadyAddIns() { //Unchecking an add-in also clears its prep checkmark.
            this.readyIngredients = this.readyIngredients.filter(id =>
                ['starter', 'water', 'flour', 'salt'].includes(id) || this.selectedAddInIds.includes(id)
            );
        },
        toggleReadyIngredient(ingredientId) {
            if (this.readyIngredients.includes(ingredientId)) {
                this.readyIngredients =
                    this.readyIngredients.filter(
                        readyId => readyId !== ingredientId
                    );
            } else {
                this.readyIngredients.push(ingredientId);
            }
        },
        toggleAddIn(addInId) {
            if (this.selectedAddInIds.includes(addInId)) {
                this.selectedAddInIds =
                    this.selectedAddInIds.filter(
                        selectedId => selectedId !== addInId
                    );
            } else {
                this.selectedAddInIds.push(addInId);
            }

            this.syncReadyAddIns();
        },
        selectRecipe(recipeId) {
            if (recipeId !== undefined) {
                this.selectedRecipeId = recipeId;
            }
            this.batchName = '';

            this.selectedLoafImage = this.selectedRecipe
                ? this.selectedRecipe.image || 'TheSourBro.png'
                : 'TheSourBro.png';

            this.highlightRecipeSelection = false;
            this.readyIngredients = [];

            if (this.selectedRecipe && this.selectedRecipe.addInIds) {
                this.selectedAddInIds = [...this.selectedRecipe.addInIds];
            } else {
                this.selectedAddInIds = [];
            }
        },
        startNewBake() {
            if (!this.recipeAmountsValid) return;
            const recipeName = this.batchName || (
                this.selectedRecipe
                    ? this.selectedRecipe.name
                    : 'Custom Recipe'
            );

            this.activeLoaves.push({
                id: this.nextActiveLoafId,
                name: recipeName,
                recipeId: this.selectedRecipeId,
                image: this.selectedLoafImage,
                hydration: this.hydrationPercentage,
                loafCount: this.loafCount,
                started: 'Just now',
                currentStep: 1,
                nextCheck: 'when mixing is complete',
                notes: '',
                foldRounds: [],

                // Keep this bake's amounts even if the planner changes later.
                ingredients: [
                    { name: 'Starter', grams: this.scaledIngredients.starter },
                    { name: 'Water', grams: this.scaledIngredients.water },
                    { name: 'Flour', grams: this.scaledIngredients.flour },
                    { name: 'Salt', grams: this.scaledIngredients.salt },

                    ...this.selectedAddIns.map(addIn => ({
                        name: addIn.name,
                        grams: addIn.totalGrams,
                        isAddIn: true
                    }))
                ]
            });

            this.nextActiveLoafId += 1;
            this.bakeView = 'active';
        },
        saveFoldRounds(roundChanges) {
            if (!roundChanges) {
                return;
            }

            const loaf = this.activeLoaves.find(
                loaf => loaf.id === roundChanges.id
            );

            if (!loaf) {
                return;
            }

            loaf.foldRounds = roundChanges.rounds.slice();
        },
        saveLoafNotes(noteChanges) { //Find the same loaf and apply the edited notes.
            if (!noteChanges) return;

            const loaf = this.activeLoaves.find(loaf => loaf.id === noteChanges.id);

            if (!loaf) return;

            loaf.notes = noteChanges.notes;
        },
        saveCompletedBake(completedBake) {
            if (!completedBake) {
                return;
            }

            const loaf = this.activeLoaves.find(
                loaf => loaf.id === completedBake.loafId
            );

            //Prevent saving a missing loaf or an unfinished bake.
            if (!loaf || loaf.currentStep !== this.bakeSteps.length) {
                return;
            }

            this.bakeHistory.unshift({
                id: this.nextHistoryId,
                name: completedBake.name,
                recipeId: completedBake.recipeId,
                nickname: completedBake.nickname,
                loafCount: completedBake.loafCount,
                started: completedBake.started,
                bakedDateInput: completedBake.bakedDateInput,
                bakedDate: completedBake.bakedDate,
                rating: completedBake.rating,
                hydrationInput: completedBake.hydrationInput,
                hydration: completedBake.hydration,
                bulkTime: completedBake.bulkTime,
                coldProof: completedBake.coldProof,
                notes: completedBake.notes,
                image: completedBake.image,

                ingredients: completedBake.ingredients.map(
                    ingredient => ({ ...ingredient })
                )
            });

            this.nextHistoryId += 1;

            //Remove the active loaf only after creating its History entry.
            this.activeLoaves = this.activeLoaves.filter(
                activeLoaf => activeLoaf.id !== completedBake.loafId
            );

            this.bakeView = 'history';
            this.$refs.toast.show(completedBake.name + ' saved to History.');
        },
        previousLoafStep(loafId) {
            const loaf = this.activeLoaves.find(loaf => loaf.id === loafId);

            if (!loaf || loaf.currentStep <= 1) {
                return;
            }

            loaf.currentStep -= 1;
            loaf.nextCheck = 'when ready';
        },
        completeLoafStep(loafId) {
            const loaf = this.activeLoaves.find(loaf => loaf.id === loafId);

            if (!loaf) return;

            if (loaf.currentStep < this.bakeSteps.length) {
                loaf.currentStep += 1;
                loaf.nextCheck = 'when ready';
            }
        }
    }
}).mount('#app');
