<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    login() {
      // if (this.username) {
      //   this.$router.push("/mode"); // Navigate to Home after login
      // } else {
      //   alert("Please enter username");
      // }
      this.$router.push("/mode");
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow">
    <img src="../assets/logo.png" alt="Turing Trust Logo" class="logo">
    <p class="text-l">Welcome to the Turing Trust warehouse management application.</p>
    <p class="text-muted">Please enter your name to get started.</p>

    <div class="mb-3">
      <label for="fullname" class="form-label">Full name</label>
      <input type="text" class="form-control" id="fullname" placeholder="Joe Bloggs" v-model="username">
    </div>

    <button class="btn btn-primary w-100" @click="login">Continue</button>
  </div>
</div>
</template>

<style scoped>
.vh-100 {
  height: 100vh;
}
.card {
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  border-bottom-width: 3px;
  border-bottom-color: #04A27D;
}
.btn-primary {
  background-color: #04A27D;
  border-color: #04A27D;
  border: none;
}
.btn-primary:hover {
  background-color: #04A27D;
}
.logo {
  display: block;
  margin: 0 auto 15px;
  width: 150px;
}
</style>