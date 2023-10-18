<template>
    <q-card class="my-card">
        <q-card-section horizontal class="justify-between q-px-md">
            <h5>{{ alias }}</h5>

            <h6>Débito</h6>
        </q-card-section>

        <q-card-section horizontal>
            <q-card-section>
                <p>saldo atual</p>
                <h4>{{ balance }}</h4>

                <p>15 de out</p>
                <p>06 de out</p>
            </q-card-section>

            <q-card-section>
                <h5>+ 5.520</h5>
                <h5>- 875</h5>
                <h5>= 1.225</h5>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardAccount',
    props: {
        account: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { alias, bank, account_type, balance } = props.account;

        return {
            alias,
            bank,
            account_type,
            balance,
        };
    },
});
</script>

<style lang="scss" scoped>
.my-card {
    width: 100%;
    max-width: 350px;
}
</style>
