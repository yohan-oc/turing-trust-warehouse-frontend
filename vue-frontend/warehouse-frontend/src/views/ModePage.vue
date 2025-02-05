<script>
export default {
  name: 'ModePage',
  mounted() {
    import('bootstrap');
  }
};
</script>

<template>
    <nav class="navbar navbar-dark px-4">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo_new.png" alt="Turing Trust Logo" height="30">
      </a>
      <a class="logout" href="#"><i class="bi bi-box-arrow-left"></i> Log out</a>
    </nav>

    <div class="container">
      <h4 class="section-title">Select a mode</h4>
      <p style="color: #075976;">Begin palleting or by selecting a mode below.</p>

      <div class="row">
        <div class="col-md-2">
          <h5 class="section-title">Palleting</h5>
        </div>
        <div class="col-md-2">
          <div class="card">
            <img src="../assets/work-in-progress.png" alt="Work in Progress" width="50" class="d-block mx-auto">
            <br/><p>Work in progress palleting</p>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>
        <div class="col-md-2">
          <div class="card">
            <img src="../assets/shipping-box.png" alt="Shipping Box" width="50" class="d-block mx-auto">
            <br/><p>Shipping box palleting</p>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-2">
          <h5 class="section-title">Boxing</h5>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/desktop.png" alt="Wiped Desktops" width="50" class="d-block mx-auto">
            <br/><p>Boxing (Wiped) Desktops for shipping</p>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/desktop-imaged.png" alt="Imaged Desktops" width="50" class="d-block mx-auto">
            <br/><p>Boxing (Imaged) Desktops for shipping</p>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/laptop.png" alt="Wiped Laptops" width="50" class="d-block mx-auto">
            <br/>
            <p>Boxing (Wiped) Laptops for shipping</p>
            <br/>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/laptop-imaged.png" alt="Imaged Laptops" width="50" class="d-block mx-auto">
            <br/><p>Boxing (Imaged) Laptops for shipping</p><br/>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>
      </div>

      <div class="row mt-4 mb-5">
        <div class="col-md-2"></div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/monitor.png" alt="Monitors" width="50" class="d-block mx-auto">
            <br/><p>Boxing monitors for shipping</p><br/>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/phone.png" alt="Phones and Laptops" width="50" class="d-block mx-auto">
            <br/><p>Boxing (Wiped) phones and laptops for shipping</p>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card">
            <img src="../assets/money.png" alt="For Sale" width="50" class="d-block mx-auto">
            <br/><p>Boxing Desktops and Laptops for sale</p><br/>
            <button class="btn btn-outline-success w-100">Start →</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.navbar {
  background-color: #0b4c62;
}
.navbar-brand {
  color: white;
  font-weight: bold;
}
.logout {
  color: white;
  text-decoration: none;
}
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
</style>