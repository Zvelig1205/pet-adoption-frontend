import { createRouter, createWebHistory } from "vue-router";

import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PetHall from "../views/PetHall.vue";
import My from "../views/My.vue";
import MyPet from "../views/MyPet.vue";
import PetDetail from "../views/PetDetail.vue";
import MyPetDetail from "../views/MyPetDetail.vue";


const routes = [
    {
        path: "/",
        component: Main
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
        path: `/details`,
        component: My
    },
    {
        path: `/details/pets`,
        component: MyPet
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
        component: MyPetDetail
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;