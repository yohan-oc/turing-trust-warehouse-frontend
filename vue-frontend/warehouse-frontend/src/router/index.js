import { createRouter, createWebHashHistory } from "vue-router";
import DefaultLayout from "../layout/DefaultLayout.vue";
//import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import ModePage from "../views/ModePage.vue";
import ParentPage from "../views/ParentPage.vue";
import LocationPage from "../views/LocationPage.vue";
import TransactionPage from "../views/TransactionPage.vue";

const routes = [
    // { path: "/", component: LoginPage },
    {
        path: "/",
        component: DefaultLayout,
        children: [
            { path: "", component: ModePage /*, meta: { requiresAuth: true }*/ },
            { path: "home", component: HomePage /*, meta: { requiresAuth: true }*/ },
            { path: "parent", component: ParentPage /*, meta: { requiresAuth: true }*/ },
            { path: "location", component: LocationPage /*, meta: { requiresAuth: true }*/ },
            { path: "transaction", component: TransactionPage /*, meta: { requiresAuth: true }*/ },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next('/');
//     } else {
//         next();
//     }
// });

export default router;