<template>
    <q-page padding>
        <div class="row q-px-lg">
            <h5>criar uma conta</h5>
        </div>
        <div class="q-px-md">
            <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-md">
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            borderless
                            class="nph-in input"
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
                            borderless
                            class="nph-in input"
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
                            borderless
                            class="nph-out input"
                            behavior="menu"
                            v-model="form.type"
                            :options="types_options"
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
                            borderless
                            class="nph-in input"
                            type="number"
                            placeholder="0.00"
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
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            borderless
                            class="nph-in input"
                            v-model="form.color"
                            :style="`border: 2px solid ${form.color};`"
                        >
                            <template v-slot:append>
                                <q-icon name="colorize" class="cursor-pointer">
                                    <q-popup-proxy
                                        cover
                                        transition-show="scale"
                                        transition-hide="scale"
                                    >
                                        <q-color v-model="form.color" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-toggle v-model="form.credit_card" label="Possui crédito?" />
                    </div>
                </div>

                <template v-if="form.credit_card">
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <q-input
                                borderless
                                class="nph-in input"
                                placeholder="0.00"
                                type="number"
                                v-model="form.credit_limit"
                                label="Crédito total liberado"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <q-input
                                borderless
                                class="nph-in input"
                                placeholder="0.00"
                                type="number"
                                v-model="form.credit_used"
                                label="Crédito utilizado"
                            />
                        </div>
                    </div>
                </template>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-btn label="criar conta" type="submit" class="button full-width" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-btn label="zerar" type="reset" flat class="button-invisible full-width" />
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
        const types_options = ['Conta Corrente', 'Conta Poupança'];
        const form = ref({
            user_id: '',
            alias: '',
            bank: '',
            type: 'Conta Corrente',
            color: '#333333',
            balance: null,
            credit_card: false,
            credit_limit: null,
            credit_used: null,
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
            form.value.type = 'Conta Corrente';
            (form.value.color = ''), (form.value.balance = null);
            form.value.credit_card = false;
            form.value.credit_limit = null;
            form.value.credit_used = null;
        };

        return {
            form,
            types_options,
            handleOnSubmit,
            handleOnReset,
        };
    },
});
</script>
