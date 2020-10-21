<template>
  <div ref="videoContainer" id="videoContainer">
    <video ref="video" id="video" controls webkit-playsinline muted autoplay>
    </video>
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
        
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.playVide);
  },
};
</script>

<style>
#video {
  height: 200px;
}
</style>
