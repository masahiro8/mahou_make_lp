<template>
  <div class="book">
    <h1 class="heading">
      MAHOU BOOK
      <router-link to="/makebook" class="link"
        >バーチャルメイクをWEBサイトに導入する手順はこちら</router-link
      >
      <a
        href="https://docs.google.com/forms/d/1dK6efYfg8DXEGFvg3OFsnvTOUVgDvUe9lOcFz_uMuto"
        class="link"
        target="_blank"
        >お問い合わせはこちら</a
      >
    </h1>
    <div>
      <div class="header">
        <p class="col-image"></p>
        <p class="col-date">Date</p>
        <p class="col-category">Category</p>
        <p class="col-brand">Brand</p>
        <p class="col-product">Product</p>
        <p class="col-link">link</p>
      </div>
      <ul class="products" id="products">
        <li v-for="(product, index) in products" :key="index" class="product">
          <div class="col-image">
            <div class="image">
              <Thumbnail :src="getImage(product.images[0])" />
            </div>
          </div>
          <div class="col-date">{{ editDate(product.updatedate) }}</div>
          <div class="col-category">{{ product.category }}</div>
          <div class="col-brand">{{ getBrandName(product.brand) }}</div>
          <div class="col-product">{{ product.title }}</div>
          <div class="col-link">
            <button
              class="link-button"
              @click="openModal(product.jsonBookName)"
            >
              link
            </button>
          </div>
        </li>
      </ul>
      <div>
        <Popup @close="closeModal" v-if="modal">
          <p>購入ページのURLを入力</p>
          <div class="input-group">
            <div class="input-text-wrapper">
              <input
                class="input-text"
                type="text"
                id="url"
                name="url"
                value=""
                placeholder="https://your-ec-site.com"
              />
              <input
                class="create-button"
                type="button"
                value="リンク生成"
                @click="create()"
              />
            </div>
            <div>
              <input
                class="clear-button"
                type="button"
                value="クリア"
                @click="clear()"
              />
            </div>
          </div>

          <p>リンクURL</p>
          <div class="script-group">
            <a
              class="copy-button"
              :href="getLinkUrl"
              target="_blank"
              rel="noopener noreferrer"
              ><ExternalLink :size="20" fillColor="#999"
            /></a>
            <p class="script">
              {{ getLinkUrl }}
            </p>
          </div>
          <p>埋め込みスクリプト</p>
          <div class="script-group">
            <button class="copy-button" @click="copyToClipboard">
              <ContentCopy :size="20" fillColor="#999" />
            </button>
            <div class="script" id="copyFrom">
              {{ getScript }}
            </div>
          </div>
        </Popup>
      </div>
    </div>
    <Logo />
  </div>
</template>
<script>
import * as _ from "lodash";
import { SEGMENTS } from "../constants";
import Thumbnail from "../components/thumbnail/Thumbnail.vue";
import Popup from "../components/popup/Popup.vue";
import ContentCopy from "vue-material-design-icons/ContentCopy.vue";
import ExternalLink from "vue-material-design-icons/OpenInNew.vue";
import Logo from "../components/logo/logo";

