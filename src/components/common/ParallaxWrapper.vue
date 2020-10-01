<template>
  <div ref="wrapper" class="wrapper">
    <div class="inner" :style="style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { scrolling } from "../../util/scrollCallback";
export default {
  data: () => {
    return {
      top: 0,
      style: "",
    };
  },
  props: {
    rate: {
      type: Number,
      defaultValue: 0.1,
    },
  },
  mounted() {
    const rect = this.$refs.wrapper.getBoundingClientRect();
    scrolling((scroll_y) => {
      const m = (scroll_y - window.innerHeight / 2 + rect.y) * this.rate;
      this.style = `transform:translateY(${-m}px)`;
    });
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
