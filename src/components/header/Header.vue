<template>
  <header :id="'parallax' + id" :style="framestyle">
    <h1 ref="h1" :style="style">
      <div class="inner" ref="inner" :style="innerstyle">
        <ParallaxWrapper :rate="0.1">
          <p class="MAHOU">MAHOU</p>
          <p class="MAKE">MAKE</p>
        </ParallaxWrapper>
      </div>
    </h1>
    <div>
      <!-- パララックス -->
      <ParallaxWrapper :rate="0.2">
        <div class="message">
          <p>Wake up to Make up,</p>
          <p>Right here Right Now!😂😂</p>
        </div>
      </ParallaxWrapper>
    </div>
  </header>
</template>
<script>
import { parallaxCallback } from "../../util/parallaxCallback";
import { topCallBack } from "../../util/scrollCallback";
import ParallaxWrapper from "../common/ParallaxWrapper";
import * as _ from "lodash";

export default {
  name: "Header",
  data: () => {
    return {
      id: _.uniqueId(),
      style: "",
      innerstyle: "",
      framestyle: "",
      speedRate: 120, //パララックス速度
      speed: 1 + _.random(6) * (_.random(2) == 1 ? -1 : 1), //速度
    };
  },
  components: {
    ParallaxWrapper,
  },
  mounted() {
    parallaxCallback("#parallax" + this.id)(this.speed, 0, () => {
      const enter = topCallBack(this.$refs.h1, 0);
      this.innerstyle = enter
        ? "transform: translateY(-200px);"
        : "transform: translateY(0);";
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/config.scss";

header {
  position: relative;
  z-index: $header_z;
  width: 100%;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("/images/Pattern.png") center center no-repeat;
  background-size: 60% auto;
}

.inner {
  transition-property: all;
  transition-duration: 300ms;
}

.dot_pattern {
  width: 80%;
}

.message {
  p {
    color: white;
    background-color: $magenta;
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    padding: 0 16px;
    position: relative;
    &:nth-child(1) {
      left: -16px;
    }
    &:nth-child(2) {
      left: 16px;
    }
  }
}

h1 {
  font-size: 60px;
  font-weight: 800;
  line-height: 64px;
  letter-spacing: 20px;
  text-align: center;

  p {
    margin: 0;
    padding: 0;
    text-shadow: 4px 4px 0 #000;
  }

  .MAHOU {
    color: white;
  }

  .MAKE {
    color: #FEF400;
  }
}
</style>
