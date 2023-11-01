<template>
    <q-card padding>
        <q-card-section horizontal class="justify-between q-px-md">
            <h5>{{ alias }}</h5>

            <h6>Débito</h6>
        </q-card-section>

        <q-card-section horizontal class="justify-between">
            <q-card-section>
                <h4 class="text-h4" style="margin-top: 0.75em">
                    <label class="text-subtitle2">Saldo atual</label><br />
                    {{ balance }}
                </h4>

                <p class="text-positive">next recive date</p>
                <p class="text-negative">next payment date</p>
            </q-card-section>

            <q-card-section>
                <h5 class="text-positive">+ {{ totals.totalRevenue }}</h5>
                <h5 class="text-negative">- {{ totals.totalExpense }}</h5>
                <h5 class="text-dark">= {{ totals.total }}</h5>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

export default defineComponent({
    name: 'CardAccount',
    props: {
        account: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { _id, alias, bank, type, balance } = props.account;
        const totals = ref({});

        onMounted(() => {
            getTotals();
        });

        const getTotals = async () => {
            await api
                .get(`/account/${_id}/totals`)
                .then((response) => {
                    totals.value = response.data;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };

        return {
            alias,
            bank,
            type,
            balance,
            totals,
        };
    },
});
</script>
