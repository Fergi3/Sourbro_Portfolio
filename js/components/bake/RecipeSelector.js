//RecipeSelector displays and organizes available recipe choices.
//It emits selection requests without directly changing the recipes array.
import RecipeManagerForm from './RecipeManagerForm.js';

const RecipeSelector = {
    components: {
        RecipeManagerForm
    },
    props: {
        recipes: {
            type: Array,
            required: true
        },

        selectedRecipeId: {
            type: String,
            default: ''
        },

        highlightSelection: {
            type: Boolean,
            default: false
        }
    },

    emits: [
        'select-recipe',
        'save-recipe',
        'delete-recipe'
    ],

    computed: {
        builtInRecipes() {
            return this.recipes.filter(
                recipe => recipe.type === 'built-in'
            );
        },

        savedRecipes() {
            return this.recipes.filter(
                recipe => recipe.type === 'saved'
            );
        },

        selectedRecipe() {
            return this.recipes.find(
                recipe => recipe.id === this.selectedRecipeId
            ) || null;
        },

        selectedRecipeName() {
            if (this.selectedRecipeId === 'custom') {
                return 'Custom Recipe';
            }

            return this.selectedRecipe
                ? this.selectedRecipe.name
                : 'Choose a recipe…';
        }
    },

    methods: {
        selectRecipe(recipeId) {
            this.$emit('select-recipe', recipeId);
        },

        saveRecipe(recipeChanges) {
            this.$emit('save-recipe', recipeChanges);
        },

        deleteRecipe(recipeId) {
            this.$emit('delete-recipe', recipeId);
        }
    },

    template: `
        <div class="recipe-selection"
             :class="{ 'bake-again-selected': highlightSelection }">

            <div class="dropdown">
              <button class="btn starter-picker dropdown-toggle w-100"
                      type="button"
                      id="selectedRecipe"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label="Choose a recipe">
                {{ selectedRecipeName }}
              </button>

                <ul class="dropdown-menu w-100">
                    <li>
                        <h6 class="dropdown-header">
                            Built-in Recipes
                        </h6>
                    </li>

                    <li v-for="recipe in builtInRecipes"
                        :key="recipe.id">

                        <button class="dropdown-item"
                                type="button"
                                @click="selectRecipe(recipe.id)">
                            {{ recipe.name }}
                        </button>
                    </li>

                    <template v-if="savedRecipes.length">
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>
                            <h6 class="dropdown-header">
                                My Saved Recipes
                            </h6>
                        </li>

                        <li v-for="recipe in savedRecipes"
                            :key="recipe.id">

                            <button class="dropdown-item"
                                    type="button"
                                    @click="selectRecipe(recipe.id)">
                                {{ recipe.name }}
                            </button>
                        </li>
                    </template>

                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <button class="dropdown-item"
                                type="button"
                                @click="selectRecipe('custom')">
                            + Custom Recipe
                        </button>
                    </li>
                </ul>
            </div>

          <recipe-manager-form
              v-if="selectedRecipe && selectedRecipe.type === 'saved'"
              :recipe="selectedRecipe"
              @save-recipe="saveRecipe"
              @delete-recipe="deleteRecipe">
          </recipe-manager-form>
        </div>
    `
};

export default RecipeSelector;