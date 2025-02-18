<template>
  <div>
    <AppNavbar />
    <main>
      <router-view></router-view> <!-- This will be replaced by page content -->
    </main>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "DefaultLayout",
  components: {
    AppNavbar,
  },
};
</script>