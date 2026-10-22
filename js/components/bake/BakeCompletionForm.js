//BakeCompletionForm manages the temporary completion details for one active loaf.
//It emits a completed bake without directly changing activeLoaves or bakeHistory.
import AppModal from '../shared/AppModal.js';
import StarRating from '../shared/StarRating.js';
import DurationControl from '../shared/DurationControl.js';

const BakeCompletionForm = {
    components: {
        AppModal,
        StarRating,
        DurationControl
    },

    props: {
        loaf: {
            type: Object,
            required: true
        }
    },

    emits: ['complete-bake'],

    data: function () {
        return {
            completionDraft: null
        };
    },

    computed: {
        fieldIdPrefix() {
            return 'completeBake-' + this.loaf.id;
        },

        completionDateLabel() {
            if (!this.completionDraft) {
                return '';
            }

            const completedDate = new Date(
                this.completionDraft.bakedDateInput + 'T00:00:00'
            );

            return completedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    },

    methods: {
        open() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            //Create a temporary copy so Cancel does not modify the active loaf.
            this.completionDraft = {
                loafId: this.loaf.id,
                name: this.loaf.name,
                recipeId: this.loaf.recipeId || null,
                loafCount: this.loaf.loafCount,
                started: this.loaf.started,
                bakedDateInput: year + '-' + month + '-' + day,
                hydrationInput: this.loaf.hydration ?? null,
                rating: 0,
                bulkTime: '',
                coldProof: '',
                notes: this.loaf.notes || '',
                image: this.loaf.image || 'TheSourBro.png',

                ingredients: (this.loaf.ingredients || []).map(
                    ingredient => ({ ...ingredient })
                )
            };

            this.$refs.modal.open();
        },

        saveCompletedBake() {
            const draft = this.completionDraft;

            if (!draft) {
                return;
            }

            const completedDate = new Date(
                draft.bakedDateInput + 'T00:00:00'
            );

            if (Number.isNaN(completedDate.getTime())) {
                return;
            }

            const completedBake = {
                loafId: draft.loafId,
                name: draft.name,
                recipeId: draft.recipeId,
                nickname: '',
                loafCount: draft.loafCount,
                started: draft.started,
                bakedDateInput: draft.bakedDateInput,
                image: draft.image,

                bakedDate: completedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),

                rating: draft.rating,
                hydrationInput: draft.hydrationInput,

                hydration: draft.hydrationInput === null
                    ? 'Not recorded'
                    : draft.hydrationInput + '%',

                bulkTime: draft.bulkTime.trim() || 'Not recorded',
                coldProof: draft.coldProof.trim() || 'Not recorded',
                notes: draft.notes.trim(),

                ingredients: draft.ingredients.map(ingredient => ({ ...ingredient }))
            };

            //Close before emitting because the parent will remove this active loaf.
            this.$refs.modal.close();
            this.$emit('complete-bake', completedBake);
        }
    },

    template: `
        <button type="button"
                class="btn btn-success complete-overview-btn"
                @click="open">
            Finish Bake
        </button>

        <app-modal
            ref="modal"
            :scrollable="true"
            modal-class="bake-action-modal">

            <template #title>
                Completed Bake
            </template>

            <template v-if="completionDraft">
                <p class="lead">
                    Review your batch and add any final notes.
                    Saving moves it from Active to History.
                </p>

                <dl class="row mb-0">
                    <dt class="col-6">Recipe</dt>
                    <dd class="col-6">
                        {{ completionDraft.name }}
                    </dd>

                    <dt class="col-6">Loaves</dt>
                    <dd class="col-6">
                        {{ completionDraft.loafCount }}
                    </dd>

                    <dt class="col-6">Hydration</dt>
                    <dd class="col-6">
                        {{ completionDraft.hydrationInput === null
                            ? 'Not recorded'
                            : completionDraft.hydrationInput + '%' }}
                    </dd>

                    <dt class="col-6">Completed on</dt>
                    <dd class="col-6">
                        {{ completionDateLabel }}
                    </dd>
                </dl>

                <div v-if="completionDraft.ingredients.length"
                     class="border-top pt-3 mt-3">

                    <h3 class="h5 mb-3">
                        Ingredients for this batch
                    </h3>

                    <ul class="list-unstyled row g-2 mb-0">
                        <li class="col-12 col-sm-6"
                            v-for="(ingredient, index) in completionDraft.ingredients"
                            :key="index">

                            {{ ingredient.name }}

                            <span aria-hidden="true"> · </span>

                            <strong>
                                {{ ingredient.grams }} g
                            </strong>
                        </li>
                    </ul>
                </div>

                <div class="border-top pt-3 mt-3">
                    <h3 class="h5 mb-3">
                        How did it go?
                    </h3>

                    <div class="row g-3">
                        <div class="col-12">
                            <star-rating
                                :rating="completionDraft.rating"
                                @change-rating="completionDraft.rating = $event">
                            </star-rating>
                        </div>

                      <div class="col-12">
                        <duration-control
                            label="Bulk fermentation after folds"
                            :input-id="fieldIdPrefix + '-bulk-time'"
                            :duration="completionDraft.bulkTime"
                            :max-hours="8"
                            @change-duration="completionDraft.bulkTime = $event">
                        </duration-control>

                        <p class="helper-text mt-2 mb-0">
                          Time from your last stretch-and-fold round until shaping.
                        </p>
                      </div>

                      <div class="col-12">
                        <duration-control
                            label="Cold proof"
                            :input-id="fieldIdPrefix + '-cold-proof'"
                            :duration="completionDraft.coldProof"
                            @change-duration="completionDraft.coldProof = $event">
                        </duration-control>
                      </div>

                        <div class="col-12">
                            <label :for="fieldIdPrefix + '-notes'"
                                   class="form-label">
                                Final notes
                            </label>

                            <textarea class="form-control"
                                      :id="fieldIdPrefix + '-notes'"
                                      rows="4"
                                      placeholder="Crust, crumb, flavor, or anything to try next time."
                                      v-model="completionDraft.notes">
                            </textarea>

                            <p class="helper-text mt-2 mb-0">
                                Your existing notes are included.
                                Add anything you want to remember.
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            <template #footer>
                <button type="button"
                        class="btn btn-secondary"
                        @click="$refs.modal.close()">
                    Keep Baking
                </button>

                <button type="button"
                        class="btn btn-success"
                        :disabled="!completionDraft"
                        @click="saveCompletedBake">
                    Save to History
                </button>
            </template>
        </app-modal>
    `
};

export default BakeCompletionForm;