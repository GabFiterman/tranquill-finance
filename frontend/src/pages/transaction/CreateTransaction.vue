<template>
    <q-page padding>
        <div class="row">
            <h3>Criar uma transação</h3>
        </div>
        <div class="q-px-md">
            <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-sm">
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            filled
                            v-model="form.value"
                            label="Valor da transação"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Por favor, digite algo']"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            filled
                            v-model="form.description"
                            label="Descrição"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Por favor, digite algo']"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-select
                            filled
                            behavior="menu"
                            v-model="form.category"
                            :options="allCategories"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    'Por favor, selecione uma categoria',
                            ]"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-select
                            filled
                            behavior="menu"
                            v-model="form.account"
                            :options="allAccounts"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    'Por favor, selecione uma conta',
                            ]"
                        />
                    </div>
                </div>

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
import { defineComponent, ref, onMounted, computed } from 'vue';
import { api } from 'boot/axios';
import useNotify from 'src/composables/UseNotify';
import { userStore } from 'src/stores/userStore';

export default defineComponent({
    name: 'CreateTransaction',
    setup() {
        const form = ref({
            user_id: '',
            value: 0,
            description: '',
            //TODO: incialmente sempre hoje
            date_completed: new Date().toISOString(),
            date_expected: new Date().toISOString(),
            //TODO: preciso puxar as categorias primeiro
            category: '',
            //TODO: preciso puxar as contas primeiro
            account: '',
            //TODO: preciso validar se a conta possui crédito primeiro
            payment_method: 'Debit',
        });

        const allCategories = ref([]);
        const allAccounts = ref([]);

        // NOTE: computed runs before onMounted hook
        const USER = computed(() => userStore());

        const { notifyError, notifySuccess } = useNotify();

        onMounted(() => {
            getCategories();
            getAccounts();
        });

        const getCategories = async () => {
            await api
                .get(`/category/user/${USER.value.getUserId}`)
                .then((res) => {
                    allCategories.value = res.data.data.map((category) => {
                        return {
                            label: category.name,
                            value: category._id,
                            type: category.type,
                        };
                    });
                    if (allCategories.value.length < 1) {
                        notifyError(
                            'Você precisa criar uma categoria antes de criar uma transação!',
                        );
                    }
                    return res.data.data;
                })
                .catch((err) => {
                    notifyError(`Erro ao buscar categorias: ${err}`);
                    throw new Error(err);
                });
        };

        const getAccounts = async () => {
            await api
                .get(`/account/user/${USER.value.getUserId}`)
                .then((res) => {
                    allAccounts.value = res.data.data.map((account) => {
                        return {
                            label: account.alias,
                            value: account._id,
                            bank: account.bank,
                            credit_card: account.credit_card,
                        };
                    });
                    if (allAccounts.value.length < 1) {
                        notifyError('Você precisa criar uma conta antes de criar uma transação!');
                    }
                    return res.data.data;
                })
                .catch((err) => {
                    notifyError(`Erro ao buscar categorias: ${err}`);
                    throw new Error(err);
                });
        };

        const handleOnSubmit = async () => {
            form.value.user_id = USER.value.getUserId;
            const send = Object.assign({}, form.value, {
                category: form.value.category.value,
                account: form.value.account.value,
            });

            await api
                .post(`/transaction/create`, send)
                .then((res) => {
                    notifySuccess(`${res.data.data.type} criada com sucesso!`);
                })
                .catch((err) => {
                    notifyError(`Erro ao criar conta: ${err}`);
                    throw new Error(err);
                });
        };

        // const updateAccount = async () => {
        //   const send = {
        //     _id: form.value._id,
        //     balance: balance + form.value.
        //   }
        //   await api
        //     .put(`/account/update`, send)
        //     .then((res) => {
        //       notifySuccess('Conta UPDATED com sucesso!')
        //     })
        //     .catch((err) => {
        //       notifyError(`Erro ao UPDATE conta: ${err}`)
        //       throw new Error(err);
        //     })
        // }

        const handleOnReset = () => {
            form.value.value = 0;
            form.value.description = '';
            form.value.category = '';
            form.value.account = '';
            form.value.payment_method = 'Debit';
        };

        return {
            form,
            allCategories,
            allAccounts,

            handleOnSubmit,
            handleOnReset,
        };
    },
});
</script>
