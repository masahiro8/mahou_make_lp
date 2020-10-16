<template>
  <div>
    <video
      ref="video"
      id="video"
      controls
      webkit-playsinline
      muted
      autoplay
    ></video>

    <p>window height: {{ height }}</p>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  data() {
    return {
      // hlsjsを機能させるための初期化処理を格納した変数
      hls: new Hls(),
      height: window.innerHeight,
    };
  },
  methods: {
    playVide() {
      this.height = window.innerHeight;
      const video = document.getElementById("video");

      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(
          "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        );
        this.hls.attachMedia(video);
        video.play();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.playVide);
    // window.addEventListener("scroll", this.playVideo);
  },
  // mounted() {
  //   const video = document.getElementById("video");
  //   if (Hls.isSupported()) {
  //     this.hls = new Hls();
  //     // this.hls.loadSource("./video/playlist.m3u8");
  //     // this.hls.loadSource(
  //     //   "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/MAHOUMAKE_EYESHAOW.m3u8"
  //     // );
  //     this.hls.loadSource(
  //       "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
  //     );
  //     this.hls.attachMedia(video);
  //     video.play();
  //   }
  // },
};
</script>

<style>
#video {
  height: 200px;
}
</style>
