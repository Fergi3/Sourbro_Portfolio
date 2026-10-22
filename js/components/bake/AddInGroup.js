//AddInGroup manages one add-in category and its custom ingredient form.
//It emits selection requests without modifying parent-owned arrays.
const AddInGroup = {
    props: {
        group: {
            type: Object,
            required: true
        },

        addIns: {
            type: Array,
            required: true
        },

        selectedAddInIds: {
            type: Array,
            required: true
        }
    },

    emits: [
        'toggle-add-in',
        'add-custom-ingredient'
    ],

    data: function () {
        return {
            showOther: false,

            customIngredient: {
                name: '',
                grams: null
            }
        };
    },

    computed: {
        groupAddIns() {
            return this.addIns.filter(
                addIn => addIn.group === this.group.name
            );
        }
    },

    methods: {
        isSelected(addInId) {
            return this.selectedAddInIds.includes(addInId);
        },

        toggleAddIn(addInId) {
            this.$emit('toggle-add-in', addInId);
        },

        addCustomIngredient() {
            const name = this.customIngredient.name.trim();
            const grams = Number(this.customIngredient.grams);

            if (
                name === '' ||
                !Number.isFinite(grams) ||
                grams <= 0
            ) {
                return;
            }

            const ingredientValues = {
                name: name,
                group: this.group.name,
                gramsPerLoaf: grams
            };

            this.$emit(
                'add-custom-ingredient',
                ingredientValues
            );

            this.customIngredient.name = '';
            this.customIngredient.grams = null;
        }
    },

    template: `
        <details class="add-in-category">
            <summary>
                {{ group.name === 'Other'
                    ? 'Other add-ins'
                    : group.name }}
            </summary>

            <div class="add-in-category-content">
                <div class="form-check"
                     v-for="addIn in groupAddIns"
                     :key="addIn.id">

                    <input class="form-check-input"
                           type="checkbox"
                           :id="addIn.id"
                           :checked="isSelected(addIn.id)"
                           @change="toggleAddIn(addIn.id)">

                    <label class="form-check-label"
                           :for="addIn.id">
                        {{ addIn.name }} ·
                        {{ addIn.gramsPerLoaf }} g per loaf
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input"
                           type="checkbox"
                           :id="group.id + '-other'"
                           v-model="showOther">

                    <label class="form-check-label"
                           :for="group.id + '-other'">
                        Other
                    </label>
                </div>

                <form class="other-ingredient-fields"
                      v-if="showOther"
                      @submit.prevent="addCustomIngredient">

                    <div>
                        <label class="form-label"
                               :for="group.id + '-name'">
                            Ingredient name
                        </label>

                        <input type="text"
                               class="form-control"
                               :id="group.id + '-name'"
                               v-model="customIngredient.name"
                               placeholder="Your custom ingredient"
                               required>
                    </div>

                    <div>
                        <label class="form-label"
                               :for="group.id + '-grams'">
                            Grams per loaf
                        </label>

                        <input type="number"
                               class="form-control"
                               :id="group.id + '-grams'"
                               v-model.number="customIngredient.grams"
                               min="1"
                               step="1"
                               required>
                    </div>

                    <button type="submit"
                            class="btn btn-outline-secondary">
                        Add ingredient
                    </button>
                </form>
            </div>
        </details>
    `
};

export default AddInGroup;