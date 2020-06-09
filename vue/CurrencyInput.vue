<template>
  <div>
    <el-input
      :disabled="disabled"
      v-show="mode === 'edit'"
      ref="jcCurrencyInput"
      placeholder="请输入"
      @blur="handleTextBlur"
      :value="value"
      @input="handleTextInput"
      class="input-with-select"
    >
      <el-select :disabled="disabled || currencyDisabled" :value="currency" @input="handleCurrencyInput" slot="prepend" placeholder="币种">
        <el-option
          v-for="item in currencyList"
          :key="item.dict_code"
          :label="item.dict_code"
          :value="item.dict_code"
        ></el-option>
      </el-select>
    </el-input>

    <el-input
      :disabled="disabled"
      v-show="mode === 'show'"
      placeholder="请输入"
      :value="showAmountValue"
      class="input-with-select"
      @focus="showInputFocus"
    >
      <el-select :disabled="disabled || currencyDisabled" :value="currency" @input="handleCurrencyInput"  slot="prepend" placeholder="币种">
        <el-option
          v-for="item in currencyList"
          :key="item.dict_code"
          :label="item.dict_code"
          :value="item.dict_code"
        ></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
import toNumber from 'lodash/toNumber';

const PRECISION = 2; // 精度
let p = 1;
for (let i = 1; i <= PRECISION; i += 1) {
  p *= 10;
}

const convertMoney = val => {
  if (!val) return;
  val = val.toString();
  const one = val.split(".")[0];
  let two = val.split(".")[1] ? val.split(".")[1] : "00";
  const len = one.length;
  let oldI = 0;
  const temp = [];

  for (let i = 1; i <= len; i += 1) {
    if (i % 3 === 0 && i !== 0) {
      temp.push(one.substring(oldI, i));
      oldI = i;
    }
  }

  if (len % 3 !== 0) {
    temp.push(one.substring(oldI, len));
  }

  if (two.length < PRECISION) {
    for (let i = two.length; i < PRECISION; i += 1) {
      two += '0';
    }
  }
  return temp.join(",") + "." + two;
};

export default {
  props: {
    value: [String, Number],
    currency: String,
    disabled: Boolean,
    currencyDisabled: Boolean,
  },
  data() {
    return {
      currencyList: [],
      oldValue: 0,
      mode: "show",
      showAmountValue: '0'
    };
  },
  watch: {
    value(val) {
      this.showAmountValue = convertMoney(val);
    }
  },
  created() {
    this.getCurrency();
    if (!isNaN(this.value)) {
      this.oldValue = this.value;
      this.showAmountValue = convertMoney(this.value);
    } else {
      this.$emit("input", this.oldValue);
    }
  },
  methods: {
    handleTextInput(val) {
      this.$emit("input", val); 
    },
    handleTextBlur(val) {
      if (isNaN(this.value)) {
        this.$emit("input", this.oldValue);
      } else {
        const val = Math.floor(toNumber(this.value) * p) / p;
        this.oldValue = val;
        this.$emit("input", val);
      }
      this.mode = 'show';
    },
    handleCurrencyInput(val) {
      this.$emit("currencyInput", val);
    },
    // 获取币种
    async getCurrency() {
      this.currencyList = [
        {
          dict_code: 'USD',
          dict_name: '美元',
        }
      ];
    },
    showInputFocus() {
      this.mode = 'edit';
      setTimeout(() => {
        this.$refs.jcCurrencyInput.focus();
      }, 0);
    },
  }
};
</script>

<style lang="less">
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  .el-select .el-input {
    width: 80px;
  }
}
</style>