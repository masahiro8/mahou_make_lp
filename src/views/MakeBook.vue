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
          <div class="MAHOU_VIDEO">
            <video id="video2" controls muted autoplay playsinline loop></video>
            {{ scrollY }}
          </div>
        </div>
      </div>
    </SectionPage>
    <!-- 1ページ目 -->
    <SectionPage class="MAHOU_BOOK_SECTION_BLOCK">
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_TEXT">
          <p>
            はじめに<a href="https://mahoumake.com/book" target="_blank"
              >MAHOUBOOK</a
            >を開きます。
          </p>
          <br />
          <p>スクロールして表示したいECサイトやWEBサイトにコスメを探します</p>
          <br />
          <p>表示したいコスメの「LINK」ボタンをクリックします</p>
        </div>
        <div class="MAHOU_IMAGE">
          <img
            src="https://storage.googleapis.com/mahou_make/Assets/makebook_1.png"
            alt=""
          />
        </div>
      </div>
    </SectionPage>
    <!-- ２ページ目 -->
    <SectionPage class="MAHOU_BOOK_SECTION_BLOCK">
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_TEXT">
          <p>ポップアップが開きます</p>
          <br />
          <p>
            スクリプト欄の右上にあるアイコンをクリックすると、スクリプトがコピーされます
          </p>
          <br />
        </div>
        <div class="MAHOU_IMAGE">
          <img
            src="https://storage.googleapis.com/mahou_make/Assets/makebook_2.png"
            alt=""
          />
        </div>
      </div>
    </SectionPage>
    <!-- 3ページ目 -->
    <SectionPage class="MAHOU_BOOK_SECTION_BLOCK">
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_TEXT">
          <p>ECサイトWEBサイトのHTMLの表示したいところに</p>
          <br />
          <p>スクリプトをペーストするだけ</p>
        </div>
        <div class="MAHOU_IMAGE">
          <img
            src="https://storage.googleapis.com/mahou_make/Assets/makebook_3.png"
            alt=""
          />
        </div>
      </div>
    </SectionPage>
    <SectionPage>
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_TEXT">
          <p>MAHOU BOOKを入れたページを開くと</p>
          <br />
          <p>こんな感じで使えるようになります。</p>
        </div>
        <div class="MAHOU_IMAGE">
          <div class="MAHOU_PREVIEW">
            <iframe
              allow="camera;microphone"
              src="https://book.mahoumake.com/?mahou=1601603498179949"
              frameborder="0"
              width="100%"
              height="100%"
            >
            </iframe>
          </div>
        </div>
      </div>
    </SectionPage>
    <!-- 装飾 -->
    <Square v-for="index in squares" :key="index" />
  </div>
</template>
<script>
import Header from "../components/header/HeaderMakeBook";
import Square from "../components/square/Square";
import SectionPage from "../components/common/SectionPage";

import Hls from "hls.js";

export default {
  data: () => {
    return {
      squares: [],
      docYScale: 5,
      hls: new Hls(),
      timer1: null,
      timer2: null,
      scrollY: 0,
    };
  },
  components: {
    Header,
    Square,
    SectionPage,
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    playVide1() {
      if (1300 > this.scrollY) {
        const video1 = document.getElementById("video1");
        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook1.m3u8"
          );
          this.hls.attachMedia(video1);
          var playPromise = video1.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                this.timer1 = null;
                if (this.timer1) clearTimeout(this.timer1);
                this.timer1 = setTimeout(() => {
                  playPromise;
                }, 1000);
                console.log("video play");
              })
              .catch((error) => {
                console.log("error");
              });
          }
        } else if (video1.canPlayType("application/vnd.apple.mpegurl")) {
          video1.src =
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook1.m3u8";
          video1.addEventListener("canplay", () => {
            var playPromise = video1.play();
            if (playPromise !== undefined) {
              playPromise
                .then((_) => {
                  this.timer1 = null;
                  if (this.timer1) clearTimeout(this.timer1);
                  this.timer1 = setTimeout(() => {
                    playPromise;
                  }, 1000);
                  console.log("video play");
                })
                .catch((error) => {
                  console.log("error");
                });
            }
          });
        }
      }
    },
    playVide2() {
      const video2 = document.getElementById("video2");
      if (1300 > this.scrollY) {
        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook2.m3u8"
          );
          this.hls.attachMedia(video2);
          var playPromise = video2.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                this.timer2 = null;
                if (this.timer2) clearTimeout(this.timer2);
                this.timer2 = setTimeout(() => {
                  playPromise;
                }, 1000);
                console.log("video play");
              })
              .catch((error) => {
                console.log("error");
              });
          }
        } else if (video2.canPlayType("application/vnd.apple.mpegurl")) {
          video2.src =
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook2.m3u8";
          video2.addEventListener("canplay", () => {
            var playPromise = video2.play();
            if (playPromise !== undefined) {
              playPromise
                .then((_) => {
                  this.timer2 = null;
                  if (this.timer2) clearTimeout(this.timer2);
                  this.timer2 = setTimeout(() => {
                    playPromise;
                  }, 1000);
                  console.log("video play");
                })
                .catch((error) => {
                  console.log("error");
                });
            }
          });
        }
      }
    },
    Scroll() {
      const timer3 = null;
      const timer4 = null;
      const scroll1 = window.addEventListener("scroll", this.playVide1);
      const scroll2 = window.addEventListener("scroll", this.playVide2);
      this.timer3 = setTimeout(() => {
        if (this.timer3) clearTimeout(this.timer3);
        scroll1();
        console.log("timer 3");
      }, 10000);
      this.timer4 = setTimeout(() => {
        if (this.timer4) clearTimeout(this.timer4);
        scroll2();
        console.log("timer 4");
      }, 10000);
    },
  },
  mounted() {
    this.squares = Array(200);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.playVide1);
    window.addEventListener("scroll", this.playVide2);
  },
  computed: {
    winHeight() {
      return window.innerHeight;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/config.scss";

.MAHOU_BOOK {
  height: 5000px;
  background-color: #50FFEA;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 800px) {
    height: 6000px;
  }
}

.MAHOU_BOOK_SECTION {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .MAHOU_IMAGE {
    order: 2;
  }
  .MAHOU_TEXT {
    order: 1;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}

.MAHOU_BOOK_SECTION_BLOCK {
  @media screen and (max-width: 800px) {
    margin-bottom: 96px;
    &:nth-child(odd) {
      .MAHOU_IMAGE {
        order: 2;
      }
      .MAHOU_TEXT {
        order: 1;
      }
    }
  }
}

.MAHOU_IMAGE {
  flex: 1.5;
  padding: 32px;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    border-radius: 32px;
    overflow: hidden;
  }
}

.MAHOU_TEXT {
  flex: 1;
  padding: 32px;
  p {
    color: white;
    background-color: black;
    font-size: 24px;
    font-weight: 800;
    text-align: left;
    padding: 0 16px;
    position: relative;
    margin-bottom: 8px;
    display: inline-block;
    &:nth-child(4n + 1) {
      left: -16px;
    }
    &:nth-child(4n + 2) {
      left: 16px;
    }

    a {
      padding: 8px 0;
      color: $magenta;
    }
  }
}

.MAHOU_PREVIEW {
  width: 240px;
  height: 460px;
}
.MAHOU_VIDEO {
  height: 640px;
  video {
    height: 100%;
  }
  @media screen and (max-width: 480px) {
    height: 440px;
  }
}
</style>