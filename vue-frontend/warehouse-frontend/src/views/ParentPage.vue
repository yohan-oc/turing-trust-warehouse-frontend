<script>
export default {
  data() {
    return {
      parentId: "",
      mode: "",
      isLoading: false,
      errorMessage: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.parentId.focus();
    });
    this.mode = localStorage.getItem("mode");
  },
  methods: {
    async scanParentId() {
      // if (this.username) {
      //   this.$router.push("/mode"); // Navigate to Home after login
      // } else {
      //   alert("Please enter username");
      // }
      this.isLoading = true;
      try {
        const response = await fetch(`https://stevett.pythonanywhere.com/v1/lookup/parent/${this.parentId}?operation_mode=${this.mode}`);
        const data = await response.json();

        if (data.response_type === "OK") {
          playSuccessSound();
          this.$router.push("/transaction");
        } else {
          playErrorSound();
          this.errorMessage = data.message;
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("API Error:", error);
      }
      finally {
        this.isLoading = false;
      }
    }
  }
};

function playErrorSound(){
  const errorSound = new Audio(require('@/assets/sounds/error-sound.mp3'));
  errorSound.play();
}

function playSuccessSound(){
  const successSound = new Audio(require('@/assets/sounds/success-sound.mp3'));
  successSound.play();
}
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
        <input type="text" class="form-control" id="parentId" v-model="parentId" @keyup.enter="scanParentId"  ref="parentId">
      </div>

      <div class="form-group">
        <button class="btn btn-primary" @click="scanParentId" style="width: 237px; margin-right: 8px">Cancel</button>
        <button class="btn btn-primary" @click="scanParentId" style="width: 237px">
          <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
          <span v-else>Continue</span>
        </button>
      </div>

      <div v-if="errorMessage" class="mt-3">
        <p class="text-danger">
          <i class="bi bi-exclamation-octagon-fill" style="padding-right: 5px;"></i> {{ errorMessage }}
        </p>
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