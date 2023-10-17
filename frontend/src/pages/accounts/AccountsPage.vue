<template>
    <q-page padding>
        <div class="row">
            <h3>Contas</h3>
        </div>
        <div class="row">
            <p>Ainda não estou fazendo associação do usuário com a informação abaixo!</p>
        </div>

        <div class="row">
            <h4>Criar uma conta</h4>
        </div>
        <div class="row q-pl-xl">
            <div class="q-pa-md" style="max-width: 400px">
                <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-md">
                    <q-input
                        filled
                        v-model="form.alias"
                        label="Apelido da Conta"
                        hint="Não precisa ser o nome do banco"
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || 'Por favor, digite algo']"
                    />

                    <q-input
                        filled
                        v-model="form.bank"
                        label="Nome do banco"
                        lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Por favor, digite algo']"
                    />

                    <q-select
                        filled
                        behavior="menu"
                        v-model="form.account_type"
                        :options="account_types_options"
                    />

                    <q-toggle v-model="form.has_credit_card" label="Possui crédito?" />

                    <template v-if="form.has_credit_card">
                        <q-input
                            filled
                            v-model="form.credit_used"
                            label="Valor do crédito utilizado"
                        >
                        </q-input>
                    </template>

                    <div>
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'AccountsPage',
    setup() {
        const account_types_options = ['Conta Corrente', 'Conta Poupança'];
        const form = ref({
            alias: '',
            bank: '',
            account_type: 'Conta Corrente',
            balance: 0,
            has_credit_card: false,
            credit_used: 0,
        });

        const handleOnSubmit = () => {
            console.log('Submitted');
        };

        const handleOnReset = () => {
            form.value.alias = '';
            form.value.bank = '';
            form.value.account_type = 'Conta Corrente';
            form.value.balance = 0;
            form.value.has_credit_card = false;
            form.value.credit_used = '';
            console.log('Form was reset');
        };

        return {
            form,
            account_types_options,
            handleOnSubmit,
            handleOnReset,
        };
    },
});
</script>
