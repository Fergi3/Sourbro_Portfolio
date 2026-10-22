//IngredientChecklistItem displays one ingredient preparation checkbox.
//It emits a toggle request without modifying readyIngredients directly.
const IngredientChecklistItem = {
    props: {
        ingredientId: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        grams: {
            type: Number,
            required: true
        },

        checked: {
            type: Boolean,
            default: false
        }
    },

    emits: ['toggle-ready'],

    computed: {
        fieldId() {
            return 'ready-' + this.ingredientId;
        }
    },

    methods: {
        toggleReady() {
            this.$emit(
                'toggle-ready',
                this.ingredientId
            );
        }
    },

    template: `
        <div class="ingredient-row col-12 col-sm-6">
            <input class="form-check-input"
                   type="checkbox"
                   :id="fieldId"
                   :checked="checked"
                   @change="toggleReady">

            <label :for="fieldId"
                   class="ingredient-label gap-2">

                <span>{{ name }}</span>

                <span aria-hidden="true">·</span>

                <strong>{{ grams }} g</strong>
            </label>
        </div>
    `
};

export default IngredientChecklistItem;