<template>
  <div class="MAHOU_BOOK">
    <Header />
    <!-- 0ページ目 -->
    <SectionPage class="MAHOU_BOOK_SECTION_BLOCK">
      <div class="MAHOU_BOOK_SECTION">
        <div class="MAHOU_IMAGE">
          <div class="MAHOU_VIDEO">
            <video id="video1" controls muted autoplay playsinline loop></video>
          </div>
          <div class="MAHOU_VIDEO">
            <video id="video2" controls muted autoplay playsinline loop></video>
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
    <HWrapper>
      <VRMonkey />
    </HWrapper>
    <!-- LOGO -->
    <Logo />
    <!-- 装飾 -->
    <Square v-for="index in squares" :key="index" />
  </div>
</template>
<script>
import Header from "../components/header/HeaderMakeBook";
import Square from "../components/square/Square";
import SectionPage from "../components/common/SectionPage";
import HWrapper from "../components/common/HorizontalWrapper";
import VRMonkey from "../components/vrmonkey/Vrmonkey";
import Logo from "../components/logo/logo";
import Hls from "hls.js";
export default {
  data: () => {
    return {
      squares: [],
      docYScale: 5,
      hls: new Hls(),
      screenHeight: 0,
      videoItems: [
        {
          id: "video1",
          url:
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/makebook1.m3u8",
          playStatus: 0, // 0:未ロード, 1:再生中, 2:停止中
        },
        {
          id: "video2",
          url:
            "https://storage.googleapis.com/mahou_make/Assets/MAHOUMAKE_HLS/MAHOUMAKE2.m3u8",
          playStatus: 0, // 0:未ロード, 1:再生中, 2:停止中
        },
      ],
    };
  },
  components: {
    Header,
    Square,
    SectionPage,
    HWrapper,
    VRMonkey,
    Logo,
  },
  methods: {
    // 画選択処理
    playVideo() {
      this.videoItems.forEach((item) => {
        this.videoProc(item);
      });
    },
    // 動画再生処理
    videoProc(item) {
      const video = document.getElementById(item.id);
      const videoUrl = item.url;

      // ビデオの現在位置を取得
      const videoTop = video.getBoundingClientRect().top;

      if (this.screenHeight - (videoTop + 100) > 0 && videoTop + 100 > 0) {
        // 動画が再生してたら何もしない
        if (item.playStatus === 1) return;

        // 動画再生が終了したら動画が再生成できるようにする
        video.addEventListener("ended", () => {
          item.playStatus = 0;
        });

        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(videoUrl);
          this.hls.attachMedia(video);
          video.play();
        }
        // IOS Safariで再生する用
        else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = item.url;
          video.addEventListener("canplay", () => {
            video.play();
          });
        }
        // 動画最中はstatus1にする
        item.playStatus = 1;
      }
    },
  },
  mounted() {
    this.squares = Array(200);

    window.addEventListener("scroll", () => {
      this.playVideo();
    });

    this.screenHeight = window.innerHeight;
  },
  computed: {
    winHeight() {
      return window.innerHeight;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", () => {
      this.playVide();
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../style/config.scss";

.MAHOU_BOOK {
  height: 5600px;
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