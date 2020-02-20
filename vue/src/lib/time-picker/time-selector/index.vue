<template>
  <div>
    <i
      class="icon icon-arrow-up_24"
      @click="handleArrowUpClick"
      @keyup="() => {}"
      tabindex="-1"
      role="button"
    />
    <input
      @wheel="onWheel"
      type={type}
      minLength={2}
      maxLength={2}
      @click="handleInputClick"
      :ref="inputRef"
      @change="handleOnChange"
      tabindex="0"
      :value="currentValue"
      @blur="submitChange"
      @keyup="handleKey"
    />
    <i
      class="icon icon-arrow-down_24"
      @click="handleArrowDownClick"
      @keyup="() => {}"
      role="button"
      tabindex="-1"
    />
  </div>
</template>

<script>
export default {
  name: 'md-time-selector',

  data() {
    return {
      currentValue: this.value,
      isEditing: false
    }
  },

  props: {
    /** Ref attribute for TimeSelector input element | null */
    inputRef: String,
    /** Choose to use military time | false */
    militaryTime: Boolean,
    /** Set the type for the Input element | 'text' */
    type: {
      type: String,
      default: 'text'
    },
    /** Set the unit of time | '' */
    unit: {
      type: String,
      default: ''
    },
    /** Set the value of the Input element | '' */
    value: {
      type: [Number, String],
      default: ''
    },
  },

  watch: {
    value(val) {
      if (!this.isEditing) {
        this.currentValue = val;
      }
    }
  },

  methods: {
    handleOnChange(e) {
      const { unit, militaryTime } = this.$props;
      let newValue = e.currentTarget.value;
      
      if (/[a-zA-Z]/.test(e.currentTarget.value)) {
        e.stopPropagation();
        return false;
      } else if (unit === 'h') {
        newValue =
        militaryTime
        ? (parseInt(newValue, 10) > 23 ? 23 : parseInt(newValue, 10)) || ''
        : (parseInt(newValue, 10) > 12 ? 12 : parseInt(newValue, 10)) || '';
      } else if (unit === 'm') {
        newValue =
        parseInt(newValue, 10) > 59 ? 59 : parseInt(newValue, 10) || '';
      }
      
      this.currentValue = newValue;
      this.isEditing = true;
    },
    
    submitChange(e) {
      const { unit } = this.$props;
      
      this.isEditing = false;
      this.$emit('keydown', unit, e);
    },
    
    handleKey(e) {
      let newValue = e.currentTarget.value;
      const { unit } = this.$props;
      
      if (e.keyCode === 38 || e.keyCode === 40 || e.charCode === 38 || e.charCode === 40) {
        this.isEditing = false;
        this.$emit('keydown', unit, e);
        e.stopPropagation();
      } else if ((e.keyCode === 65 || e.charCode === 65) && unit === 'pre') {
        if (newValue.includes('A')) return;
        
        this.isEditing = false;
        this.$emit('keydown', unit, e);
        e.stopPropagation();
      } else if ((e.keyCode === 80 || e.charCode === 80) && unit === 'pre') {
        if (newValue.includes('P')) return;
        
        this.isEditing = false;
        this.$emit('keydown', unit, e);
        e.stopPropagation();
      }
    },

    handleArrowUpClick(e) {
      this.isEditing = false;
      this.onUpClick();
    },

    handleArrowDownClick(e) {
      this.isEditing = false;
      this.onDownClick();
    },

    onUpClick(e) {
      this.$emit('upclick', e);
    },

    onDownClick(e) {
      this.$emit('downclick', e);
    },

    onWheel(e) {
      this.$emit('wheel', this.unit, e);
    },

    handleInputClick(e) {
      e.currentTarget.focus();
    }

  },
};
</script>
