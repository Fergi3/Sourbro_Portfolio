//MascotPicker displays image choices and emits the selected filename.
//The containing form decides when to save the choice.
const MascotPicker = {
    props: {
        options: {
            type: Array,
            required: true
        },
        selectedImage: {
            type: String,
            required: true
        },
        imageBasePath: {
            type: String,
            required: true
        }
    },

    emits: ['select-image'],

    template: `
        <fieldset>
            <legend class="form-label">
                Choose a mascot
            </legend>

            <div class="row g-2">
                <div class="col-4"
                     v-for="option in options"
                     :key="option.filename">
                    <button type="button"
                            class="btn w-100 h-100 p-2"
                            :class="{ 'mascot-selected': selectedImage === option.filename }"
                            :aria-pressed="selectedImage === option.filename"
                            @click="$emit('select-image', option.filename)">
                        <img :src="imageBasePath + option.filename"
                             class="img-fluid"
                             width="96"
                             height="96"
                             alt="">

                        <span class="d-block small mt-1">
                            {{ option.name }}
                        </span>
                    </button>
                </div>
            </div>
        </fieldset>
    `
};

export default MascotPicker;