<template>
    <q-card padding>
        <q-card-section horizontal class="justify-between q-px-md">
            <q-card-section class="flex column justify-between">
                <!-- TODO: formatar data -->
                <p class="text-positive">{{ transaction_date }}</p>
                <p>{{ description }}</p>
                <p v-if="transactionAccount">{{ transactionAccount?.alias }}</p>
            </q-card-section>
            <q-card-section>
                <span class="text-caption">{{ payment_method }}</span>
                <h3
                    :class="
                        transactionCategory?.category_type === 'Receita'
                            ? 'text-positive'
                            : 'text-negative'
                    "
                    class="text-bold"
                >
                    {{ value }}
                </h3>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

export default defineComponent({
    name: 'CardAccount',
    props: {
        transaction: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { value, description, transaction_date, category, account, payment_method } =
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
            transaction_date,
            category,
            transactionAccount,
            transactionCategory,
            payment_method,
        };
    },
});
</script>
