//BakeHistoryItem displays one completed bake and manages its available actions.
//It requests parent-owned data changes by emitting events upward.
import EditBakeForm from './EditBakeForm.js';

const BakeHistoryItem = {
    components: {
        EditBakeForm
    },

    props: {
        bake: {
            type: Object,
            required: true
        },

        isFirst: {
            type: Boolean,
            required: true
        },

        imageBasePath: {
            type: String,
            default: 'images/'
        }
    },

    emits: [
        'save-bake',
        'delete-bake',
        'bake-again'
    ],

    computed: {
        collapseId() {
            return 'historyBake-' + this.bake.id;
        },

        displayName() {
            return this.bake.nickname || this.bake.name;
        },

        loafImage() {
            return this.imageBasePath + 'mascots/sourbros/' +
                (this.bake.image || 'TheSourBro.png');
        },

        ratingStars() {
            return '★'.repeat(this.bake.rating)
                + '☆'.repeat(5 - this.bake.rating);
        },

        ratingLabel() {
            if (this.bake.rating === 0) {
                return 'Not rated yet';
            }
            return this.bake.rating + ' out of 5 stars';
        }
    },

    methods: {
        saveBake(bakeChanges) {
            this.$emit('save-bake', bakeChanges);
        },

        deleteBake() {
            this.$emit('delete-bake', this.bake.id);
        },

        bakeAgain() {
            this.$emit('bake-again', this.bake);
        }
    },

    template: `
        <article class="accordion-item"
                 :class="{ 'mt-3': !isFirst }">

            <h3 class="accordion-header">
                <button class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#' + collapseId"
                        :aria-controls="collapseId"
                        aria-expanded="false">

                  <img class="loaf-thumb object-fit-contain"
                       :src="loafImage"
                       alt="">

                    <span class="loaf-heading">
                        <span class="loaf-title fw-semibold">
                            {{ displayName }}
                        </span>

                        <span class="d-flex flex-wrap align-items-center gap-2">
                            <span class="status-pill history-completed-badge">
                                Completed
                            </span>

                            <span class="bake-date">
                                {{ bake.bakedDate }}
                            </span>
                          
                            <span v-if="bake.loafCount" class="loaf-subtitle">
                              · {{ bake.loafCount }} {{ bake.loafCount === 1 ? 'loaf' : 'loaves' }}
                            </span>
                        </span>

                        <span class="loaf-rating"
                              role="img"
                              :aria-label="ratingLabel">
                            {{ ratingStars }}
                        </span>
                    </span>
                </button>
            </h3>

            <div class="accordion-collapse collapse"
                 :id="collapseId"
                 data-bs-parent="#bakeHistoryList">

                <div class="accordion-body">
                    <dl class="row g-3 mb-0">
                        <div class="col-12 col-md-6 col-lg-2">
                            <dt class="small mb-1">Hydration</dt>
                            <dd class="mb-0">{{ bake.hydration }}</dd>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3 border-start">
                            <dt class="small mb-1">Bulk fermentation</dt>
                            <dd class="mb-0">{{ bake.bulkTime }}</dd>
                        </div>

                        <div class="col-12 col-md-6 col-lg-2 border-start">
                            <dt class="small mb-1">Cold proof</dt>
                            <dd class="mb-0">{{ bake.coldProof }}</dd>
                        </div>

                        <div class="col-12 col-md-6 col-lg-5 border-start">
                            <dt class="small mb-1">Notes</dt>
                            <dd class="mb-0">
                                {{ bake.notes || 'No notes added.' }}
                            </dd>
                        </div>
                    </dl>

                    <div class="d-flex flex-wrap align-items-center gap-3 mt-4">
                        <edit-bake-form
                            :bake="bake"
                            @save-bake="saveBake"
                            @delete-bake="deleteBake">
                        </edit-bake-form>

                        <button type="button"
                                class="btn btn-secondary bake-again-btn"
                                :aria-label="'Bake ' + displayName + ' again'"
                                @click="bakeAgain">
                            Bake Again
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `
};

export default BakeHistoryItem;