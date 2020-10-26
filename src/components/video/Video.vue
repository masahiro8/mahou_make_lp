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
      clear_id: null,
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

        // Show loading animation.
        var playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              this.clear_id = null;
              if (this.clear_id) clearTimeout(this.clear_id);
              this.clear_id = setTimeout(() => {
                video.play();
              }, 1000);
              console.log("video play");
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              console.log("error");
            });
        }
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/MAHOUMAKE_EYESHAOW.m3u8";
        video.addEventListener("canplay", function () {
          // Show loading animation.
          var playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                // Automatic playback started!
                // Show playing UI.
                this.clear_id = null;
                if (this.clear_id) clearTimeout(this.clear_id);
                this.clear_id = setTimeout(() => {
                  video.play();
                }, 1000);
                console.log("video play");
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
                console.log("error");
              });
          }
        });
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.playVide);
    // const video = document.getElementById("video");

    // // Show loading animation.
    // var playPromise = video.play();

    // if (playPromise !== undefined) {
    //   playPromise
    //     .then((_) => {
    //       // Automatic playback started!
    //       // Show playing UI.
    //       this.clear_id = null;
    //       if (this.clear_id) clearTimeout(this.clear_id);
    //       this.clear_id = setTimeout(() => {
    //         video.play();
    //       }, 1000);
    //       console.log("video play");
    //     })
    //     .catch((error) => {
    //       // Auto-play was prevented
    //       // Show paused UI.
    //       console.log("error");
    //     });
    // }
  },
};
</script>

<style>
</style>
