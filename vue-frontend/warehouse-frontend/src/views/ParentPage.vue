<script>
import {API_BASE_URL} from "@/config";
// import { Modal } from "bootstrap";

export default {
  data() {
    return {
      isModalVisible: true,
      parentId: "",
      mode: "",
      isParentScanning: false,
      errorMessage: ""
    };
  },
  mounted() {
    // this.modalInstance = new Modal(this.$refs.parentModal); // Initialize modal instance
    // this.modalInstance.show();
    this.isModalVisible = true;
    this.$nextTick(() => {
      this.$refs.parentId.focus();
    });
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
      // this.modalInstance.hide(); // Closes the modal properly
      //const backdrop = document.querySelector(".modal-backdrop");
      // const modal = document.querySelector("#parentScanModal");
      // // if (backdrop) {
      // //   backdrop.remove();
      // // }
      // //
      // if (modal) {
      //   modal.remove();
      // }
      this.isModalVisible = false;
    },
    async scanParentId() {
      this.isParentScanning = true;
      try {
        const response = await fetch(`${API_BASE_URL}/v1/lookup/parent/${this.parentId}?operation_mode=${this.mode}`);
        const data = await response.json();

        if (data.response_type === "OK") {
          playSuccessSound();
          //this.$router.push("/transaction");
          this.closeModal();
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
<!--      <button class="btn btn-primary" @click="showModal">Open Parent Scan</button>-->

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

  <!-- Transactions  -->
  <div class="container content mt-4">
    <div class="mb-3" style="margin-top: 15px;">
      <h3 class="fw-bold" style="padding-bottom: 10px;">Work in progress palleting</h3>
      <hr class="my-2"> <!-- Adds a horizontal line with small top/bottom margin -->
      <p style="margin-top: 20px; padding-bottom: 10px;">
        <span class="" style="color: #075976;">Parent ID: </span>
        <span class="text-dark">XXX123</span>
        <span style="color: #CED4DA; padding-left: 15px; padding-right: 15px;">|</span>
        <span class="" style="color: #075976;">Location: </span>
        <span class="text-dark">LOC456</span>
      </p>
    </div>

    <!-- Transaction Table -->
    <div class="card p-3 mt-3">
      <h5 class="fw-bold">Transaction</h5>
      <table class="table">  <!-- Removed 'table-striped' -->
        <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Asset ID</th>
          <th>Equipment</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>6</td>
          <td>SB001234</td>
          <td>-</td>
          <td>
            <div class="alert-warning">
              Cannot assign asset to parent:<br>
              Asset status: <strong>Registered</strong><br>
              Expected status: <strong>Boxed for shipping</strong>
            </div>
          </td>
          <td>
            <div>
              <br>
              <button class="logout btn" style="color: #075976;">Force</button>
            </div>

          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>SB004321</td>
          <td>-</td>
          <td>SB004321 is already assigned to XXX123</td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>SB001243</td>
          <td>-</td>
          <td>SB001243 is already assigned to XXX123</td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>SB003412</td>
          <td>-</td>
          <td>SB003412 is already assigned to XXX123</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Inventory List -->
    <div class="card p-3 mt-4">
      <h5 class="d-flex justify-content-between">
        <span>Inventory list</span>
        <span style="color: #075976;">Inventory list count: <strong>3</strong></span>
      </h5>
      <table class="table">  <!-- Removed 'table-striped' -->
        <thead>
        <tr>
          <th>Asset ID</th>
          <th>Status</th>
          <th>Make</th>
          <th>Model</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>SB004321</td>
          <td>Boxed for shipping</td>
          <td>Acer</td>
          <td>0560X</td>
        </tr>
        <tr>
          <td>SB001243</td>
          <td>Boxed for shipping</td>
          <td>Dell</td>
          <td>Inspiron</td>
        </tr>
        <tr>
          <td>SB003412</td>
          <td>Boxed for shipping</td>
          <td>Apple</td>
          <td>Macbook Air</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer d-flex w-100">
    <div class="container d-flex justify-content-end">
<!--      <button class="btn btn-primary me-2">Cancel</button>-->
      <button class="btn btn-primary">Finish scanning</button>
    </div>
  </div>

</template>



<style scoped>

.modal-backdrop.fade {
  opacity: 0.80;
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
  border-radius: 10px;
}
</style>