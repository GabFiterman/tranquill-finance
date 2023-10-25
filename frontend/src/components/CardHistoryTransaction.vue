<template>
    <q-card padding>
        <q-card-section horizontal class="justify-between q-px-md">
            <q-card-section class="flex column justify-between">
                <p class="text-positive">{{ transaction_date }}</p>
                <p>{{ description }}</p>
                <p>{{ account }}</p>
            </q-card-section>
            <q-card-section>
                <h3>
                    <span class="text-caption">{{ payment_method }}</span>
                    {{ value }}
                </h3>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';

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

        return {
            value,
            description,
            transaction_date,
            category,
            account,
            payment_method,
        };
    },
});
</script>
