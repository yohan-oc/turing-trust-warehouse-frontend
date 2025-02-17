<script>
import {API_BASE_URL, API_REFERENCE, OPERATOR_NAME} from "@/config";
import {playErrorSound, playSuccessSound} from '@/utils/soundUtils';


export default {
  data() {
    return {
      isParentScanModalVisible: true,
      parentId: "",
      mode: "",
      isParentScanning: false,
      isAssetScanning: false,
      errorMessage: "",
      assetId: "",
      inventoryList: [],
      transactionsList: []
    };
  },
  computed: {
    transactionErrorCount() {
      return this.transactionsList.filter(
          (t) => t.response_type === "Verify" || t.response_type === "Problem"
      ).length;
    }
  },
  mounted() {

    let inventoryListInDb = localStorage.getItem("inventoryList");

    if (inventoryListInDb) {
      this.inventoryList = JSON.parse(inventoryListInDb);
    }

    let transactionsListInDb = localStorage.getItem("transactionsList");

    if (transactionsListInDb) {
      this.transactionsList = JSON.parse(transactionsListInDb);
    }

    let parentIdInDb = localStorage.getItem("parentId");

    if (parentIdInDb) {
      this.parentId = parentIdInDb;
      this.isParentScanModalVisible = false;
      this.$nextTick(() => {
        this.$refs.assetId.focus();
      });
    } else {
      this.$nextTick(() => {
        this.$refs.parentId.focus();
      });
    }

    this.mode = localStorage.getItem("mode");

    document.addEventListener("click", this.ensureFocus);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.ensureFocus);
  },
  methods: {
    ensureFocus(event) {
      const input = this.$refs.assetId;

      // Ignore focus enforcement if modal is open
      if (this.isParentScanModalVisible) {
        return;
      }

      // Ignore button clicks (prevent refocusing when clicking buttons)
      if (event.target.tagName === "BUTTON") {
        return;
      }

      // Allow user to select text
      //if (window.getSelection().toString().length > 0) return;

      // Allow clicking inside input fields without refocusing
      //if (event.target.tagName === "INPUT" || event.target.isContentEditable) return;

      // Refocus if input is not already active
      if (document.activeElement !== input && input) {
        input.focus();
      }
    },
    showModal() {
      this.isModalVisible = true; // Show the modal again
      this.$nextTick(() => {
        this.$refs.parentId.focus(); // Auto-focus input
      });
    },
    closeModal() {
      this.isParentScanModalVisible = false;
    },
    async scanParentId() {
      this.isParentScanning = true;
      try {
        let url = `${API_BASE_URL}/v1/lookup/parent/${this.parentId}?operation_mode=${this.mode}`
        const response = await fetch(url);
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
          if (data.message) {
            this.errorMessage = data.message;
          } else {
            this.errorMessage = "Invalid scan detected";
          }

        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        this.isParentScanning = false;
      }
    },
    async scanAsset() {
      // validating input
      if(!this.assetId){
        return;
      }

      this.isAssetScanning = true;
      try {
        let url = `${API_BASE_URL}/v1/parent/add/${this.assetId}?parentid=${this.parentId}&reference=${API_REFERENCE}&operation_mode=${this.mode}&operator_name=${OPERATOR_NAME}&force=false`

        const response = await fetch(url);
        const data = await response.json();

        let transaction = {
          "id": this.transactionsList.length + 1,
          "assetId": data.asset_data.assetid,
          "make": data.asset_data.Make__c,
          "model": data.asset_data.Model__c,
          "Status": data.asset_data.Status,
          "message": data.message,
          "response_type": data.response_type,
          "transaction_id": data.transaction_id,
          "isForcing": false
        }

        this.transactionsList.unshift(transaction);
        if (transaction.response_type === "OK") {
          playSuccessSound();
          const isAssetExist = this.inventoryList.find(asset => asset.Name === transaction.assetId);
          if (!isAssetExist) {
            const foundAsset = data.parent_data.child_assets.find(asset => asset.Name === transaction.assetId);
            this.inventoryList.unshift(foundAsset);
            localStorage.setItem('inventoryList', JSON.stringify(this.inventoryList));
          }

        } else if (transaction.response_type === "Problem") {
          playErrorSound();
        } else if (transaction.response_type === "Verify") {
          playErrorSound();
        }

        localStorage.setItem('transactionsList', JSON.stringify(this.transactionsList));
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        this.isAssetScanning = false;
        this.assetId = "";
        this.$nextTick(() => {
          this.$refs.assetId.focus();
        });
      }
    },
    async forceAsset(forcedAsset) {
      forcedAsset.isForcing = true;

      try {
        let url = `${API_BASE_URL}/v1/parent/add/${forcedAsset.assetId}?parentid=${this.parentId}&reference=${API_REFERENCE}&operation_mode=${this.mode}&operator_name=${OPERATOR_NAME}&force=true`

        const response = await fetch(url);
        const data = await response.json();

        forcedAsset.message = data.message;
        forcedAsset.response_type = data.response_type;
        forcedAsset.transaction_id = data.transaction_id;

        if (forcedAsset.response_type === "OK") {
          playSuccessSound();
          const isAssetExist = this.inventoryList.find(asset => asset.Name === forcedAsset.assetId);
          if (!isAssetExist) {
            const foundAsset = data.parent_data.child_assets.find(asset => asset.Name === forcedAsset.assetId);
            this.inventoryList.unshift(foundAsset);
            localStorage.setItem('inventoryList', JSON.stringify(this.inventoryList));
          }

        } else if (forcedAsset.response_type === "Problem") {
          playErrorSound();
        } else if (forcedAsset.response_type === "Verify") {
          playErrorSound();
        }

        localStorage.setItem('transactionsList', JSON.stringify(this.transactionsList));
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        forcedAsset.isForcing = false;
        this.$nextTick(() => {
          this.$refs.assetId.focus();
        });
      }
    },
    getStatusClass(type) {
      return {
        Verify: "verify-status",
        Problem: "problem-status",
        OK: "ok-status"
      }[type] || "";
    },
    goBack() {
      this.closeModal();
      this.$router.push("/");
    },
    endSession() {
      // Remove event listener before component is destroyed
      document.removeEventListener("click", this.ensureFocus);
      localStorage.removeItem('mode');
      localStorage.removeItem('parentId');
      localStorage.removeItem('inventoryList');
      localStorage.removeItem('transactionsList');

      this.$router.push("/");
    }
  }
};
</script>

