import { defineStore } from "pinia";
import { ref } from 'vue';

export const useUserStore = defineStore(
    "user",
    () => {

        const token = ref(localStorage.getItem("token"));

        const userInfo = ref(null);

        function setToken(value) {
            token.value = value;
            localStorage.setItem("token", value);
        }

        function setUserInfo(value) {          
            userInfo.value = value;
        }

        function logout() {
            token.value = "";
            userInfo.value = null;
            localStorage.removeItem("token");
        }

        return {
            token, userInfo, setToken, logout, setUserInfo
        };
    }
)