export default {
  data: () => {
    return {
      SEGMENTS,
      projects: null,
      products: [],
      brands: [],
      images: [],
      modal: false,
      url: null,
      json_book_name: null,
      createLink: false,
    };
  },
  components: { Thumbnail, Popup, ContentCopy, ExternalLink, Logo },
  async created() {
    let response = await fetch(
      "https://book.mahoumake.com/books/projects.json"
    );
    this.projects = await response.json();

    this.setProducts();
  },
  methods: {
    setProducts() {
      if (_.isNil(this.projects)) return;

      let items = [];
      _.forEach(SEGMENTS, (segments_value) => {
        let categoryItems = this.projects[segments_value];
        if (_.isNil(categoryItems)) return;

        _.forEach(categoryItems, (value) => {
          let item = _.cloneDeep(value);
          item["category"] = segments_value;
          items.push(item);
        });
      });

      let sortedItems = [];
      if (items.length > 0)
        sortedItems = _.orderBy(items, "updatedate", "desc");
      this.products = sortedItems;
      this.brands = this.projects["brands"];
      this.images = this.projects["images"];
    },
    getImage(id) {
      if (_.isNil(id)) return "";
      const _image = _.find(this.images, ["id", id]);
      //TODO:bookのuploadsから画像を読み込む
      return _image ? `https://lab.backham.biz/uploads${_image.file_path}` : "";
    },
    editDate(date) {
      if (_.isNil(date)) return "";
      return date.substr(0, 10);
    },
    getBrandName(id) {
      if (_.isNil(id)) return "";
      let brand = _.find(this.brands, ["id", id]);
      return brand ? brand["title"] : "";
    },
    openModal(id) {
      this.modal = true;
      this.json_book_name = id;
    },
    closeModal() {
      this.modal = false;
      this.createdLink = false;
      this.url = document.getElementById("url").value = null;
      localStorage.removeItem(this.json_book_name);
    },
    copyToClipboard() {
      let textVal = document.getElementById("copyFrom").innerHTML;
      textVal = textVal.replace(/&lt;/g, "<");
      textVal = textVal.replace(/&gt;/g, ">");
      alert("コピーされました！");

      //テキストエリアに値をセット
      let copyFrom = document.createElement("textarea");
      copyFrom.textContent = textVal;

      //bodyにテキストエリアを置く
      let bodyElm = document.getElementsByTagName("body")[0];
      bodyElm.appendChild(copyFrom);

      //テキストエリアの値を選択してコピー
      copyFrom.select();
      let retVal = document.execCommand("copy");
      bodyElm.removeChild(copyFrom);
      return retVal;
    },
    create() {
      this.createLink = true;
      const inputUrl = document.getElementById("url").value;
      this.url = encodeURIComponent(inputUrl);
      localStorage.setItem(this.json_book_name, this.url);
    },
    clear() {
      this.createdLink = false;
      this.url = document.getElementById("url").value = null;
      localStorage.setItem(this.json_book_name, this.url);
    },
  },
  computed: {
    getLinkUrl() {
      if (this.url && this.createLink) {
        return `https://book.mahoumake.com/?mahou=${this.json_book_name}&url=${this.url}`;
      } else {
        return "";
      }
    },
    getScript() {
      if (this.url && this.createLink) {
        return `<iframe allow="camera;microphone"
              src="https://book.mahoumake.com/?mahou=${this.json_book_name}&url=${this.url}"
              frameborder="0" width="100%" height="100%"> </iframe>`;
      } else {
        return "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/config.scss";
.book {
  overflow: hidden;
  box-sizing: border-box;
  max-width: 980px;
  height: 100vh;
  margin: 0 auto;
  background: white;
  text-align: left;
}

.link {
  font-size: 12px;
  padding: 4px 8px;
  background-color: #eee;
  display: inline-block;
  border-radius: 4px;
  letter-spacing: 0;
  color: #333;
  text-decoration: none;
  vertical-align: middle;
  margin: 0 8px;
  &:hover {
    color: black;
    background-color: #f3f3f3;
  }
}

.heading {
  padding: 20px;
}
.header {
  display: flex;
  padding: 0 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.products {
  margin: 0;
  padding: 0 20px;
  overflow-y: scroll;
  height: calc(100vh - 110px);
  list-style: none;
}
.product {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 8px 0;
}

.col-image,
.col-date,
.col-category,
.col-brand,
.col-product {
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 8px;
  font-size: 14px;
}

.col-image {
  flex-basis: 80px;
  width: 80px;
}

.col-date {
  flex-basis: 100px;
  width: 100px;
}

.col-category {
  flex-basis: 120px;
  width: 120px;
}

.col-brand {
  flex-basis: 180px;
  width: 180px;
}

.col-product {
  flex-basis: 360px;
  width: 360px;
}

.script-group {
  position: relative;
}

.script {
  margin-bottom: 16px;
  padding: 8px 24px 8px 10px;
  min-height: 40px;
  border: 1px solid #999;
  background: #eee;
  word-wrap: break-word;
}

.input-group {
  margin-bottom: 16px;
}

.input-text-wrapper {
  margin-bottom: 4px;
}

.input-text {
  margin-right: 8px;
  padding: 8px 10px;
  min-width: calc(100% - 112px);
  border: 1px solid #999;
  border-radius: 4px;
}

.create-button {
  outline: none;
  background: #eee;
  border-radius: 100px;
  padding: 0 12px;
}

.clear-button {
  display: block;
  outline: none;
  border: 1px solid #333;
  border-radius: 100px;
  margin-left: auto;
  padding: 0 12px;
}

.link-button {
  outline: none;
  background: #eee;
  border-radius: 100px;
  padding: 0 12px;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  outline: none;
  border: none;
}
</style>