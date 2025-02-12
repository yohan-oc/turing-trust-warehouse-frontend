<script>
import { API_BASE_URL } from "@/config";

export default {
  name: 'ModePage',
  data() {
    return {
      operationModes: [],
    }
  },
  mounted() {
    localStorage.removeItem('mode');
    localStorage.removeItem('parentId');
    localStorage.removeItem('inventoryList');
    this.fetchModes();
  },
  computed: {
    groupedModes() {
      return this.operationModes.reduce((acc, mode) => {
        if (!acc[mode.category]) {
          acc[mode.category] = [];
        }
        acc[mode.category].push(mode);
        return acc;
      }, {});
    }
  },
  methods: {
    async fetchModes() {
      try {
        const response = await fetch(`${API_BASE_URL}/v2/getmodes`);
        const data = await response.json();
        this.operationModes = data.operation_modes;
      } catch (error) {
        console.error("Error fetching modes:", error);
      }
    },
    chooseMode(mode) {
      localStorage.setItem('mode', mode);
      this.$router.push("/parent");
    }
  }
};
</script>

<template>
    <div class="container" v-if="operationModes.length > 0" >
      <h4 class="section-title">Select a mode</h4>
      <p style="color: #075976;">Begin palleting or by selecting a mode below.</p>

      <div v-for="(modes, category) in groupedModes" :key="category">
        <div class="row">
          <div class="col-md-2">
            <h5 class="section-title">{{ category }}</h5>
          </div>
          <div v-for="(mode, index) in modes" :key="mode.name" :class="['col-md-2', { 'offset-md-2': index !== 0 && index % 4 === 0 }]" style="padding-bottom: 25px;">
            <div class="card">
              <img :src="require(`@/assets/${mode.image_path || mode.image}`)" :alt="mode.name" width="50" class="d-block mx-auto">
              <p>{{ mode.name }}</p>
              <button class="btn btn-outline-success w-100" @click="chooseMode(mode.name)">Start →</button>
            </div>
          </div>
        </div>
      </div>

  </div>

  <div class="loading-screen" v-if="operationModes.length === 0" >
    <div class="spinner"></div>
    <h4>Loading, please wait...</h4>
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
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.card img {
  padding-bottom: 15px;
}
.btn-outline-success {
  border-color: #04A27D;
  color: #04A27D;
}
.btn-outline-success:hover {
  background-color: #04A27D;
  color: white;
}
.card {
  border-bottom-width: 3px;
  border-bottom-color: #04A27D;
}

/* loading screen css*/
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ddd;
  border-top: 5px solid #0b4c62;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>

<!--<template>-->
<!--  <div class="container">-->
<!--    <h4 class="section-title">Select a mode</h4>-->
<!--    <p style="color: #075976;">Begin palleting or by selecting a mode below.</p>-->

<!--    <div class="row">-->
<!--      <div class="col-md-2">-->
<!--        <h5 class="section-title">Palleting</h5>-->
<!--      </div>-->
<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/work-in-progress.png" alt="Work in Progress" width="50" class="d-block mx-auto">-->
<!--          <p>Work in progress palleting</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Work in progress palleting')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/shipping-box.png" alt="Shipping Box" width="50" class="d-block mx-auto">-->
<!--          <p>Shipping box palleting</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Shipping box palleting')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="row mt-4">-->
<!--      <div class="col-md-2">-->
<!--        <h5 class="section-title">Boxing</h5>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/desktop.png" alt="Wiped Desktops" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing (Wiped) Desktops for shipping</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing (Wiped) Desktops for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/desktop-imaged.png" alt="Imaged Desktops" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing (Imaged) Desktops for shipping</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing (Imaged) Desktops for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/laptop.png" alt="Wiped Laptops" width="50" class="d-block mx-auto">-->
<!--          <br/>-->
<!--          <p>Boxing (Wiped) Laptops for shipping</p>-->
<!--          <br/>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing (Wiped) Laptops for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/laptop-imaged.png" alt="Imaged Laptops" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing (Imaged) Laptops for shipping</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing (Imaged) Laptops for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="row mt-4 mb-5">-->
<!--      <div class="col-md-2"></div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/monitor.png" alt="Monitors" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing monitors for shipping</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing monitors for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/phone.png" alt="Phones and Laptops" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing (Wiped) phones and laptops for shipping</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing (Wiped) phones and laptops for shipping')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="col-md-2">-->
<!--        <div class="card">-->
<!--          <img src="../assets/money.png" alt="For Sale" width="50" class="d-block mx-auto">-->
<!--          <p>Boxing Desktops and Laptops for sale</p>-->
<!--          <button class="btn btn-outline-success w-100" @click="chooseMode('Boxing Desktops and Laptops for sale')">Start →</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
