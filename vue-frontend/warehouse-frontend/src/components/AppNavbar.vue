<template>
  <nav class="navbar navbar-dark px-4">
<!--    <router-link to="/mode" class="navbar-brand">-->
<!--      <img src="../assets/logo_new.png" alt="Turing Trust Logo" height="30">-->
<!--    </router-link>-->
    <span class="navbar-brand">
      <img src="@/assets/logo_new.png" alt="Turing Trust Logo" height="30">
    </span>
<!--    <button class="logout btn btn-link text-white" @click="logout"><i class="bi bi-box-arrow-left" style="padding-right: 5px;"></i>Logout</button>-->
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  methods: {
    logout() {
      // localStorage.removeItem('isAuthenticated');
      // localStorage.removeItem('operatorName');
      // localStorage.removeItem('mode');
      // this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #0b4c62;
}
.navbar-brand {
  color: white;
  font-weight: bold;
}
.logout {
  color: white;
  text-decoration: none;
}
</style>