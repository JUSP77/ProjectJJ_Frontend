import {createWebHistory, createRouter} from "vue-router";
import Home from "@/views/Home";
import Result from "@/views/Result";
import Game from "@/views/Game";
import RegisterForm from "@/views/registerForm"
import upload from "@/views/Upload";
import test from "@/views/Test";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/game",
        name: "Game",
        component: Game,
    },

    {
        path: "/result",
        name: "Result",
        component: Result,
    },
    {
        path: "/registerForm",
        name: "RegisterForm",
        component: RegisterForm,
    },
    {
        path: "/upload",
        name: "Upload",
        component: upload
    },
    {
        path: "/test",
        name: "Test",
        component: test
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;