<template>

  <!-- Scan parent modal -->
  <div>
    <!-- Button to Show Modal Again -->
    <!-- <button class="btn btn-primary" @click="showModal">Open Parent Scan</button>-->

    <!-- Modal (Rendered Only When Needed) -->
    <div v-if="isParentScanModalVisible" class="modal fade show d-block" id="parentScanModal" aria-modal="true"
         role="dialog">
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
              <input type="text" class="form-control" id="parentId" v-model="parentId" ref="parentId"
                     @keyup.enter="scanParentId">
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
    <div v-if="isParentScanModalVisible" class="modal-backdrop fade show"></div>
  </div>

  <!-- Transactions & Inventory List -->
  <div class="container content mt-4">
    <div class="mb-3" style="margin-top: 15px;">
      <h2 class="" style="color: #075976">{{ mode }}</h2>
    </div>

    <div class="row" style="padding-bottom: 100px;">
      <!-- Transactions -->
      <div class="col-md-9">
        <div class="card p-3 mt-3">
          <h4 style="color: #075976">Transactions</h4>
          <div class="col-md-6" style="padding-bottom: 25px;">
            <label for="assetId" class="form-label">Asset ID</label>
            <div class="d-flex">
              <input type="text" class="form-control" id="assetId" v-model="assetId" ref="assetId"
                     @keyup.enter="scanAsset" @blur="ensureFocus" style="width: 460px;">
              <button class="btn btn-secondary" @click="scanAsset" style="margin-left: 8px; width: 60px; height: 38px;">
                <span v-if="isAssetScanning" class="spinner-border spinner-border-sm"></span>
                <span v-else>Add</span>
              </button>
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
            <transition-group name="fade" tag="tbody">
              <tr v-for="(item, index) in transactionsList" :key="item.id">
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.id }}
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.assetId }}
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  <div :class="['alert-warning', getStatusClass(item.response_type)]">
                    {{ item.message }}
                  </div>
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  <button v-if="item.response_type === 'Verify'" class="btn btn-secondary"
                          style="min-width: 66px;" @click="forceAsset(item)">
                    <span v-if="item.isForcing" class="spinner-border spinner-border-sm"></span>
                    <span v-else>Force</span>
                  </button>
                </td>
              </tr>
            </transition-group>
          </table>
        </div>

        <!-- Inventory List -->
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
            <transition-group name="fade" tag="tbody">
              <tr v-for="(item, index) in inventoryList" :key="item.Id">
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.Name }}
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.Status }}
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.Make__c }}
                </td>
                <td :style="{ backgroundColor: index === 0 ? 'rgba(07, 59, 76, 0.05)' : 'transparent' }">
                  {{ item.Model__c }}
                </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>

      <!-- Summary -->
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
      <!-- <button class="btn btn-primary me-2">Cancel</button>-->
      <button class="btn btn-primary" @click="endSession">Finish scanning</button>
    </div>
  </div>

</template>


<style scoped>
.force {
  color: white;
  text-decoration: none;
  border: 0 none;
}


.alert-warning {
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}

.verify-status {
  background-color: #fff3cd;
  color: #856404;
}
.problem-status {
  background-color: palevioletred;
  color: white;
}
.ok-status {
  background-color: #04A27D;
  color: white;
}
.is-valid {
  border: 2px solid green;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='green' width='20px' height='20px'%3E%3Cpath d='M9 19.4l-5.7-5.7 1.4-1.4L9 16.6l10.3-10.3 1.4 1.4L9 19.4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

.is-invalid {
  border: 2px solid red;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' width='20px' height='20px'%3E%3Cpath d='M12 10.6l4.6-4.6 1.4 1.4L13.4 12l4.6 4.6-1.4 1.4L12 13.4l-4.6 4.6-1.4-1.4L10.6 12 6 7.4 7.4 6 12 10.6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.modal-backdrop.fade {
  opacity: 0.80;
}

table {
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

.btn-secondary {
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

.title {
  /*margin-left: -168px;*/
  color: #075976;
  font-size: 34px;
}

.card {
  border-radius: 5px;
}

.card-summary {
  background-color: #075976;
  color: #fff;
}
</style>