<template>
  <div>
    <video
      ref="video"
      id="video"
      width="302"
      height="640"
      preload="none"
      controls
      playsinline
      webkit-playsinline
      muted
      autoplay
    ></video>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  data() {
    return {
      hls: new Hls(),
    };
  },
  methods: {
    playVide() {
      const video = document.getElementById("video");
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(
          "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/MAHOUMAKE_EYESHAOW.m3u8"
        );
        this.hls.attachMedia(video);
        setTimeout(() => {
          video.play();
        }, 1000);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/MAHOUMAKE_EYESHAOW.m3u8";
        video.addEventListener("canplay", function () {
          video.play();
        });
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.playVide);
  },
};
</script>

<style>
</style>
