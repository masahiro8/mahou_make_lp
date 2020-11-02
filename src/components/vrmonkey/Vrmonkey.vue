<template>
  <div>
    <a class="vrmonkey" href="http://backham.me">
      <div class="image anim">
        <img :src="img" alt="" />
      </div>
      <div class="name anim">Backham Co., Ltd.</div>
    </a>
    <br />
    <br />
    <br />
    <a
      href="https://docs.google.com/forms/d/1dK6efYfg8DXEGFvg3OFsnvTOUVgDvUe9lOcFz_uMuto"
      target="_blank"
      class="name link"
      >CONTACT</a
    >
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      img: "https://storage.googleapis.com/mahou_make/Assets/VrmonkeyRed.png",
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/config.scss";
.vrmonkey {
  text-decoration: none;
}

.anim {
  animation-name: vrmonkey_anim;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1s;
}
@keyframes vrmonkey_anim {
  0% {
    transform: translate(0, 0px);
  }

  100% {
    transform: scale(1.02);
  }
}
.name {
  font-weight: 600;
  text-decoration: none;
  color: $magenta;
}

.link {
  text-decoration: underline;
}

.image {
  width: 240px;
  img {
    width: 100%;
    filter: brightness(150%) hue-rotate(-20deg);
  }
}
</style>