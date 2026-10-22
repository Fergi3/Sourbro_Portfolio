//FeedingForm manages the Feed Starter form values, validation, and scheduling.
//It emits validated starter changes without directly changing the starters array.
import AppModal from '../shared/AppModal.js';

const FeedingForm = {
    components: {
        AppModal,
    },
    props: {
        selectedStarter: {
            type: Object,
            required: true
        }
    },

    emits: ['save-feeding'],

    data: function() {
        return {
            feeding: {
                dateTime: '',
                ratio: '1:2:2',
                retained: 10,
                flour: 20,
                water: 20
            }
        };
    },
    methods: {
        startFeeding() {
            const now = new Date();

            //Adjust the current time for the datetime-local input.
            const offsetInMilliseconds = now.getTimezoneOffset() * 60000;
            const localTime = new Date(now.getTime() - offsetInMilliseconds);

            this.feeding.dateTime = localTime.toISOString().slice(0, 16);
            this.feeding.ratio = this.selectedStarter.feedingRatio;

            //Open the modal after preparing the latest form values.
            this.$refs.modal.open();
        },
        saveFeeding() {
            if (!this.feeding.dateTime ||   //Stop if date is missing or ingredient amount is 0 or less.
                this.feeding.retained <= 0 ||
                this.feeding.flour <= 0 ||
                this.feeding.water <= 0) {
                return;
            }

            const fedAt = new Date(this.feeding.dateTime);
            //Schedules the next feeding 8 hours after the entered feeding time. (8hrs * 60min * 60sec * 1000 = milliseconds)
            const nextFeeding = new Date(fedAt.getTime() + 8 * 60 * 60 * 1000);

            const starterChanges = {
                id: this.selectedStarter.id,

                lastFed: fedAt.toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }),

                feedingRatio: this.feeding.ratio,
                nextFeedingCountdown: 'Scheduled',

                nextFeedingTime: nextFeeding.toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                }),
                status: 'Active'
            };
            //Send the calculated changes upward without changing the starter prop.
            this.$emit('save-feeding', starterChanges);

            this.$refs.modal.close();
        }
    },
    template: `
    <button type="button"
            class="btn btn-success feed-starter-btn w-100"
            @click="startFeeding">
        Log Starter Feeding
    </button>

    <app-modal ref="modal" :scrollable="true">
        <template #title>
            Feed {{ selectedStarter.name }}
        </template>

        <form id="feedingForm" @submit.prevent="saveFeeding">
            <div class="mb-3">
                <label for="feedingDateTime" class="form-label">
                    Feeding Date and Time
                </label>

                <input type="datetime-local"
                       class="form-control"
                       id="feedingDateTime"
                       v-model="feeding.dateTime">
            </div>

            <div class="mb-3">
                <label for="feedingRatio" class="form-label">
                    Feeding Ratio
                </label>

                <select class="form-select"
                        id="feedingRatio"
                        v-model="feeding.ratio">
                    <option value="1:1:1">1:1:1</option>
                    <option value="1:2:2">1:2:2</option>
                    <option value="1:3:3">1:3:3</option>
                    <option value="1:4:4">1:4:4</option>
                </select>

                <div class="form-text">
                    Starter : Flour : Water
                </div>
            </div>

            <div class="mb-3">
                <label for="starterRetained" class="form-label">
                    Starter Retained
                </label>

                <div class="input-group">
                    <input type="number"
                           class="form-control"
                           id="starterRetained"
                           v-model.number="feeding.retained"
                           min="1">

                    <span class="input-group-text">g</span>
                </div>
            </div>

            <div class="mb-3">
                <label for="flourAdded" class="form-label">
                    Flour Added
                </label>

                <div class="input-group">
                    <input type="number"
                           class="form-control"
                           id="flourAdded"
                           v-model.number="feeding.flour"
                           min="1">

                    <span class="input-group-text">g</span>
                </div>
            </div>

            <div>
                <label for="waterAdded" class="form-label">
                    Water Added
                </label>

                <div class="input-group">
                    <input type="number"
                           class="form-control"
                           id="waterAdded"
                           v-model.number="feeding.water"
                           min="1">

                    <span class="input-group-text">g</span>
                </div>
            </div>
        </form>

        <template #footer>
            <button type="button"
                    class="btn btn-secondary"
                    @click="$refs.modal.close()">
                Cancel
            </button>

          <button type="submit"
                  form="feedingForm"
                  class="btn btn-success"
                  :disabled="!feeding.dateTime ||
                    feeding.retained <= 0 ||
                    feeding.flour <= 0 ||
                    feeding.water <= 0">
                    Save Feeding
          </button>
        </template>
    </app-modal>
`
};

export default FeedingForm;