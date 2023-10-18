<template>
    <q-page class="flex flex-center">
        <div v-if="user">
            <div>Hello</div>
            <template v-if="allAccounts">
                <div class="q-pa-md">
                    <q-carousel animated v-model="slide" arrows navigation infinite>
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
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import CardAccount from 'src/components/CardAccount.vue';
import { api } from 'src/boot/axios';

export default defineComponent({
    name: 'PageMe',
    components: {
        CardAccount,
    },
    setup() {
        const { user } = useAuthUser();
        const allAccounts = ref([]);

        onMounted(() => {
            getAccounts();
        });

        const getAccounts = async () => {
            await api
                .get('/account/get-all')
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
