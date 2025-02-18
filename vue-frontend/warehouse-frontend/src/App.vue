<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.setBackgroundColor();
  },
  // watch: {
  //   $route() {
  //     this.setBackgroundColor();
  //   }
  // },
  methods: {
    setBackgroundColor() {
      // if (this.$route.path === '/') {
      //   document.body.style.backgroundColor = '#0b4c62';
      // } else {
      //   document.body.style.backgroundColor = '#f0f2f5';
      // }
      document.body.style.backgroundColor = '#f0f2f5';
    }
  }
};
</script>
