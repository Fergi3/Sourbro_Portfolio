import AppModal from '../shared/AppModal.js';
import StarRating from '../shared/StarRating.js';
import DeleteConfirmation from '../shared/DeleteConfirmation.js';
import DurationControl from '../shared/DurationControl.js';
import MascotPicker from '../shared/MascotPicker.js';
import { loafMascots } from '../../data/mascots.js';

const EditBakeForm = {
    components: {
        AppModal,
        StarRating,
        DeleteConfirmation,
        DurationControl,
        MascotPicker
    },
    props: {
        bake: {
            type: Object,
            required: true
        }
    },

    emits: ['save-bake', 'delete-bake'],

    data: function () {
        return {
            editingBake: null,
            confirmingDelete: false,
            choosingMascot: false,
            previousImage: '',
            mascotOptions: loafMascots
        };
    },
    computed: {
        fieldIdPrefix() {
            return 'editBake-' + this.bake.id;
        }
    },

    methods: {
        confirmDelete() {
            this.$refs.modal.close();
            this.$emit('delete-bake');
        },
        startEditingBake() {
            this.confirmingDelete = false;
            this.choosingMascot = false;

            this.editingBake = {
                ...this.bake,
                image: this.bake.image || 'TheSourBro.png'
            };

            this.$refs.modal.open();
        },

        startChoosingMascot() {
            this.previousImage = this.editingBake.image;
            this.choosingMascot = true;
        },

        cancelChoosingMascot() {
            this.editingBake.image = this.previousImage;
            this.choosingMascot = false;
        },

        saveEditingBake() {
            this.confirmingDelete = false;
            if (!this.editingBake) return;

            const completedDate = new Date(
                this.editingBake.bakedDateInput + 'T00:00:00'
            );

            if (Number.isNaN(completedDate.getTime())) return;

            const bakeChanges = {
                id: this.editingBake.id,
                nickname: this.editingBake.nickname,
                image: this.editingBake.image,
                bakedDateInput: this.editingBake.bakedDateInput,

                bakedDate: completedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),

                rating: this.editingBake.rating,
                hydrationInput: this.editingBake.hydrationInput,
                hydration: this.editingBake.hydration,
                bulkTime: this.editingBake.bulkTime,
                coldProof: this.editingBake.coldProof,
                notes: this.editingBake.notes
            };

            //Send the prepared changes upward without changing the bake prop.
            this.$emit('save-bake', bakeChanges);

            this.$refs.modal.close();
        }
    },
    template: `
      <button type="button"
              class="btn btn-link quiet-action"
              :aria-label="'Edit ' + (bake.nickname || bake.name)"
              @click="startEditingBake">
        Edit details
      </button>

      <app-modal
          ref="modal"
          :scrollable="true"
          modal-class="bake-action-modal">

        <template #title>
          {{ confirmingDelete
            ? 'Delete Bake'
            : choosingMascot
                ? 'Choose a Loaf Mascot'
                : (editingBake ? editingBake.name : 'Bake') + ' Details' }}
        </template>

        <delete-confirmation
            v-if="confirmingDelete"
            :item-name="bake.nickname || bake.name"
            delete-label="Delete Bake"
            @cancel="confirmingDelete = false"
            @confirm="confirmDelete">
        </delete-confirmation>

        <mascot-picker
            v-else-if="choosingMascot && editingBake"
            :options="mascotOptions"
            :selected-image="editingBake.image"
            image-base-path="../images/mascots/sourbros/"
            @select-image="editingBake.image = $event">
        </mascot-picker>

        <form v-else-if="editingBake"
              :id="fieldIdPrefix + '-form'"
              @submit.prevent="saveEditingBake">
          <div class="row g-3">
            <div class="col-7">
              <label :for="fieldIdPrefix + '-nickname'"
                     class="form-label">
                Loaf Nickname
              </label>

              <input type="text"
                     class="form-control"
                     :id="fieldIdPrefix + '-nickname'"
                     placeholder="Give this loaf a nickname"
                     v-model="editingBake.nickname">
            </div>

            <div class="col-5">
              <div class="d-flex flex-column align-items-center">
                <button type="button"
                        class="btn p-0 border-0"
                        aria-label="Change loaf mascot"
                        @click="startChoosingMascot">
                  <img :src="'../images/mascots/sourbros/' + editingBake.image"
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

            <div class="col-12">
              <label :for="fieldIdPrefix + '-date'"
                     class="form-label">
                Bake Date
              </label>

              <input type="date"
                     class="form-control"
                     :id="fieldIdPrefix + '-date'"
                     v-model="editingBake.bakedDateInput">
            </div>

            <div class="col-12">
              <star-rating
                  :rating="editingBake.rating"
                  @change-rating="editingBake.rating = $event">
              </star-rating>
            </div>

            <div class="col-12">
              <duration-control
                  label="Bulk fermentation after folds"
                  :input-id="fieldIdPrefix + '-bulk-time'"
                  :duration="editingBake.bulkTime"
                  :max-hours="8"
                  @change-duration="editingBake.bulkTime = $event">
              </duration-control>
              <p class="helper-text mt-2 mb-0">
                Time from your last stretch-and-fold round until shaping.
              </p>
            </div>

            <div class="col-12">
              <duration-control
                  label="Cold proof"
                  :input-id="fieldIdPrefix + '-cold-proof'"
                  :duration="editingBake.coldProof"
                  @change-duration="editingBake.coldProof = $event">
              </duration-control>
            </div>

            <div class="col-12">
              <label :for="fieldIdPrefix + '-notes'"
                     class="form-label">
                Notes
              </label>

              <textarea class="form-control"
                        :id="fieldIdPrefix + '-notes'"
                        rows="4"
                        v-model="editingBake.notes">
                    </textarea>
            </div>
          </div>
          <div class="border-top mt-4 pt-3">
            <button type="button"
                    class="btn btn-link text-danger px-0"
                    @click="confirmingDelete = true">
              Delete Bake
            </button>
          </div>
        </form>

        <template #footer>
          <div v-if="!confirmingDelete"
               class="d-flex justify-content-between gap-3 w-100">

            <template v-if="choosingMascot">
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
            </template>

            <template v-else>
              <button type="button"
                      class="btn btn-secondary px-3"
                      @click="$refs.modal.close()">
                Cancel
              </button>

              <button type="button"
                      class="btn btn-success px-3"
                      :disabled="!editingBake || !editingBake.bakedDateInput"
                      @click="saveEditingBake">
                Save Changes
              </button>
            </template>

          </div>
        </template>
      </app-modal>
    `
};

export default EditBakeForm;