<script>
export default {
  data() {
    return {
      // parentId: "",
      // mode: ""
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.parentId.focus();
    // });
    // this.mode = localStorage.getItem("mode");
  },
  methods: {
    // scanAssetId() {
    //   // if (this.username) {
    //   //   this.$router.push("/mode"); // Navigate to Home after login
    //   // } else {
    //   //   alert("Please enter username");
    //   // }
    //   this.$router.push("/location");
    // },
  }
};
</script>

<template>

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
      <button class="btn btn-primary me-2">Cancel</button>
      <button class="btn btn-primary">Finish scanning</button>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  padding-bottom: 60px;
}
.card {
  border-radius: 10px;
}
.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}
thead {
  border-bottom: 2px solid #000; /* Adjust thickness and color as needed */
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.content {
  flex: 1;
  padding-bottom: 60px;
}
.card {
  border-radius: 10px;
}
.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}
thead {
  border-bottom: 2px solid #000; /* Adjust thickness and color as needed */
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
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
</style>