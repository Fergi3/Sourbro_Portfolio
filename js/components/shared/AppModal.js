//AppModal provides reusable Bootstrap modal open and close behavior.
let nextModalId = 1;

const AppModal = {
    props: {
        scrollable: {
            type: Boolean,
            default: false
        },

        modalClass: {
            type: String,
            default: 'starter-action-modal'
        }
    },
    data: function () {
        return {
            bsModal: null,
            titleId: `appModalTitle${nextModalId++}`
        };
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.modal);
    },
    methods: {
        open() {
            this.bsModal.show();
        },
        close() {
            this.bsModal.hide();
        }
    },
    template: `
    <teleport to="body">
        <div ref="modal"
             class="modal fade"
             :class="modalClass"
             tabindex="-1"
             :aria-labelledby="titleId"
             aria-hidden="true">

            <div class="modal-dialog modal-dialog-centered"
                 :class="{ 'modal-dialog-scrollable': scrollable }">

                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-4" :id="titleId">
                            <slot name="title"></slot>
                        </h2>

                        <button type="button"
                                class="btn-close"
                                aria-label="Close"
                                @click="close">
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
`
};

export default AppModal;