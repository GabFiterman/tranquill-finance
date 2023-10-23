<template>
    <q-page padding>
        <div class="row">
            <h3>Criar uma conta</h3>
        </div>
        <div class="q-px-md">
            <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-sm">
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            filled
                            v-model="form.alias"
                            label="Apelido da Conta"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Por favor, digite algo']"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            filled
                            v-model="form.bank"
                            label="Nome do banco"
                            lazy-rules
                            :rules="[
                                (val) => (val !== null && val !== '') || 'Por favor, digite algo',
                            ]"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-select
                            filled
                            behavior="menu"
                            v-model="form.account_type"
                            :options="account_types_options"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    'Por favor, selecione um tipo de conta',
                            ]"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-input
                            filled
                            type="number"
                            v-model="form.balance"
                            label="Saldo Inicial"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    'Por favor, selecione seu saldo',
                            ]"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-toggle v-model="form.has_credit_card" label="Possui crédito?" />
                    </div>
                </div>

                <template v-if="form.has_credit_card">
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <q-input
                                filled
                                type="number"
                                v-model="form.total_credit_limit"
                                label="Crédito total liberado"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <q-input
                                filled
                                type="number"
                                v-model="form.credit_used"
                                label="Crédito utilizado"
                            />
                        </div>
                    </div>
                </template>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import useNotify from 'src/composables/UseNotify';
import { userStore } from 'src/stores/userStore';

export default defineComponent({
    name: 'CreateAccount',
    setup() {
        const account_types_options = ['Conta Corrente', 'Conta Poupança'];
        const form = ref({
            user_id: '',
            alias: '',
            bank: '',
            account_type: 'Conta Corrente',
            balance: 0,
            has_credit_card: false,
            total_credit_limit: 0,
            credit_used: 0,
        });
        const { notifyError, notifySuccess } = useNotify();
        const USER = userStore();

        const handleOnSubmit = async () => {
            form.value.user_id = USER.getUserId;

            await api
                .post(`/account/create`, form.value)
                .then((res) => {
                    notifySuccess(`Conta ${res.data.data.alias} criada com sucesso!`);
                })
                .catch((err) => {
                    notifyError(`Erro ao criar conta: ${err}`);
                    throw new Error(err);
                });
        };

        const handleOnReset = () => {
            form.value.alias = '';
            form.value.bank = '';
            form.value.account_type = 'Conta Corrente';
            form.value.balance = 0;
            form.value.has_credit_card = false;
            form.value.total_credit_limit = '';
            form.value.credit_used = '';
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
