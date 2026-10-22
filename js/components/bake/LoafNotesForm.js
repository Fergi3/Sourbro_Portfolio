//LoafNotesForm manages a temporary copy of one active loaf's notes.
//It emits saved notes without directly changing the loaf prop.
import AppModal from '../shared/AppModal.js';

const LoafNotesForm = {
    components: {
        AppModal
    },
    props: {
        loaf: {
            type: Object,
            required: true
        }
    },

    emits: ['save-notes'],

    data: function () {
        return {
            editingLoafNotes: null
        };
    },
    computed: {
        notesFieldId() {
            return 'activeLoafNotes-' + this.loaf.id;
        }
    },
    methods: {
        startLoafNotes() {
            //Create a fresh copy so Cancel does not change the original loaf.
            this.editingLoafNotes = {
                id: this.loaf.id,
                name: this.loaf.name,
                notes: this.loaf.notes
            };

            this.$refs.modal.open();
        },
        saveLoafNotes() {
            if (!this.editingLoafNotes) return;

            const noteChanges = {
                id: this.editingLoafNotes.id,
                notes: this.editingLoafNotes.notes
            };

            //Send the notes upward without changing the loaf prop.
            this.$emit('save-notes', noteChanges);

            this.$refs.modal.close();
        }
    },
    template: `
      <button type="button"
              class="btn btn-outline-secondary loaf-notes-btn"
              @click="startLoafNotes">
        {{ loaf.notes ? 'Edit Notes' : 'Add Notes' }}
      </button>

      <app-modal ref="modal" modal-class="bake-action-modal">
        <template #title>
          {{ editingLoafNotes ? editingLoafNotes.name : 'Loaf' }} Notes
        </template>

        <div v-if="editingLoafNotes">
          <label :for="notesFieldId" class="form-label">
            Notes for this loaf
          </label>

          <textarea :id="notesFieldId"
                    class="form-control"
                    rows="4"
                    placeholder="Add a note about this bake..."
                    v-model="editingLoafNotes.notes">
          </textarea>
        </div>

        <template #footer>
          <button type="button"
                  class="btn btn-secondary"
                  @click="$refs.modal.close()">
            Cancel
          </button>

          <button type="button"
                  class="btn btn-success"
                  @click="saveLoafNotes">
            Save Notes
          </button>
        </template>
      </app-modal>
    `
};

export default LoafNotesForm;