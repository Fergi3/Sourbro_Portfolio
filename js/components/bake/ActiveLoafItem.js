//ActiveLoafItem displays and manages one active loaf's baking progress.
//It emits requested changes without directly modifying parent-owned arrays.
import LoafNotesForm from './LoafNotesForm.js';
import BakeCompletionForm from './BakeCompletionForm.js';

const ActiveLoafItem = {
    components: {
        LoafNotesForm,
        BakeCompletionForm
    },
    props: {
        imageBasePath: {
            type: String,
            default: 'images/'
        },
        loaf: {
            type: Object,
            required: true
        },
        bakeSteps: {
            type: Array,
            required: true
        },
        isFirst: {
            type: Boolean,
            required: true
        }
    },

    emits: ['complete-step', 'previous-step', 'save-notes', 'complete-bake', 'update-fold-rounds'],

    computed: {
        collapseId() {
            return 'activeBake-' + this.loaf.id;
        },
        currentStepDetails() {
            return this.bakeSteps.find(step => step.id === this.loaf.currentStep);
        },
        nextStepDetails() {
            return this.bakeSteps.find(step => step.id === this.loaf.currentStep + 1) || null;
        },
        progressPercentage() {
            return Math.round((this.loaf.currentStep - 1) / (this.bakeSteps.length - 1) * 100);
        },
        checkedFoldRounds() {
            return this.loaf.foldRounds || [];
        },
        stepIngredients() {
            const ingredients = this.loaf.ingredients || [];

            if (this.loaf.currentStep === 1) {
                return ingredients.filter(ingredient => !ingredient.isAddIn);
            }

            if (this.loaf.currentStep === 4) {
                return ingredients.filter(ingredient => ingredient.isAddIn);
            }

            return [];
        },
        visibleSections() {
            const sections = this.currentStepDetails.sections || [];

            return sections.filter(section =>
                !section.requiresAddIns || this.stepIngredients.length > 0
            );
        },
    },
    methods: {
        previousLoafStep() {
            if (this.loaf.currentStep > 1) {
                this.$emit('previous-step', this.loaf.id);
            }
        },
        completeLoafStep() {
            if (this.loaf.currentStep < this.bakeSteps.length) {
                //Request that the parent advance this loaf by its stable ID.
                this.$emit('complete-step', this.loaf.id);
            }
        },
        completeBake(completedBake) {
            this.$emit('complete-bake', completedBake);
        },
        saveLoafNotes(noteChanges) {
            //Forward the nested LoafNotesForm event to app.js.
            this.$emit('save-notes', noteChanges);
        },
        toggleFoldRound(round) {
            let rounds = this.checkedFoldRounds.slice();

            if (rounds.includes(round)) {
                rounds = rounds.filter(savedRound => savedRound !== round);
            } else {
                rounds.push(round);
            }

            this.$emit('update-fold-rounds', {
                id: this.loaf.id,
                rounds: rounds
            });
        },
    },
    template: `
      <div class="accordion-item"
           :class="{ 'mt-3': !isFirst }">

        <h3 class="accordion-header">
          <button class="accordion-button loaf-toggle collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#' + collapseId"
                  aria-expanded="false"
                  :aria-controls="collapseId">

            <img class="loaf-thumb object-fit-contain"
                 :src="imageBasePath + 'mascots/sourbros/' +
         (loaf.image || 'TheSourBro.png')"
                 alt="">

            <span class="loaf-heading flex-grow-1 me-3">
                    <span class="loaf-title fw-semibold">
                        {{ loaf.name }}
                    </span>

                    <span class="d-flex flex-column align-items-start gap-2">
                      
    <span class="status-pill loaf-progress-pill w-100">
    <span class="loaf-progress-fill"
          :style="{ width: progressPercentage + '%' }"
          aria-hidden="true">
    </span>

    <span class="loaf-progress-label">
        {{
        loaf.currentStep < bakeSteps.length
            ? 'In progress'
            : 'Ready to finish'
      }}
      · Step {{ loaf.currentStep }} of {{ bakeSteps.length }}
    </span>
</span>

   <span class="loaf-step-summary">
    <span class="loaf-subtitle">
        {{ loaf.loafCount }}
      {{ loaf.loafCount === 1 ? 'loaf' : 'loaves' }}
      · <strong>{{ currentStepDetails.name }}</strong>
    </span>

    <span v-if="nextStepDetails"
          class="loaf-subtitle loaf-next-preview">
        Up next: {{ nextStepDetails.name }}
    </span>
</span>
</span>
                </span>
          </button>
        </h3>

        <div :id="collapseId"
             class="accordion-collapse collapse"
             data-bs-parent="#activeLoafList">

          <div class="accordion-body">
            <div class="loaf-ingredients"
                 v-if="stepIngredients.length">

              <h4>Ingredients for this step</h4>

              <dl>
                <div v-for="(ingredient, index) in stepIngredients"
                     :key="index">
                  <dt>{{ ingredient.name }}</dt>
                  <dd>{{ ingredient.grams }} g</dd>
                </div>
              </dl>

              <p v-if="loaf.currentStep === 4"
                 class="helper-text mb-0">
                Add during the first shaping only.
                Use the amounts as a guide and leave some out if the dough
                feels overloaded.
              </p>
            </div>
            <div class="loaf-overview">
              <div class="loaf-current">
                <div class="d-flex align-items-center justify-content-between gap-3 mb-2">
                        <span class="small-label">
                            Current step
                        </span>

                  <loaf-notes-form
                      :loaf="loaf"
                      @save-notes="saveLoafNotes">
                  </loaf-notes-form>
                </div>

                <strong>
                  {{ currentStepDetails.name }}
                </strong>

                <div v-if="currentStepDetails.sections"
                     class="accordion mt-3"
                     :id="collapseId + '-sections'">

                  <section v-for="(section, sectionIndex) in visibleSections"
                           :key="section.heading"
                           class="accordion-item">

                    <h5 class="accordion-header">
                      <button type="button"
                              class="accordion-button"
                              :class="{ collapsed: sectionIndex !== 0 }"
                              data-bs-toggle="collapse"
                              :data-bs-target="'#' + collapseId + '-section-' + sectionIndex"
                              :aria-controls="collapseId + '-section-' + sectionIndex"
                              :aria-expanded="sectionIndex === 0 ? 'true' : 'false'">
                        {{ section.heading }}
                      </button>
                    </h5>

                    <div class="accordion-collapse collapse"
                         :class="{ show: sectionIndex === 0 }"
                         :id="collapseId + '-section-' + sectionIndex"
                         :data-bs-parent="'#' + collapseId + '-sections'">

                      <div class="accordion-body">
                        <ol class="loaf-instruction ps-4 mb-0">
                          <li v-for="(direction, index) in section.directions"
                              :key="index"
                              class="mb-2">
                            {{ direction }}
                          </li>
                        </ol>
                      </div>

                    </div>
                  </section>
                </div>

                <ol v-else-if="currentStepDetails.directions"
                    class="loaf-instruction ps-4">
                  <li v-for="(direction, index) in currentStepDetails.directions"
                      :key="index"
                      class="mb-2">
                    {{ direction }}
                  </li>
                </ol>

                <p v-else class="loaf-instruction">
                  {{ currentStepDetails.instruction }}
                </p>

                <p v-if="currentStepDetails.sections && currentStepDetails.instruction"
                   class="loaf-instruction mt-3">
                  {{ currentStepDetails.instruction }}
                </p>

                <p class="loaf-tip">
                  {{ currentStepDetails.tip }}
                </p>

                <div v-if="loaf.currentStep === 2"
                     class="border-top pt-3 mt-3">
                  <fieldset>
                    <legend class="small fw-semibold mb-2">
                      Track your rounds
                    </legend>

                    <div class="row g-2">
                      <div class="col-6 col-lg-3"
                           v-for="round in 4"
                           :key="round">
                        <div class="form-check">
                          <input class="form-check-input"
                                 type="checkbox"
                                 :id="'fold-' + loaf.id + '-' + round"
                                 :checked="checkedFoldRounds.includes(round)"
                                 @change="toggleFoldRound(round)">

                          <label class="form-check-label"
                                 :for="'fold-' + loaf.id + '-' + round">
                            Round {{ round }}
                          </label>
                        </div>
                      </div>
                    </div>

                    <p class="helper-text mt-2 mb-1"
                       role="status">
                      {{ checkedFoldRounds.length }} of 4 rounds checked
                    </p>
                  </fieldset>
                </div>
              </div>

              <div class="loaf-status">
                
                <div class="loaf-actions">

                  <button v-if="loaf.currentStep > 1"
                          type="button"
                          class="btn btn-link quiet-action"
                          @click="previousLoafStep">
                    <span aria-hidden="true">←</span> Back a step
                  </button>

                  <button v-if="loaf.currentStep < bakeSteps.length"
                          type="button"
                          class="btn btn-success complete-overview-btn"
                          @click="completeLoafStep">

                    Complete Step
                  </button>

                  <bake-completion-form
                      v-else
                      :loaf="loaf"
                      @complete-bake="completeBake">
                  </bake-completion-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
};

export default ActiveLoafItem;