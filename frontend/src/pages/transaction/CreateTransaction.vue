<template>
    <q-page padding>
        <div class="row q-px-lg">
            <h5>criar uma transação</h5>
        </div>
        <div class="q-px-md">
            <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-md">
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <!-- TODO: atualmente só aceita inteiros, precisa começar a aceitar floats! -->
                        <q-input
                            borderless
                            class="nph-in input"
                            v-model="form.value"
                            type="number"
                            label="Valor da transação"
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
                            v-model="form.description"
                            label="Descrição"
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Por favor, digite algo']"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-6 col-md-7 text-center">
                        <p class="text-subtitle2 color-stinks" style="margin-bottom: -.25em">despesa</p>
                        <q-radio v-model="form.type" type="radio" val="despesa" />
                    </div>
                    <div class="col-xs-6 col-md-7 text-center">
                        <p class="text-subtitle2 color-stonks" style="margin-bottom: -.25em">receita</p>
                        <q-radio v-model="form.type" type="radio" val="receita" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-select
                            borderless
                            class="nph-out input"
                            v-model="form.category"
                            :options="filteredCategories"
                            :style="`border: 2px solid ${form.category.color};`"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    val !== null ||
                                    val !== '' ||
                                    val !== 'selecione uma categoria' ||
                                    'Por favor, selecione uma categoria',
                            ]"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-select
                            borderless
                            class="nph-out input"
                            v-model="form.account"
                            :options="allAccounts"
                            :style="`border: 2px solid ${form.account.color};`"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    val !== 'selecione uma conta' ||
                                    'Por favor, selecione uma conta',
                            ]"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-btn
                            :label="`criar ${form.type}`"
                            type="submit"
                            class="button full-width"
                            :style="`border: 3px solid ${buttonColor};`"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-7">
                        <q-btn
                            label="zerar"
                            type="reset"
                            flat
                            class="button-invisible full-width"
                        />
                    </div>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { api } from 'boot/axios';
import useNotify from 'src/composables/UseNotify';
import { userStore } from 'src/stores/userStore';

export default defineComponent({
    name: 'CreateTransaction',
    setup() {
        const form = ref({
            user_id: '',
            value: null,
            description: '',
            type: 'despesa',
            //TODO: incialmente sempre hoje
            date_completed: new Date().toISOString(),
            date_expected: new Date().toISOString(),
            category: 'selecione uma categoria',
            account: 'selecione uma conta',
            //TODO: preciso validar se a conta possui crédito primeiro
            payment_method: 'debito',
        });

        const allCategories = ref([]);
        const allAccounts = ref([]);
        // NOTE: computed runs before onMounted hook
        const USER = computed(() => userStore());
        const buttonColor = computed(() => {
            return form.value.type === 'despesa' ? '#e7b7b7' : '#bfd8c4';
        });

        watch(
            () => form.value.type,
            () => {
                form.value.category = 'selecione uma categoria';
            },
        );

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
                            color: category.color,
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

        const filteredCategories = computed(() =>
            allCategories.value.filter((category) => {
                return category.type === form.value.type;
            }),
        );

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
                            balance: account.balance,
                            color: account.color,
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
                value: parseFloat(form.value.value),
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

        const handleOnReset = () => {
            form.value.value = null;
            form.value.description = '';
            form.value.type = 'despesa';
            form.value.category = 'selecione uma categoria';
            form.value.account = 'selecione uma conta';
            form.value.payment_method = 'debito';
        };

        return {
            form,
            filteredCategories,
            allCategories,
            allAccounts,
            buttonColor,

            handleOnSubmit,
            handleOnReset,
        };
    },
});
</script>

<style lang="scss" scoped>
.radioStinks {

}

.radioStonks {
  border-radius: 50%;
  background-color: red;
}
.radioStonks:checked  {
  background-color: blue;
}
</style>
