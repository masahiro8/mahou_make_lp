<template>
  <div id="app">
    <Header />
    <HWrapper>
      <Balloon message="〇〇〇〇〇">
        <StartButton url="https://app.mahoumake.com" />
      </Balloon>
    </HWrapper>
    <HWrapper>
      <Vrmonkey />
    </HWrapper>
    <!-- ここから背景 -->
    <div>
      <Square v-for="index in squares" :key="index" />
      <Lip v-for="index in lips" :key="index" />
      <Casset v-for="index in cassets" :key="index" />
    </div>
  </div>
</template>

<script>
import Header from "./components/header/Header";
import HWrapper from "./components/common/HorizontalWrapper";
import Square from "./components/square/Square";
import Lip from "./components/lip/Lip.vue";
import Casset from "./components/casset/Casset";
import Balloon from "./components/balloon/Balloon";
import StartButton from "./components/startbutton/StartButton";
import Vrmonkey from "./components/vrmonkey/Vrmonkey";
// import Info from "./components/info/Info";
// import Images from "./components/images/Images";

export default {
  name: "App",
  data: () => {
    return {
      squares: [],
      lips: [],
      cassets: [],
    };
  },
  components: {
    Square,
    Lip,
    Casset,
    Header,
    HWrapper,
    StartButton,
    Balloon,
    Vrmonkey,
    // Info,
    // Images,
  },
  mounted() {
    this.squares = Array(200);
    this.lips = Array(10);
    this.cassets = Array(10);
  },
};
</script>

<style lang="scss">
body {
  background-color: #50FFEA;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 2000px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
