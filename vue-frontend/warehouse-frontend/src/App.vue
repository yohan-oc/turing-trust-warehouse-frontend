<script>
import AppTemplate from './components/AppTemplate.vue';

export default {
  name: "App",
  components: {
    AppTemplate
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
          this.$refs.modeInput.focus();
        })
      } else{
        alert("Error: Invalid operator name: " + this.operatorName)
      }
    },
    async fetchModes() {
      try {
        const response = await fetch("http://localhost:8080/v1/getmodes");
        const data = await response.json();
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

<template>
  <AppTemplate />
</template>

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