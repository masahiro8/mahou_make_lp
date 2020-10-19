<template>
  <div ref="videoContainer" id="videoContainer">
    <video
      ref="video"
      id="video"
      controls
      preload="none"
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
      hls: new Hls(),
      height: window.innerHeight,
    };
  },
  methods: {
    playVide() {
      // this.height = window.innerHeight;
      this.height = window.height;
      const video = document.getElementById("video");

      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(
          "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        );
        this.hls.attachMedia(video);
        // video.play();
        setTimeout(() => {
          video.play();
        }, 1000);
      }
    },
    pullCallback() {
      const patternOverflow = this.$refs.videoContainer;
      if (patternOverflow.scrollTop > 0) {
        setTimeout(() => {
          patternOverflow.scrollTop = 0;
        }, 200);
      }

      this.$emit("pull-callback", null);
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
