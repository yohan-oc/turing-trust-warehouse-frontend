<template>
  <div class="container mt-3">
    <div class="mb-3">
      <label class="fw-bold">Operator Name:</label>
      <input type="text" class="form-control d-inline w-auto" value="SC">
      <label class="fw-bold ms-3">Current State:</label>
      <input type="text" class="form-control d-inline w-auto" value="Asset Scan" disabled>
      <button class="btn btn-secondary ms-3" disabled>Completed</button>
      <label class="fw-bold ms-3">Mode:</label>
      <select class="form-select d-inline w-auto">
        <option selected>Work-in-Progress Palleting</option>
        <option selected>Shipping Box Palleting</option>
      </select>
    </div>

    <div class="mb-3">
      <div class="d-flex align-items-center">
        <div class="col-auto">
          <label class="fw-bold" for="assetId">Parent ID:</label>
        </div>
        <div class="col">
          <div class="d-flex align-items-center">
            <input type="text" class="form-control d-inline w-auto bg-warning" id="parentId" value="SP000123">
            <!-- <span class="badge bg-success">OK</span> -->
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

    <div class="mb-3">
      <div class="d-flex align-items-center">
        <div class="col-auto">
          <label class="fw-bold" for="assetId">Asset ID:</label>
        </div>
        <div class="col">
          <div class="d-flex align-items-center">
            <input type="text" class="form-control d-inline w-auto bg-warning" id="assetId">
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
    <h4>Transaction</h4>
    <div class="mb-2 text-end">Asset Scan Failure Count: <input type="text" value="0" class="form-control d-inline w-auto"></div>

    <table class="table table-bordered">
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
    <h4>Inventory List</h4>
    <div class="mb-2">Inventory list count <input type="text" value="2" class="form-control d-inline w-auto"></div>

    <table class="table table-bordered">
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
export default {
  name: "App",
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