<template>
  <div class="container mt-3">
    <div class="mb-3">
      <label class="fw-bold">Operator Name:</label>
      <input type="text" class="form-control d-inline w-auto" :disabled="isOperatorDisabled" v-model="operatorName" @keyup.enter="checkOperator" ref="operatorInput">
      <label class="fw-bold ms-3">Current State:</label>
      <input type="text" class="form-control d-inline w-auto" value="Asset Scan" disabled>
      <button class="btn btn-secondary ms-3" style="margin-top: -5px;" disabled>Completed</button>

      <ModeDropdown v-model="selectedMode" :isDisabled="isModeDisabled" :modes="modes" @mode-changed="modeChanged" />
    </div>

    <div class="mb-3" v-if="showParent">
      <div class="d-flex align-items-center">
        <div class="col-auto">
          <label class="fw-bold" for="assetId">Parent ID:</label>
        </div>
        <div class="col">
          <div class="d-flex align-items-center">
            <input type="text" class="form-control d-inline w-auto" :disabled="isParentDisabled" v-model="parentId" @keyup.enter="scanParent" ref="parentInput">
            <span class="badge bg-success" v-if="isParentIdValid">OK</span>
            <div id="message" class="alert alert-danger ms-2 mb-0 custom-alert" style="display: none; max-width: 300px;">
              <!-- Error message will appear here -->
            </div>
            <div id="message-success" class="alert alert-success ms-2 mb-0 custom-alert" style="display: none; max-width: 300px;">
              <!-- Success message will appear here -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3" v-if="showAsset">
      <div class="d-flex align-items-center">
        <div class="col-auto">
          <label class="fw-bold" for="assetId">Asset ID:</label>
        </div>
        <div class="col">
          <div class="d-flex align-items-center">
            <input type="text" class="form-control d-inline w-auto" v-model="assetId" @keyup.enter="scanAsset" ref="assetInput">
            <div id="message" class="alert alert-danger ms-2 mb-0 custom-alert" style="display: none; max-width: 300px;">
              <!-- Error message will appear here -->
            </div>
            <div id="message-success" class="alert alert-success ms-2 mb-0 custom-alert" style="display: none; max-width: 300px;">
              <!-- Success message will appear here -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Section -->
    <h4 v-if="showTransActionsAndInventory">Transaction</h4>
    <div class="mb-2 text-end" v-if="showTransActionsAndInventory">Asset Scan Failure Count: <input type="text" value="0" class="form-control d-inline w-auto"></div>

    <table class="table table-bordered" v-if="showTransActionsAndInventory">
      <thead>
      <tr>
        <th>Transaction ID</th>
        <th>Asset ID</th>
        <th>Equipment</th>
        <th>Notes</th>
        <th>Force</th>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-warning-custom">
        <td>4</td>
        <td>SB001662</td>
        <td></td>
        <td>Cannot assign asset to parent: Asset Status was 'Registered', expected: Boxed for Shipping for mode 'Shipping Box Palleting'.</td>
        <td><button class="btn btn-primary">Force</button></td>
      </tr>
      <tr class="bg-success-custom">
        <td>3</td>
        <td>SB001662</td>
        <td></td>
        <td>SB001662 is already assigned to SP000123</td>
        <td></td>
      </tr>
      </tbody>
    </table>

    <!-- Inventory List Section -->
    <h4 v-if="showTransActionsAndInventory">Inventory List</h4>
    <div class="mb-2" v-if="showTransActionsAndInventory">Inventory list count <input type="text" value="2" class="form-control d-inline w-auto"></div>

    <table class="table table-bordered" v-if="showTransActionsAndInventory">
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
        <td>SB000555</td>
        <td>Boxed for Shipping</td>
        <td>null</td>
        <td>null</td>
      </tr>
      <tr>
        <td>SB001662</td>
        <td>Boxed for Shipping</td>
        <td>null</td>
        <td>null</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ModeDropdown from "./components/ModeDropdown.vue";

export default {
  name: "App",
  components: {
    ModeDropdown
  },
  data() {
    return {
      operatorName: "",
      isOperatorDisabled: false,
      parentId: "", // SP000123,
      isParentIdValid: false,
      isParentDisabled: false,
      assetId: "", // SP000123
      selectedMode: "",
      modes: [],
      isModeDisabled: true,
      showContent: false,
      showParent: false,
      showAsset: false,
      showTransActionsAndInventory: false,
    };
  },
  mounted() {
    this.fetchModes();
  },
  methods: {
    checkOperator() {
      let isAuthenticated = this.operatorName.trim().toUpperCase() === "SC";
      if(isAuthenticated){
        this.isModeDisabled = !isAuthenticated;
        this.$nextTick(() => {
          if (this.$refs.modeDropdown) {
            this.$refs.modeDropdown.focusDropdown();
          }
        })
      } else{
        alert("Error: Invalid operator name: " + this.operatorName)
      }
    },
    async fetchModes() {
      try {
        const response = await fetch("http://localhost:8080/v1/getmodes");
        const data = await response.json();

        console.log(data);
        this.modes = data.operation_modes; // Extract array from response

        // Ensure the first option is always "Select a mode"
        this.selectedMode = "Select a mode";
      } catch (error) {
        console.error("Error fetching modes:", error);
      }
    },
    modeChanged() {
      //alert(this.selectedMode)
      this.showParent = true;
      this.$nextTick(() => {
        this.$refs.parentInput.focus();
      })
    },
    scanParent() {
      this.showAsset = true;
      this.isModeDisabled = true;
      this.isParentIdValid = true;
      this.isOperatorDisabled = true;
      this.$nextTick(() => {
        this.$refs.assetInput.focus();
      })
    },
    scanAsset() {
      this.showTransActionsAndInventory = true;
      this.isParentDisabled = true;
    },
  },
};
</script>

<style>
.bg-warning-custom { background-color: yellow; }
.bg-success-custom { background-color: lightgreen; }
.text-end { text-align: end; }
.custom-alert {
  max-width: 300px;
  height: 38px; /* Adjust the height to match the input field's height */
  display: flex;
  align-items: center; /* Vertically center the text */
  padding: 7px 10px;
}
.form-control {
  height: 38px; /* Ensure the input field has the same height */
}
</style>