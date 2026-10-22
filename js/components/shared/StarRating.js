// StarRating previews and selects an optional rating.
// The parent owns the saved rating.
const StarRating = {
    props: {
        rating: {
            type: Number,
            default: 0
        }
    },

    emits: ['change-rating'],

    data: function () {
        return {
            previewRating: 0
        };
    },

    computed: {
        displayedRating() {
            return this.previewRating || this.rating;
        }
    },

    methods: {
        selectRating(value) {
            this.previewRating = 0;
            this.$emit('change-rating', value);
        }
    },

    template: `
        <fieldset class="mb-0">
            <legend class="form-label fs-6 mb-1">
                Rating
            </legend>

            <div class="d-flex flex-wrap align-items-center gap-2">
                <div class="d-flex"
                     @mouseleave="previewRating = 0">
                    <button v-for="star in 5"
                            :key="star"
                            type="button"
                            class="btn rating-star"
                            :aria-label="'Rate ' + star + ' out of 5 stars'"
                            :aria-pressed="rating === star"
                            @mouseenter="previewRating = star"
                            @focus="previewRating = star"
                            @blur="previewRating = 0"
                            @click="selectRating(star)">
                        <span aria-hidden="true">
                            {{ star <= displayedRating ? '★' : '☆' }}
                        </span>
                    </button>
                </div>

                <span class="helper-text mb-0">
                    {{ displayedRating
                        ? displayedRating + ' out of 5'
                        : 'Not rated yet' }}
                </span>

                <button v-if="rating > 0"
                        type="button"
                        class="btn btn-link quiet-action"
                        @click="selectRating(0)">
                    Clear rating
                </button>
            </div>
        </fieldset>
    `
};

export default StarRating;