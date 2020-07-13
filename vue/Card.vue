<template>
  <div class="jun-card" :class="{elevation, border, 'bs-grey': bsGrey }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "junCard",
  props: {
    elevation: Boolean,
    border: Boolean,
    bsGrey: Boolean,
  },
};
</script>

<style lang="scss">
$color: #1181d6;
.jun-card {
  border-radius: 8px;
  overflow: hidden;
  &.elevation {
    box-shadow: 0 3px 5px -1px rgba($blue, 0.2),
      0 5px 8px 0 rgba($blue, 0.14), 0 1px 14px 0 rgba($blue, 0.12);
  }
  &.bs-grey {
    &.elevation {
      box-shadow: 0 3px 5px -1px rgba($grey, 0.2),
        0 5px 8px 0 rgba($grey, 0.14), 0 1px 14px 0 rgba($grey, 0.12);
    }
  }
  &.border {
    border: 2px solid #EBEBEB; 
  }
}
</style>
