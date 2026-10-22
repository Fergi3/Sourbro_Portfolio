//BakingConversions owns the baking conversion tool.
//WIP NOT IMPLEMENTED INTO THE APP, VERY BIG CONCEPT
const BakingConversions = {
    data: function () {
        return {
            selectedIngredient: 'breadFlour',
            amount: 1,
            fromUnit: 'cups',
            toUnit: 'grams'
        };
    },

    computed: {
        conversionResult() {
            if (
                this.selectedIngredient === 'breadFlour' &&
                this.fromUnit === 'cups' &&
                this.toUnit === 'grams'
            ) {
                return Math.round(this.amount * 120);
            }

            return null;
        }
    },

    template: `
        <teleport to="body">
        <div class="modal fade conversion-modal" id="conversionModal" tabindex="-1"
         aria-labelledby="conversionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-4" id="conversionModalLabel">Baking Conversions</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3">Choose an ingredient and the measurements you'd like to convert.</p>
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="conversionIngredient" class="form-label">Ingredient</label>
                            <select id="conversionIngredient" class="form-select" v-model="selectedIngredient">
                                <optgroup label="Dry ingredients">
                                    <option value="breadFlour">Bread Flour</option>
                                    <option value="wholeWheatFlour">Whole Wheat Flour</option>
                                    <option value="allPurposeFlour">All-Purpose Flour</option>
                                    <option value="salt">Table Salt</option>
                                </optgroup>
                                <optgroup label="Wet ingredients">
                                    <option value="water">Water</option>
                                    <option value="milk">Milk</option>
                                    <option value="honey">Honey</option>
                                </optgroup>
                                <optgroup label="Fats">
                                    <option value="butter">Butter</option>
                                    <option value="oliveOil">Olive Oil</option>
                                    <option value="coconutOil">Coconut Oil</option>
                                    <option value="shortening">Vegetable Shortening</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label for="conversionAmount" class="form-label">Amount</label>
                          <select id="conversionAmount"
                                  class="form-select"
                                  v-model="amount">
                            <option :value="1 / 4">¼</option>
                            <option :value="1 / 3">⅓</option>
                            <option :value="1 / 2">½</option>
                            <option :value="2 / 3">⅔</option>
                            <option :value="3 / 4">¾</option>
                            <option :value="1">1</option>
                            <option :value="1 + 1 / 4">1¼</option>
                            <option :value="1 + 1 / 2">1½</option>
                            <option :value="1 + 3 / 4">1¾</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                          </select>
                        </div>
                        <div class="col-sm-4">
                            <label for="conversionFrom" class="form-label">Convert from</label>
                            <select id="conversionFrom" class="form-select" v-model="fromUnit">
                                <option value="cups">Cups</option>
                                <option value="tablespoons">Tablespoons</option>
                                <option value="teaspoons">Teaspoons</option>
                                <option value="milliliters">Milliliters</option>
                                <option value="grams">Grams</option>
                                <option value="ounces">Ounces</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label for="conversionTo" class="form-label">Convert to</label>
                            <select id="conversionTo" class="form-select" v-model="toUnit">
                                <option value="grams">Grams</option>
                                <option value="ounces">Ounces</option>
                                <option value="cups">Cups</option>
                                <option value="tablespoons">Tablespoons</option>
                                <option value="teaspoons">Teaspoons</option>
                                <option value="milliliters">Milliliters</option>
                            </select>
                        </div>
                    </div>
                          <div v-if="conversionResult !== null"
                               class="border-top mt-4 pt-3"
                               aria-live="polite">
                            <h3 class="h5">Result</h3>
        
                            <p class="lead mb-1">
                              Approximately {{ conversionResult }} grams
                            </p>
        
                            <p class="helper-text mb-0">
                              Flour measurements vary with how the cup is filled.
                              Weighing gives more consistent results.
                            </p>
                          </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                </div>
            </div>
        </div>
    </div>
        </teleport>
    `
};

export default BakingConversions;