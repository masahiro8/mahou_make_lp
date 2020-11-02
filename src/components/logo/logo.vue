<template>
  <div class="main_logo">
    <router-link to="/">
      <img
        src="https://storage.googleapis.com/mahou_make/Assets/LOGO-MARK-SHADOW.png"
      />
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.main_logo {
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: 99;

  img {
    width: 32px;
  }
}
</style>