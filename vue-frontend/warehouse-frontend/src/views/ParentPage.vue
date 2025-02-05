<script>
export default {
  data() {
    return {
      parentId: "",
      mode: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.parentId.focus();
    });
    this.mode = localStorage.getItem("mode");
  },
  methods: {
    scanParentId() {
      // if (this.username) {
      //   this.$router.push("/mode"); // Navigate to Home after login
      // } else {
      //   alert("Please enter username");
      // }
      this.$router.push("/location");
    },
  }
};
</script>

<template>

  <div class="d-flex justify-content-center align-items-center vh-80 flex-column">
    <p class="title">{{ mode }}</p>

    <!-- Card Container -->
    <div class="card shadow">
      <img src="../assets/parent-scan.png" alt="Parent Id" class="logo">
      <p class="text-l"><b>Scan parent</b></p>
      <p class="text-muted">
        Scan the barcode or enter the ID of the pallet that you’ll be
        adding boxes to.
      </p>

      <div class="mb-3">
        <label for="parentId" class="form-label">Parent ID</label>
        <input type="text" class="form-control" id="parentId" v-model="parentId" ref="parentId">
      </div>

      <div class="form-group">
        <button class="btn btn-primary" @click="scanParentId" style="width: 237px; margin-right: 8px">Cancel</button>
        <button class="btn btn-primary" @click="scanParentId" style="width: 237px">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  /*margin-left: -168px;*/
  color: #075976;
  font-size: 34px;
}
</style>