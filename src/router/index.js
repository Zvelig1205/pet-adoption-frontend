import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PetHall from "../views/PetHall.vue";
import My from "../views/My.vue";
import MyPet from "../views/MyPet.vue";
import PetDetail from "../views/PetDetail.vue";
import MyPetDetail from "../views/MyPetDetail.vue";
import Layout from "../layout/layout.vue";
import NotFound from "../views/NotFound.vue";


const routes = [
    {
        path: "/",
        component: Layout,

        children: [
            {
                path: "/details",
                component: My,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/details/pets",
                component: MyPet,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/pethall",
                component: PetHall
            },
            {
                path: `/pet/:id`,
                component: PetDetail
            },
            {
                path: `/my/pet/:id`,
                component: MyPetDetail,
                meta: {
                    requireAuth: true
                }
            },

        ]

    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {

    const token = localStorage.getItem("token");

    if (to.meta.requireAuth && !token) {
        return "/login";
    }

})

export default router;