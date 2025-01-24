<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    login() {
      if (this.username) {
        this.$router.push("/home"); // Navigate to Home after login
      } else {
        alert("Please enter username");
      }
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <input type="text" class="form-control w-50 mb-2" placeholder="Enter username" v-model="username">
    <button class="btn btn-primary" @click="login">Login</button>
  </div>
</template>
