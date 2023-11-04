<template>
    <q-layout view="lHh Lpr lFf" class="main-background">
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header> menu </q-item-label>

                <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

                <div class="row" style="position: absolute; bottom: 2.5vh">
                    <q-item clickable v-close-popup @click="handleLogout">
                        <q-item-section>
                            <q-item-label>logout</q-item-label>
                        </q-item-section>
                    </q-item>
                </div>
            </q-list>
        </q-drawer>

        <q-page-container>
            <q-button class="nph-out control-button" @click="toggleLeftDrawer">
                <img
                    src="Icon_up.svg"
                    alt="menu"
                    width="35"
                    height="35"
                    style="margin-bottom: -0.75em"
                />
            </q-button>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
    {
        title: 'home',
        caption: '',
        icon: 'mdi-home',
        routeName: 'me',
    },
    {
        title: 'contas',
        caption: '',
        icon: 'mdi-wallet',
        routeName: 'createAccount',
    },
    {
        title: 'categorias',
        caption: '',
        icon: 'mdi-star-settings',
        routeName: 'createCategory',
    },
    {
        title: 'transações',
        caption: 'criar',
        icon: 'mdi-cash-multiple',
        routeName: 'createTransaction',
    },
    {
        title: 'transações',
        caption: 'histórico',
        icon: 'mdi-history',
        routeName: 'historyTransaction',
    },
];

import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/useAuthUser';
import useApi from 'src/composables/UseApi';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'MainLayout',

    components: {
        EssentialLink,
    },

    setup() {
        const leftDrawerOpen = ref(false);

        const $q = useQuasar();

        const router = useRouter();

        const { logout } = useAuthUser();

        const handleLogout = async () => {
            $q.dialog({
                title: 'logout',
                message: 'deseja realmente sair ?',
                cancel: true,
                persistent: true,
            }).onOk(async () => {
                await logout();
                router.replace({ name: 'login-user' });
            });
        };

        return {
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            handleLogout,
        };
    },
});
</script>

<style lang="scss" scoped>
.control-button {
    border-radius: 33%;
    min-height: 15vh;
    position: sticky;
    top: 80vh;
    left: 75vw;
    padding: 1.5em 1em;
    z-index: 9999;
}
</style>
