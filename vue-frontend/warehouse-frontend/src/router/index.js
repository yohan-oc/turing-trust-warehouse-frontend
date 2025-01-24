import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";

const routes = [
    { path: "/", component: LoginPage }, // Default page is login
    { path: "/home", component: HomePage } // After login, go Home
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;