<script>
export default {
  data() {
    return {
      locationId: "",
      mode:""
    };
  },
  mounted() {
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  }
};
</script>

<template>

  <div class="d-flex justify-content-center align-items-center vh-70 flex-column">


    <!-- Card Container -->
    <div class="card text-center">
      <img src="../assets/tick-mark.png" alt="Tick" class="logo">

      <p class="title">Work in progress palleting complete!</p>

      <p style=" font-size: 20px; color: rgba(7, 89, 118, 1); font-weight: 500;">Return to the mode selection screen or select ‘new WIP pallet’ below to start scanning assets on a new pallet.</p>
      <br/>
      <div class="form-group">
        <button class="btn btn-primary" @click="goToHome" style="width: 237px; margin-right: 8px">New WIP pallet</button>
        <button class="btn btn-primary" @click="goToHome" style="width: 237px">Return to mode select</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vh-70 {
  height: 70vh;
}
.card {
  padding: 30px;
  border: none;
  max-width: 600px;
  width: 100%;
  background-color: inherit;
}
.btn-primary {
  border-color: #04A27D;
  color: #04A27D;
  background-color: inherit;
}
.btn-primary:hover {
  background-color: #04A27D;
  border-color: #04A27D;
  color: #fff;
}
.logo {
  display: block;
  margin: 0 auto 15px;
  width: 48px;
}
.title{
  color: rgba(7, 89, 118, 1);
  font-size: 32px;
  font-weight: 500;
}
</style>