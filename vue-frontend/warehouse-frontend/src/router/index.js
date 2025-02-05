import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import ModePage from "../views/ModePage.vue";
import ParentPage from "../views/ParentPage.vue";

const routes = [
    { path: "/", component: LoginPage },
    { path: "/mode", component: ModePage },
    { path: "/home", component: HomePage },
    { path: "/parent", component: ParentPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;