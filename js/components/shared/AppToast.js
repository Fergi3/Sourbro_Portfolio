// AppToast displays a short confirmation using Bootstrap's toast.
const AppToast = {
    data() {
        return {
            message: ''
        };
    },

    methods: {
        async show(message) {
            this.message = message;

            // Wait until Vue has updated the message.
            await this.$nextTick();

            bootstrap.Toast.getOrCreateInstance(this.$refs.toast, {
                delay: 2500
            }).show();
        }
    },

    beforeUnmount() {
        bootstrap.Toast.getInstance(this.$refs.toast)?.dispose();
    },

    template: `
        <teleport to="body">
            <div class="toast-container position-fixed bottom-0
                        start-50 translate-middle-x p-3"
                 role="status"
                 aria-live="polite"
                 aria-atomic="true">

                <div ref="toast"
                     class="toast bread-toast">

                    <div class="toast-body position-relative text-center">
                        <button type="button"
                                class="btn-close bread-toast-close"
                                data-bs-dismiss="toast"
                                aria-label="Dismiss notification">
                        </button>

                        <p class="fw-semibold mb-0">
                            {{ message }}
                        </p>
                    </div>
                </div>
            </div>
        </teleport>
    `
};

export default AppToast;