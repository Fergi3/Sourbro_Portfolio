//LoafCountControl manages minus and plus buttons for choosing loaf quantity.
const LoafCountControl = {
    props: {
        count: {
            type: Number,
            required: true
        },

        inputId: {
            type: String,
            default: 'loafCount'
        }
    },

    emits: [
        'update-count'
    ],

    computed: {
        decreaseDisabled() {
            return this.count <= 1;
        }
    },

    methods: {
        changeCount(change) {
            const newCount = Math.max(
                1,
                Number(this.count || 1) + change
            );

            this.$emit('update-count', newCount);
        }
    },

    template: `
        <div class="col-12 col-sm-auto">
            <label :for="inputId"
                   class="form-label small mb-1">
                Number of loaves
            </label>

            <div class="input-group loaf-count-control">
                <button type="button"
                        class="btn btn-outline-secondary"
                        aria-label="One fewer loaf"
                        :disabled="decreaseDisabled"
                        @click="changeCount(-1)">
                    −
                </button>

              <input type="text"
                     class="form-control text-center"
                     :id="inputId"
                     :value="count"
                     readonly>

                <button type="button"
                        class="btn btn-outline-secondary"
                        aria-label="One more loaf"
                        @click="changeCount(1)">
                    +
                </button>
            </div>
        </div>
    `
};

export default LoafCountControl;