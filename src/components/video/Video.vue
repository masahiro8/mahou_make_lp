<template>
  <div>
    <video
      ref="video"
      id="video"
      controls
      webkit-playsinline
      muted
      autoplay
      @click="playVide()"
    ></video>
    <!-- <button @click="PlayVide()">動画を再生する</button> -->
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  data() {
    return {
      // hlsjsを機能させるための初期化処理を格納した変数
      hls: new Hls(),
    };
  },
  methods: {
    playVide() {
      const video = document.getElementById("video");
      if (Hls.isSupported()) {
        this.hls = new Hls();
        // hls.currentLevel = n;
        // this.hls.loadSource("./video/playlist.m3u8");
        this.hls.loadSource(
          "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        );
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log(data.levels);
          console.log(event);
          this.hls.currentLevel();
          video.play();
        });
      }
    },
  },
};
</script>

<style>
#video {
  height: 300px;
}
</style>
