<template>
    <q-page padding>
        <template v-if="user && allAccounts">
            <div class="row justify-center">
                <q-carousel
                    animated
                    v-model="slide"
                    class="col-12 col-md-4"
                    arrows
                    navigation
                    infinite
                >
                    <q-carousel-slide
                        v-for="(account, index) in allAccounts"
                        :key="account.id"
                        :name="index"
                    >
                        <CardAccount :account="account" />
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </template>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import CardAccount from 'src/components/CardAccount.vue';
import { api } from 'src/boot/axios';
import { userStore } from 'src/stores/userStore';

export default defineComponent({
    name: 'PageMe',
    components: {
        CardAccount,
    },
    setup() {
        const { user } = useAuthUser();
        const allAccounts = ref([]);
        const USER = userStore();

        onMounted(() => {
            USER.setUserId(user.value.id);
            USER.setUserEmail(user.value.email);
            USER.setUserRole(user.value.role);
            if (USER.getUserRole) {
                getAccounts();
            }
        });

        const getAccounts = async () => {
            await api
                .get(`/account/user/${USER.getUserId}`)
                .then((response) => {
                    allAccounts.value = response.data.data;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };

        return {
            user,
            allAccounts,
            slide: ref(1),
        };
    },
});
</script>
