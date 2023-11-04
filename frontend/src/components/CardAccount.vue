<template>
    <q-card padding class="card-account q-px-md nph-out" :style="`border: 2px solid ${color}`">
        <q-card-section
            horizontal
            class="justify-between items-center q-px-md q-mt-md"
            style="height: 2.5em"
        >
            <h6>{{ alias }}</h6>
            <h6 class="opacity-50 text-subtitle2">Débito</h6>
        </q-card-section>

        <q-card-section horizontal class="justify-between items-start" style="margin-top: -2.5em">
            <q-card-section>
                <h4 class="text-h4">
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
        const { _id, alias, bank, type, balance, color } = props.account;
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
            color
        };
    },
});
</script>

<style lang="scss" scoped>
.card-account {
    height: 35vh;
    border-radius: 2em;
    background: $color_cold;
}
</style>
