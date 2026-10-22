//DeleteConfirmation displays a reusable delete warning and its actions.
//It emits the user's decision without deleting parent-owned data.
const DeleteConfirmation = {
    props: {
        itemName: {
            type: String,
            required: true
        },

        deleteLabel: {
            type: String,
            default: 'Delete'
        }
    },

    emits: [
        'cancel',
        'confirm'
    ],

    methods: {
        cancelDelete() {
            this.$emit('cancel');
        },

        confirmDelete() {
            this.$emit('confirm');
        }
    },

    template: `
        <div class="delete-confirmation">
            <p class="mb-2">
                Are you sure you want to delete
                <strong>{{ itemName }}</strong>?
            </p>

            <p class="text-muted mb-0">
                This action cannot be undone.
            </p>

            <div class="d-flex flex-wrap justify-content-end gap-2
                        border-top pt-3 mt-4">

                <button type="button"
                        class="btn btn-secondary"
                        @click="cancelDelete">
                    Cancel
                </button>

              <button type="button"
                      class="btn btn-danger"
                      @click="confirmDelete">
                    {{ deleteLabel }}
                </button>
            </div>
        </div>
    `
};

export default DeleteConfirmation;