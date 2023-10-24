<template>
    <q-page padding>
        <div class="row">
            <h3>Criar uma categoria</h3>
        </div>
        <div class="q-px-md">
            <q-form @submit.prevent="handleOnSubmit" @reset="handleOnReset" class="q-gutter-sm">
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <q-input
                            filled
                            v-model="form.category_name"
                            label="Nome da Categoria"
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
                            v-model="form.category_type"
                            :options="category_types_options"
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val !== null && val !== '') ||
                                    'Por favor, selecione um tipo de categoria',
                            ]"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-md-7">
                        <span>Cor da Categoria</span>
                        <q-input borderless v-model="form.category_color" type="color" />
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
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import useNotify from 'src/composables/UseNotify';
import { userStore } from 'src/stores/userStore';

export default defineComponent({
    name: 'createCategory',
    setup() {
        const form = ref({
            user_id: '',
            category_name: '',
            category_type: 'Despesa',
            category_color: '#ff0000',
        });
        const { notifyError, notifySuccess } = useNotify();
        const category_types_options = ['Despesa', 'Receita'];
        const USER = userStore();

        const handleOnSubmit = async () => {
            form.value.user_id = USER.getUserId;
            await api
                .post(`/category/create`, form.value)
                .then((res) => {
                    notifySuccess(`${res.data.data.category_type} criada com sucesso!`);
                })
                .catch((err) => {
                    notifyError(`Erro ao criar conta: ${err}`);
                    throw new Error(err);
                });
        };

        const handleOnReset = () => {
            form.value.category_name = '';
            form.value.category_type = 'Despesa';
            form.value.category_color = '#ff0000';
        };

        return {
            form,
            category_types_options,

            handleOnSubmit,
            handleOnReset,
        };
    },
});
</script>
