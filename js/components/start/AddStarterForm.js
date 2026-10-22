import AppModal from '../shared/AppModal.js';
import MascotPicker from '../shared/MascotPicker.js';
import { starterMascots } from '../../data/mascots.js';

const AddStarterForm = {
    //Receive the starter list for the Source Starter select options.
    components: {
        AppModal,
        MascotPicker
    },
    props: {
        starters: { //passed down from parent
            type: Array,
            required: true,
        }
    },

    emits: ['add-starter'], //event this component will emit upward

    data: function() {
        return {
            choosingMascot: false,
            previousMascotImage: '',
            mascotOptions: starterMascots,

            newStarter: { //temporary form data that belongs to this form component.
                name: '',
                type: 'levain',
                sourceId: this.starters.length > 0 ? this.starters[0].id : null, //first available starter becomes the default source starter.
                feedingRatio: '1:2:2',
                flour: '',
                image: 'SmilingSourdoughStarter.png'
            }
        };
    },
    //Choose an existing source starter if the previously selected source is deleted.
    watch: {
        starters(updatedStarters) {
            const sourceStillExists = updatedStarters.some(
                starter => starter.id === this.newStarter.sourceId
            );

            if(!sourceStillExists) {
                this.newStarter.sourceId = updatedStarters.length > 0 ? updatedStarters[0].id : null;
            }
        }
    },

    methods: {
        addStarter() {
            const name = this.newStarter.name.trim();
            const flour = this.newStarter.flour.trim();

            if (!name || !flour) {
                return;
            }

            const formValues = {
                name: name,
                type: this.newStarter.type,
                sourceId: this.newStarter.sourceId,
                feedingRatio: this.newStarter.feedingRatio,
                flour: flour,
                image: this.newStarter.image
            };

            //Send validated form values to the parent without changing the starters array here.
            this.$emit('add-starter', formValues);
            //Close the modal only after the form passes validation.
            this.$refs.modal.close();

            this.newStarter = {
                name: '',
                type: 'levain',
                sourceId: this.newStarter.sourceId > 0 ? this.newStarter.sourceId : null,
                feedingRatio: '1:2:2',
                flour: '',
                image: 'SmilingSourdoughStarter.png'
            };
        },

        open() {
            this.choosingMascot = false;
            this.$refs.modal.open();
        },

        startChoosingMascot() {
            this.previousMascotImage = this.newStarter.image;
            this.choosingMascot = true;
        },

        cancelChoosingMascot() {
            this.newStarter.image = this.previousMascotImage;
            this.choosingMascot = false;
        },
    },

    template: `
      <button type="button"
              class="dropdown-item"
              @click="open">
        + Add Starter
      </button>

      <app-modal ref="modal" :scrollable="true">
        <template #title>
          {{ choosingMascot ? 'Choose a Mascot' : 'Add Starter / Levain' }}
        </template>

        <mascot-picker
            v-if="choosingMascot"
            :options="mascotOptions"
            :selected-image="newStarter.image"
            image-base-path="images/mascots/starters/"
            @select-image="newStarter.image = $event">
        </mascot-picker>

        <form v-else id="addStarterForm" @submit.prevent="addStarter">
          <div class="row g-3">
            <div class="col-7 align-self-center">
              <label for="newStarterName" class="form-label">
                Name
              </label>

              <input type="text"
                     class="form-control"
                     id="newStarterName"
                     placeholder="For example, Rustic Levain"
                     v-model="newStarter.name">
            </div>

            <div class="col-5">
              <div class="d-flex flex-column align-items-center">
                <button type="button"
                        class="btn p-0 border-0"
                        aria-label="Change starter mascot"
                        @click="startChoosingMascot">
                  <img :src="'images/mascots/starters/' + newStarter.image"
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
              <label for="newStarterType" class="form-label">
                Type
              </label>

              <select class="form-select"
                      id="newStarterType"
                      v-model="newStarter.type">
                <option value="mother">Mother Starter</option>
                <option value="levain">Recipe Levain</option>
              </select>

              <p class="form-text">
                Maintain a mother starter for ongoing use.
                Build a levain for a specific bake.
              </p>
            </div>

            <div class="col-12">
              <label for="newStarterSource" class="form-label">
                Source Starter
              </label>

              <select class="form-select"
                      id="newStarterSource"
                      v-model="newStarter.sourceId">
                <option v-for="starter in starters"
                        :key="starter.id"
                        :value="starter.id">
                  {{ starter.name }}
                </option>

                <option :value="null">
                  None / Starting From Scratch
                </option>
              </select>
            </div>

            <div class="col-12">
              <label for="newStarterRatio" class="form-label">
                Feeding Ratio
              </label>

              <select class="form-select"
                      id="newStarterRatio"
                      v-model="newStarter.feedingRatio">
                <option value="1:1:1">1:1:1</option>
                <option value="1:2:2">1:2:2</option>
                <option value="1:3:3">1:3:3</option>
                <option value="1:4:4">1:4:4</option>
              </select>

              <p class="form-text mb-0">
                Starter : Flour : Water, measured by weight.
              </p>
            </div>

            <div class="col-12">
              <label for="newStarterFlour" class="form-label">
                Flour
              </label>

              <input type="text"
                     class="form-control"
                     id="newStarterFlour"
                     placeholder="For example, whole wheat flour"
                     v-model="newStarter.flour">
            </div>
          </div>
        </form>

        <template #footer>
          <div class="d-flex justify-content-between gap-3 w-100">
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

              <button type="submit"
                      form="addStarterForm"
                      class="btn btn-success px-3"
                      :disabled="!newStarter.name.trim() || !newStarter.flour.trim()">
                Save
              </button>
            </template>
          </div>
        </template>
      </app-modal>
    `
};

export default AddStarterForm;