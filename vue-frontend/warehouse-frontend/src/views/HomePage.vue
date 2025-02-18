<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    navigateToModePage(){
      this.$router.push("/mode");
    },
    navigateToMoveAssetPage(){
      this.$router.push("/moveAsset");
    }
  },
};
</script>

<template>

  <div class="container">
    <h4 class="section-title">Select a mode</h4>
    <p style="color: #075976;">Begin palleting or by selecting a mode below.</p>

    <div class="row" style="padding-top: 15px;">
      <div class="col-md-4">
        <div class="card" @click="navigateToModePage">
          <div class="d-flex align-items-start">
            <img src="../assets/palleting-and-shipping.png" alt="Work in Progress" width="50" class="me-3">
            <span style="font-size: 28px">Work in progress palleting</span>
          </div>
          <button class="arrow">
            <img src="../assets/flow-arrow.png" alt="Arrow" width="50" height="50">
          </button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card" @click="navigateToMoveAssetPage">
          <div class="d-flex align-items-start">
            <img src="../assets/moving-location.png" alt="Work in Progress" width="50" class="me-3">
            <span style="font-size: 28px">Moving assets</span>
          </div>
          <button class="arrow">
            <img src="../assets/flow-arrow.png" alt="Arrow" width="50" height="50">
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  margin-top: 40px;
}
.section-title {
  color: #0b4c62;
  margin-bottom: 10px;
}
.card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
.arrow {
  text-decoration: none;
  border-style: none;
  background-color: white;
  align-self: flex-end;
}
</style>