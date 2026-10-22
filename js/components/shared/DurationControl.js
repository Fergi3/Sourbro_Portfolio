// DurationControl displays whole hours without changing its prop.
const DurationControl = {
    props: {
        duration: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            required: true
        },
        inputId: {
            type: String,
            required: true
        },
        maxHours: {
            type: Number,
            default: 48
        }
    },

    emits: ['change-duration'],

    computed: {
        durationHours() {
            //Read hours from existing values like "4h 45m" or "14 hours".
            const match = this.duration.match(/^(\d+)\s*h/i);

            return match ? Number(match[1]) : '';
        }
    },

    methods: {
        changeHours(event) {
            const value = event.target.value;

            this.$emit(
                'change-duration',
                value === '' ? 'Not recorded' : value + ' hours'
            );
        }
    },

    template: `
      <div>
        <label :for="inputId" class="form-label">
          {{ label }} (hours)
        </label>

        <select class="form-select"
                :id="inputId"
                :value="durationHours"
                @change="changeHours">
          <option value="">Not recorded</option>

          <option v-for="hour in maxHours"
                  :key="hour"
                  :value="hour">
            {{ hour }}
          </option>
        </select>
      </div>
    `
};

export default DurationControl;