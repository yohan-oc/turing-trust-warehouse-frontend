import { createRouter, createWebHashHistory } from "vue-router";
import DefaultLayout from "../layout/DefaultLayout.vue";
//import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import ModePage from "../views/ModePage.vue";
import PackingPage from "../views/PackingPage.vue";
import LocationPage from "../views/LocationPage.vue";
import TransactionPage from "../views/TransactionPage.vue";
import MoveAssetsPage from "../views/MoveAssetsPage.vue";
import PackingCompletePage from "../views/PackingCompletePage.vue";

const routes = [
    // { path: "/", component: LoginPage },
    {
        path: "/",
        component: DefaultLayout,
        children: [
            { path: "", component: HomePage /*, meta: { requiresAuth: true }*/ },
            { path: "mode", component: ModePage /*, meta: { requiresAuth: true }*/ },
            { path: "packing", component: PackingPage /*, meta: { requiresAuth: true }*/ },
            { path: "transaction", component: TransactionPage /*, meta: { requiresAuth: true }*/ },
            { path: "location", component: LocationPage /*, meta: { requiresAuth: true }*/ },
            { path: "move-assets", component: MoveAssetsPage /*, meta: { requiresAuth: true }*/ },
            { path: "packing-complete", component: PackingCompletePage /*, meta: { requiresAuth: true }*/ }
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = sessionStorage.getItem('isAuthenticated');
//
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next('/');
//     } else {
//         next();
//     }
// });

export default router;