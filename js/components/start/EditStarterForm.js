import AppModal from '../shared/AppModal.js';
import DeleteConfirmation from '../shared/DeleteConfirmation.js';
import MascotPicker from '../shared/MascotPicker.js';
import { starterMascots } from '../../data/mascots.js';

const EditStarterForm = {
    components: {
        AppModal,
        DeleteConfirmation,
        MascotPicker
    },

    props: {
        selectedStarter: {
            type: Object,
            required: true
        }
    },

    emits: ['save-starter', 'delete-starter'],

    data: function () {
        return {
            editingStarter: null,
            confirmingDelete: false,
            choosingMascot: false,
            previousMascotImage: '',
            mascotOptions: starterMascots
        };
    },

    methods: {
        // Copy the starter so Cancel does not change the original.
        startEditingStarter(starter) {
            this.editingStarter = starter ? {...starter} : null;

            if (this.editingStarter && !this.editingStarter.image) {
                this.editingStarter.image = 'SmilingSourdoughStarter.png';
            }
        },

        open() {
            this.confirmingDelete = false;
            this.choosingMascot = false;
            this.startEditingStarter(this.selectedStarter);
            this.$refs.modal.open();
        },

        saveEditingStarter() {
            if (!this.editingStarter) return;

            const name = this.editingStarter.name.trim();
            const description = this.editingStarter.description.trim();
            const flour = this.editingStarter.flour.trim();

            if (!name || !description || !flour) return;

            const starterChanges = {
                id: this.editingStarter.id,
                name: name,
                description: description,
                feedingRatio: this.editingStarter.feedingRatio,
                flour: flour,
                image: this.editingStarter.image
            };

            this.$emit('save-starter', starterChanges);
            this.$refs.modal.close();
        },

        startChoosingMascot() {
            this.previousMascotImage = this.editingStarter.image;
            this.choosingMascot = true;
        },

        cancelChoosingMascot() {
            this.editingStarter.image = this.previousMascotImage;
            this.choosingMascot = false;
        },

        openMascotPicker() {
            this.open();
            this.startChoosingMascot();
        },

        confirmDelete() {
            this.$refs.modal.close();
            this.$emit('delete-starter');
            }
        },

    template: `
      <button type="button"
              class="btn btn-link starter-edit-trigger"
              :aria-label="'Edit ' + selectedStarter.name"
              @click="open">
        Edit
      </button>

      <app-modal ref="modal" :scrollable="true">
        <template #title>
          {{ confirmingDelete
            ? 'Delete Starter'
            : choosingMascot
                ? 'Choose a Mascot'
                : 'Edit Starter' }}
        </template>

        <delete-confirmation
            v-if="confirmingDelete"
            :item-name="selectedStarter.name"
            delete-label="Delete Starter"
            @cancel="confirmingDelete = false"
            @confirm="confirmDelete">
        </delete-confirmation>

        <form v-else-if="editingStarter"
              id="editStarterForm"
              @submit.prevent="!choosingMascot && saveEditingStarter()">
          <template v-if="choosingMascot">
            <mascot-picker
                :options="mascotOptions"
                :selected-image="editingStarter.image"
                image-base-path="images/mascots/starters/"
                @select-image="editingStarter.image = $event">
            </mascot-picker>
          </template>

          <template v-else>
            <div class="row g-3 align-items-center mb-3">
              <div class="col-7">
                <label for="editStarterName" class="form-label">
                  Name
                </label>

                <input type="text"
                       class="form-control"
                       id="editStarterName"
                       v-model="editingStarter.name">
              </div>

              <div class="col-5">
                <div class="d-flex flex-column align-items-center">
                  <button type="button"
                          class="btn p-0 border-0"
                          aria-label="Change starter mascot"
                          @click="startChoosingMascot">
                    <img :src="'images/mascots/starters/' + editingStarter.image"
                         width="80"
                         height="80"
                         class="img-fluid object-fit-contain"
                         alt="">
                  </button>

                  <button type="button"
                          class="btn btn-link quiet-action px-0"
                          @click="startChoosingMascot">
                    Change mascot
                  </button>
                </div>
              </div>
            </div>

          <div class="mb-3">
            <label for="editStarterDescription" class="form-label">
              Description
            </label>

            <input type="text"
                   class="form-control"
                   id="editStarterDescription"
                   v-model="editingStarter.description">
          </div>

          <div class="mb-3">
            <label for="editStarterRatio" class="form-label">
              Feeding Ratio
            </label>

            <select class="form-select"
                    id="editStarterRatio"
                    v-model="editingStarter.feedingRatio">
              <option value="1:1:1">1:1:1</option>
              <option value="1:2:2">1:2:2</option>
              <option value="1:3:3">1:3:3</option>
              <option value="1:4:4">1:4:4</option>
            </select>
          </div>

          <div>
            <label for="editStarterFlour" class="form-label">
              Flour
            </label>

            <input type="text"
                   class="form-control"
                   id="editStarterFlour"
                   v-model="editingStarter.flour">
          </div>

            <div class="border-top mt-4 pt-3">
              <button type="button"
                      class="btn btn-link text-danger px-0"
                      @click="confirmingDelete = true">
                Delete Starter
              </button>
            </div>
          </template>
        </form>

        <template #footer>
          <template v-if="choosingMascot">
            <div class="d-flex justify-content-between gap-3 w-100">
              <button type="button"
                      class="btn btn-secondary px-3"
                      @click="cancelChoosingMascot">
                Cancel
              </button>

              <button type="button"
                      class="btn btn-success px-3"
                      @click="choosingMascot = false">
                Use This Mascot
              </button>
            </div>
          </template>

          <template v-else-if="!confirmingDelete">
            <div class="d-flex justify-content-between gap-3 w-100">
              <button type="button"
                      class="btn btn-secondary px-3"
                      @click="$refs.modal.close()">
                Cancel
              </button>

              <button type="button"
                      class="btn btn-success px-3"
                      :disabled="!editingStarter ||
                        !editingStarter.name.trim() ||
                        !editingStarter.description.trim() ||
                        !editingStarter.flour.trim()"
                      @click="saveEditingStarter">
                Save Changes
              </button>
            </div>
          </template>
        </template>
      </app-modal>
    `
};

export default EditStarterForm;