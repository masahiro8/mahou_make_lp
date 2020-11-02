<template>
  <div class="MAHOU_BOOK">
    <Header />
    <!-- 0ページ目 -->
    <SectionPage class="MAHOU_BOOK_SECTION_BLOCK">
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_IMAGE">
          <div class="MAHOU_VIDEO">
            <video id="video1" controls muted autoplay playsinline loop></video>
            {{ scrollY }}
          </div>
          <!-- <div class="MAHOU_VIDEO">
            <video id="video2" controls muted autoplay playsinline loop></video>
            {{ scrollY }}
          </div> -->
        </div>
      </div>
    </SectionPage>
  </div>
</template>
<script>
import Hls from "hls.js";

export default {
  data: () => {
    return {
      hls: new Hls(),
      scrollY: 0,
      timer1: null,
      timer2: null,
      checkVideoPlay: null,
    };
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    removeScrollEvent() {
      window.removeEventListener("scroll", () => {
        this.playVide1();
        // this.playVide2();
      });
    },
    playVide1() {
      const videoUrl =
        "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook1.m3u8";
      if (700 > this.scrollY) {
        const video1 = document.getElementById("video1");
        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(videoUrl);
          this.hls.attachMedia(video1);
          var playPromise = video1.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                this.timer1 = null;
                if (this.timer1) clearTimeout(this.timer1);
                this.timer1 = setTimeout(() => {
                  playPromise;
                  this.checkVideoPlay = true;
                  console.log(this.checkVideoPlay);
                }, 1000);

                if (this.checkVideoPlay == true) {
                  // this.removeScrollEvent();

                  this.removescroll;
                }
                console.log("video play");
              })
              .catch((error) => {
                console.log("error");
              });
          }
        }
      }
    },
  },
  mounted() {
    this.squares = Array(200);
    window.addEventListener("scroll", this.handleScroll);

    window.addEventListener("scroll", () => {
      this.videoPlay1();
      // this.videoPlay2();
    });

    var scrollRemoveEvent = () => {
      window.removeEventListener("scroll", () => {
        this.videoPlay1();
        // this.videoPlay2();
      });
    };

    // const removescroll =  window.removeEventListener("scroll",scrollRemoveEvent)
  },
  computed: {},
  beforeDestroy() {},
};
