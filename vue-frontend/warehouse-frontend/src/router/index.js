import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import ModePage from "../views/ModePage.vue";

const routes = [
    { path: "/", component: LoginPage }, // Default page is login
    { path: "/mode", component: ModePage }, // After login, go Home
    { path: "/home", component: HomePage } // After login, go Home
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;