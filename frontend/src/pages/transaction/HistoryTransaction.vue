<template>
    <q-page padding>
        <div class="row q-px-lg">
            <h5>histórico de transações</h5>
        </div>
        <div v-if="allTransactions">
            <div
                v-for="(transaction, index) in allTransactions"
                :key="transaction.id"
                :name="index"
                class="q-my-md"
            >
                <CardHistoryTransaction :transaction="transaction" />
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import CardHistoryTransaction from 'src/components/CardHistoryTransaction.vue';
import { userStore } from 'src/stores/userStore';
import { api } from 'src/boot/axios';

export default defineComponent({
    name: 'HistoryTransaction',
    components: {
        CardHistoryTransaction,
    },
    setup() {
        const USER = computed(() => userStore());
        const allTransactions = ref([]);

        onMounted(() => {
            if (USER.value.getUserId) {
                getTransactions();
            }
        });

        const getTransactions = async () => {
            await api
                .get(`/transaction/user/${USER.value.getUserId}`)
                .then((response) => {
                    allTransactions.value = response.data.data;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };

        return {
            allTransactions,
        };
    },
});
</script>
