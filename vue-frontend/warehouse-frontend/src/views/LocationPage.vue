<script>
export default {
  data() {
    return {
      locationId: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.locationId.focus();
    });
  },
  methods: {
    scanLocationId() {
      // if (this.username) {
      //   this.$router.push("/mode"); // Navigate to Home after login
      // } else {
      //   alert("Please enter username");
      // }
      //this.$router.push("/parent");
    },
  }
};
</script>

<template>
  <nav class="navbar navbar-dark px-4">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo_new.png" alt="Turing Trust Logo" height="30">
    </a>
    <a class="logout" href="#"><i class="bi bi-box-arrow-left"></i> Log out</a>
  </nav>

  <div class="d-flex justify-content-center align-items-center vh-80 flex-column">
    <!-- Heading Outside the Card, Aligned to the Left -->
    <p class="title">Work in progress palleting</p>

    <!-- Card Container -->
    <div class="card shadow">
      <img src="../assets/location-scan.png" alt="Parent Id" class="logo">
      <p class="text-l"><b>Scan location</b></p>
      <p class="text-muted">
        Scan the barcode or enter the ID of the location where the pallet
        will be stored.
      </p>

      <div class="mb-3">
        <label for="parentId" class="form-label">Location ID</label>
        <input type="text" class="form-control" id="parentId" v-model="locationId" ref="locationId">
      </div>

      <div class="form-group">
        <button class="btn btn-primary" @click="scanLocationId" style="width: 237px; margin-right: 8px">Cancel</button>
        <button class="btn btn-primary" @click="scanLocationId" style="width: 237px">Continue</button>
      </div>
    </div>
  </div>
</template>

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
.vh-80 {
  height: 80vh;
}
.card {
  padding: 30px;
  border-radius: 10px;
  max-width: 546px;
  width: 100%;
  border-bottom-width: 3px;
  border-bottom-color: #04A27D;
}
.btn-primary {
  border-color: #04A27D;
  color: #04A27D;
  background-color: #fff;
}
.btn-primary:hover {
  background-color: #04A27D;
  border-color: #04A27D;
  color: #fff;
}
.logo {
  display: block;
  margin: 0 auto 15px;
  width: 150px;
}
.title{
  margin-left: -168px;
  color: #075976;
  font-size: 34px;
}
</style>