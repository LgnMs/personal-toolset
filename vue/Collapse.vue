<template>
  <div ref="collapse" class="jcCollapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    defHeight: Number
  },
  watch: {
    show(val) {
      if (val) {
        this.showMethod();
      } else {
        this.hiddenMethod();
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.initContainerHeight();
    });
  },
  methods: {
    initContainerHeight() {
      const node = this.$refs.collapse;
      if (this.defHeight) {
        node.setAttribute('data-height', this.defHeight);
      } else {
        const height = node.offsetHeight;
        node.setAttribute('data-height', height);
      }

      if (!this.show) {
        node.style.height = '0px';
      }
    },
    showMethod() {
      const node = this.$refs.collapse;
      const dataHeight = node.getAttribute('data-height');

      node.style.height = '0px'
      node.style.height = dataHeight + 'px';

      setTimeout(() => {
        node.style.height = '';
      }, 300)
    },
    hiddenMethod() {
      const node = this.$refs.collapse;
      const height = node.offsetHeight;
      node.setAttribute('data-height', height);
      const dataHeight = node.getAttribute('data-height');

      node.style.height = dataHeight + 'px'
      setTimeout(() => {      
        node.style.height = '0px';
      }, 0)
    },
  }
}

</script>

<style lang="less">
.jcCollapse {
  overflow: hidden;
  transition: all .3s ease;
}
</style>