<template>
  <div class="jun-textarea">
    <textarea @focus="$emit('focus')" @blur="$emit('blur')" ref="textarea" :maxlength="maxlength" :value="value" @input="handleInput" type="textarea" wrap="hard" :rows="rows" :placeholder="placeholder" />
    <div v-if="maxlength" class="jun-textarea__footer text-body-3 text--888 mt-2 text-right">
      <span>{{value.length}}/{{maxlength}}</span>
    </div>
  </div>
</template>

<script>
import textSize from '../js/textSize';

export default {
  name: 'junTextarea',
  props: {
    placeholder: String,
    value: String,
    maxlength: Number,
  },
  data() {
    return {
      rows: 1,
      textareaWidth: 0,
    }
  },
  created() {
    this.$nextTick(() => {
      this.textareaWidth = this.$refs.textarea.offsetWidth;
    })
  },
  methods: {
    handleInput(e) {
      const val = e.target.value;

      if (this.rows < 7) {
        const width = textSize('0.28rem', val).width;
        const i = Math.ceil(width / this.textareaWidth);
        if (i === 0) {
          this.rows = 1;
        } else {
          this.rows = i;
        }
        this.$nextTick(() => {
          this.$emit('rowsChange');
        })
      }
      this.$emit('input', val);
    },
  }
}
</script>

<style lang="scss">
.jun-textarea {
  background-color: #fff;
  border: 2px solid #dedede;
  border-radius: 4px;
  padding: 24px;
  font-size: 0;
  textarea {
    width: 100%;
    box-sizing: border-box;
    font-size: 28px;
    color: #1a1a1a;
    letter-spacing: 0;
    line-height: 44px;
    padding: 0;
    border: none;
    outline: none;
    word-break: break-all;
    resize: none;
  }
}
</style>
