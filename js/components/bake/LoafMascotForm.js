import AppModal from '../shared/AppModal.js';
import MascotPicker from '../shared/MascotPicker.js';
import { loafMascots } from '../../data/mascots.js';

const LoafMascotForm = {
    components: {
        AppModal,
        MascotPicker
    },

    props: {
        image: {
            type: String,
            required: true
        }
    },

    emits: ['change-image'],

    data: function () {
        return {
            draftImage: '',
            mascotOptions: loafMascots
        };
    },

    methods: {
        open() {
            this.draftImage = this.image;
            this.$refs.modal.open();
        },

        save() {
            this.$emit('change-image', this.draftImage);
            this.$refs.modal.close();
        }
    },

    template: `
        <button type="button"
                class="btn btn-link quiet-action px-0"
                @click="open">
            Change mascot
        </button>

        <app-modal ref="modal"
                   :scrollable="true"
                   modal-class="bake-action-modal">
            <template #title>
                Choose a Loaf Mascot
            </template>

            <mascot-picker
                :options="mascotOptions"
                :selected-image="draftImage"
                image-base-path="../images/mascots/sourbros/"
                @select-image="draftImage = $event">
            </mascot-picker>

            <template #footer>
                <div class="d-flex justify-content-between gap-3 w-100">
                    <button type="button"
                            class="btn btn-secondary px-3"
                            @click="$refs.modal.close()">
                        Cancel
                    </button>

                    <button type="button"
                            class="btn btn-success px-3"
                            @click="save">
                        Use This Mascot
                    </button>
                </div>
            </template>
        </app-modal>
    `
};

export default LoafMascotForm;