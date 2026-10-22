//SaveRecipeForm manages the temporary name used to save a recipe.
//It emits the validated name without directly changing the recipes array.
import AppModal from '../shared/AppModal.js';

const SaveRecipeForm = {
    components: {
        AppModal
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },

    emits: [
        'save-recipe'
    ],

    data: function () {
        return {
            recipeName: ''
        };
    },

    methods: {
        open() {
            if (this.disabled) {
                return;
            }

            this.recipeName = '';
            this.$refs.modal.open();
        },

        cancel() {
            this.recipeName = '';
            this.$refs.modal.close();
        },

        saveRecipe() {
            const name = this.recipeName.trim();

            if (name === '') {
                return;
            }

            this.$emit('save-recipe', name);

            this.recipeName = '';
            this.$refs.modal.close();
        }
    },

    template: `
        <button type="button"
                class="btn btn-link quiet-action save-recipe-btn"
                :disabled="disabled"
                @click="open">
            Save as My Recipe
        </button>

        <app-modal ref="modal"
                   modal-class="bake-action-modal"
                   scrollable>

            <template #title>
                Save as My Recipe
            </template>

            <label for="savedRecipeName" class="form-label">
                Recipe Name
            </label>

            <input type="text"
                   class="form-control"
                   id="savedRecipeName"
                   placeholder="For example, My Weekend Rustic"
                   v-model="recipeName">

            <p class="mt-3">
                Save a personal copy of the selected recipe and
                its customizations for quick selection next time.
            </p>

            <template #footer>
                <button type="button"
                        class="btn btn-secondary flex-fill"
                        @click="cancel">
                    Cancel
                </button>

                <button type="button"
                        class="btn btn-success flex-fill"
                        :disabled="recipeName.trim() === ''"
                        @click="saveRecipe">
                    Save Recipe
                </button>
            </template>
        </app-modal>
    `
};

export default SaveRecipeForm;