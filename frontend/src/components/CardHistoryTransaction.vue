<template>
    <q-card padding class="card-history nph-out">
        <q-card-section
            horizontal
            v-if="transactionAccount"
            class="justify-between q-px-md"
            :style="`border: 2px solid ${transactionAccount.color}`"
        >
            <q-card-section class="flex column justify-between">
                <p class="text-bold color-text">{{ formatedDate }}</p>
                <p class="color-text">{{ description }}</p>
                <p>
                    <span class="text-subtitle1">{{ transactionCategory?.name }}</span>
                    <br />
                    <span class="text-caption" :style="`color: ${transactionAccount.color}`">{{
                        transactionAccount?.alias
                    }}</span>
                </p>
            </q-card-section>
            <q-card-section>
                <p class="text-caption text-right">{{ payment_method }}</p>
                <h3
                    :class="
                        transactionCategory?.type === 'receita' ? 'color-stonks' : 'color-stinks'
                    "
                    class="text-bold"
                >
                    {{ transactionCategory?.type === 'receita' ? '+' : '-' }}
                    {{ value }}
                </h3>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'CardAccount',
    props: {
        transaction: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { value, description, date_completed, category, account, payment_method } =
            props.transaction;
        const transactionAccount = ref(null);
        const transactionCategory = ref(null);

        onMounted(() => {
            getAccount();
            getCategory();
        });

        const getAccount = async () => {
            await api
                .get(`/account/${account}`)
                .then((response) => {
                    transactionAccount.value = response.data.data[0];
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };

        const getCategory = async () => {
            await api
                .get(`/category/${category}`)
                .then((response) => {
                    transactionCategory.value = response.data.data[0];
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };

        return {
            value,
            description,
            date_completed,
            category,
            transactionAccount,
            transactionCategory,
            payment_method,
            formatedDate: dayjs(date_completed).format('DD-MM-YYYY'),
        };
    },
});
</script>

<style lang="scss" scoped>
.card-history {
    border-radius: 2em;
    background: $color_cold;
}
</style>
