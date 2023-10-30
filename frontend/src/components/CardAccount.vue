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

                <p class="text-positive">15 de out</p>
                <p class="text-negative">06 de out</p>
            </q-card-section>

            <q-card-section>
                <h5 class="text-positive">+ 5.520</h5>
                <h5 class="text-negative">- 875</h5>
                <h5 class="text-dark">= 1.225</h5>
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
        const { alias, bank, type, balance } = props.account;

        return {
            alias,
            bank,
            type,
            balance,
        };
    },
});
</script>
