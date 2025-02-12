<script>
import {API_BASE_URL} from "@/config";

export default {
  data() {
    return {
      isModalVisible: true,
      parentId: "",
      mode: "",
      isParentScanning: false,
      errorMessage: "",
      assetId: "",
      transactionErrorCount: 0,
      inventoryList: []
    };
  },
  mounted() {

    let inventoryListInDb = localStorage.getItem("inventoryList");

    if(inventoryListInDb) {
      this.inventoryList = JSON.parse(inventoryListInDb);
    }

    let parentIdInDb = localStorage.getItem("parentId");

    if(parentIdInDb){
      this.parentId = parentIdInDb;
      this.isModalVisible = false;
      this.$nextTick(() => {
        this.$refs.assetId.focus();
      });
    }
    else {
      this.$nextTick(() => {
        this.$refs.parentId.focus();
      });
    }

    this.mode = localStorage.getItem("mode");
  },
  methods: {
    showModal() {
      this.isModalVisible = true; // Show the modal again
      this.$nextTick(() => {
        this.$refs.parentId.focus(); // Auto-focus input
      });
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async scanParentId() {
      this.isParentScanning = true;
      try {
        const response = await fetch(`${API_BASE_URL}/v1/lookup/parent/${this.parentId}?operation_mode=${this.mode}`);
        const data = await response.json();

        if (data.response_type === "OK") {
          playSuccessSound();

          this.inventoryList = data.asset_data.child_assets;

          localStorage.setItem('parentId', this.parentId);
          localStorage.setItem('inventoryList', JSON.stringify(this.inventoryList));
          this.closeModal();

          this.$nextTick(() => {
            this.$refs.assetId.focus();
          });

        } else {
          playErrorSound();
          if(data.message) {
            this.errorMessage = data.message;
          } else {
            this.errorMessage = "Invalid scan detected";
          }

        }
      } catch (error) {
        console.error("API Error:", error);
        alert("API Error:", error);
      }
      finally {
        this.isParentScanning = false;
      }
    },
    goBack(){
      this.closeModal();
      this.$router.push("/");
    },
    endSession(){
      localStorage.removeItem('mode');
      localStorage.removeItem('parentId');
      localStorage.removeItem('inventoryList');
      this.$router.push("/");
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
    <div>
      <!-- Button to Show Modal Again -->
      <!-- <button class="btn btn-primary" @click="showModal">Open Parent Scan</button>-->

      <!-- Modal (Rendered Only When Needed) -->
      <div v-if="isModalVisible" class="modal fade show d-block" id="parentScanModal" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Scan parent</h5>
            </div>

            <div class="modal-body">
                <img src="../assets/parent-scan.png" alt="Parent Id" class="logo">
                <p class="text-muted">Scan the barcode or enter the ID of the pallet that you’ll be adding boxes to.</p>

                <div class="mb-3">
                  <label for="parentId" class="form-label">Parent ID</label>
                  <input type="text" class="form-control" id="parentId" v-model="parentId" ref="parentId">
                </div>

                <div class="form-group d-flex justify-content-end">
                  <button class="btn btn-primary" @click="goBack" style="width: 100px; margin-right: 8px">Cancel</button>
                  <button class="btn btn-primary" @click="scanParentId" style="width: 100px">
                    <span v-if="isParentScanning" class="spinner-border spinner-border-sm"></span>
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
        </div>
      </div>

      <!-- Modal Backdrop (Controlled by Vue) -->
      <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
    </div>

  <!-- Transactions & Inventory List -->
  <div class="container content mt-4">
    <div class="mb-3" style="margin-top: 15px;">
      <h2 class="" style="color: #075976">{{ mode }}</h2>
    </div>

    <!-- Transaction Table -->
    <div class="row" style="padding-bottom: 100px;">
      <div class="col-md-9">
        <div class="card p-3 mt-3">
        <h4 style="color: #075976">Transactions</h4>
        <div class="col-md-6" style="padding-bottom: 25px;">
          <label for="assetId" class="form-label">Asset ID</label>
          <div class="d-flex">
            <input type="text" class="form-control" id="assetId" v-model="assetId" ref="assetId">
            <button class="btn btn-secondary" @click="goBack" style="margin-left: 8px;">Add</button>
          </div>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Asset ID</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style="background-color: rgba(07, 59, 76, 0.05)">5</td>
            <td style="background-color: rgba(07, 59, 76, 0.05)">SB004321</td>
            <td style="background-color: rgba(07, 59, 76, 0.05)">SB004321 is already assigned to XXX123</td>
            <td style="background-color: rgba(07, 59, 76, 0.05)"></td> </tr>
          <tr>
            <td>4</td>
            <td>SB001243</td>
            <td>SB001243 is already assigned to XXX123</td>
            <td></td> </tr>
          <tr>
            <td>3</td>
            <td>SB003412</td>
            <td>SB003412 is already assigned to XXX123</td>
            <td></td> </tr>
          </tbody>
        </table>
      </div>
        <div class="card p-3 mt-5">
          <h4 style="color: #075976">Inventory List</h4>
          <p style="padding-bottom: 5px;">Assets assigned to the parent will display below.</p>
          <table class="table">
            <thead>
            <tr>
              <th>Asset ID</th>
              <th>Status</th>
              <th>Make</th>
              <th>Model</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in inventoryList" :key="item.Id">
              <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">{{ item.Name }}</td>
              <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">{{ item.Status }}</td>
              <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">{{ item.Make__c }}</td>
              <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">{{ item.Model__c }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card p-3 mt-3 card-summary">
          <div class="parent-id">
            <h6 style="color: #CED4DA">Parent ID</h6>
            <h3>{{ parentId }}</h3>
          </div>
          <hr/>
          <div class="transaction-errors">
            <h6 style="color: #CED4DA">Transaction Errors</h6>
            <h3>{{ transactionErrorCount }}</h3>
          </div>
          <hr/>
          <div class="inventory-count">
            <h6 style="color: #CED4DA">Inventory List Count</h6>
            <h3>{{ inventoryList.length }}</h3>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="footer d-flex w-100">
    <div class="container d-flex justify-content-end">
<!--      <button class="btn btn-primary me-2">Cancel</button>-->
      <button class="btn btn-primary" @click="endSession">Finish scanning</button>
    </div>
  </div>

</template>



<style scoped>

* {
  font-family: 'Barlow', sans-serif;
}
.modal-backdrop.fade {
  opacity: 0.80;
}
table{
  font-size: 16px;
}
thead {
  border-bottom: 2px solid #000;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.card {
  border-radius: 10px;
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

.btn-secondary{
  border-color: #075976;
  color: #075976;
  background-color: #fff;
}

.btn-secondary:hover {
  background-color: #075976;
  border-color: #075976;
  color: #fff;
}

.logo {
  display: block;
  margin: 0 auto 15px;
  width: 48px;
}
.title{
  /*margin-left: -168px;*/
  color: #075976;
  font-size: 34px;
}
.card {
  border-radius: 5px;
}
.card-summary{
  background-color: #075976;
  color: #fff;
}
</style>