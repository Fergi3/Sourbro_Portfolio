//RecipeManagerForm manages temporary edits and deletion confirmation
//for one saved recipe.
import AppModal from '../shared/AppModal.js';
import DeleteConfirmation from '../shared/DeleteConfirmation.js';

const RecipeManagerForm = {
    components: {
        AppModal,
        DeleteConfirmation
    },

    props: {
        recipe: {
            type: Object,
            required: true
        }
    },

    emits: [
        'save-recipe',
        'delete-recipe'
    ],

    data: function () {
        return {
            editingRecipeName: '',
            confirmingDelete: false
        };
    },

    computed: {
        nameFieldId() {
            return 'editingRecipeName-' + this.recipe.id;
        }
    },

    methods: {
        open() {
            this.confirmingDelete = false;
            this.editingRecipeName = this.recipe.name;
            this.$refs.modal.open();
        },

        saveRecipe() {
            const name = this.editingRecipeName.trim();

            if (
                name === '' ||
                this.recipe.type !== 'saved'
            ) {
                return;
            }

            const recipeChanges = {
                id: this.recipe.id,
                name: name
            };

            this.$emit('save-recipe', recipeChanges);
            this.$refs.modal.close();
        },

        confirmDelete() {
            this.$refs.modal.close();
            this.$emit('delete-recipe', this.recipe.id);
        }
    },

    template: `
        <button type="button"
                class="btn btn-link quiet-action recipe-edit-link"
                @click="open">
            Manage saved recipe
        </button>

        <app-modal
            ref="modal"
            modal-class="bake-action-modal">

            <template #title>
                {{ confirmingDelete
                    ? 'Delete Recipe'
                    : 'Manage Saved Recipe' }}
            </template>

            <delete-confirmation
                v-if="confirmingDelete"
                :item-name="recipe.name"
                delete-label="Delete Recipe"
                @cancel="confirmingDelete = false"
                @confirm="confirmDelete">
            </delete-confirmation>

            <template v-else>
                <label :for="nameFieldId"
                       class="form-label">
                    Recipe name
                </label>

                <input type="text"
                       class="form-control"
                       :id="nameFieldId"
                       v-model="editingRecipeName">

                <p class="helper-text mt-3 mb-0">
                    Ingredient amounts and add-ins stay the same.
                </p>

              <div class="border-top mt-4 pt-3">
                <button type="button"
                        class="btn btn-link text-danger px-0"
                        @click="confirmingDelete = true">
                  Delete Recipe
                </button>
              </div>
            </template>

          <template #footer>
            <div v-if="!confirmingDelete"
                 class="d-flex justify-content-between gap-3 w-100">
              <button type="button"
                      class="btn btn-secondary px-3"
                      @click="$refs.modal.close()">
                Cancel
              </button>

              <button type="button"
                      class="btn btn-success px-3"
                      :disabled="!editingRecipeName.trim()"
                      @click="saveRecipe">
                Save Changes
              </button>
            </div>
          </template>
        </app-modal>
    `
};

export default RecipeManagerForm;