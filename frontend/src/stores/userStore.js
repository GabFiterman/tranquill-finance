import { defineStore } from 'pinia';

export const userStore = defineStore('userStore', {
    state: () => ({
        userId: null,
        userEmail: null,
        userRole: null,
    }),
    getters: {
        getUserId() {
            return this.userId;
        },
        getUserEmail() {
            return this.userEmail;
        },
        getUserRole() {
            return this.userRole;
        },
    },
    actions: {
        setUserId(id) {
            this.userId = id;
        },
        setUserEmail(email) {
            this.userEmail = email;
        },
        setUserRole(role) {
            this.userRole = role;
        },
    },
});
