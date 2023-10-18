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
                      <q-input
                          filled
                          v-model="form.category_type"
                          label="Tipo da Categoria"
                          lazy-rules
                          :rules="[
                              (val) => (val !== null && val !== '') || 'Por favor, digite algo',
                          ]"
                      />
                  </div>
              </div>
              <div class="row">
                  <div class="col-xs-12 col-md-7">
                    <span>Cor da Categoria</span>
                      <q-input
                          borderless
                          v-model="form.category_color"
                          type="color"
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
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'createCategory',
  setup() {
      const form = ref({
          category_name: '',
          category_type: '',
          category_color: '#ff0000',
      });
      const { notifyError, notifySuccess } = useNotify();

      const handleOnSubmit = async () => {
          console.log('Will Submit: ', form.value);

          await api
              .post(`/category/create`, form.value)
              .then((res) => {
                  notifySuccess(`Conta ${res.data.data.alias} criada com sucesso!`);
                  console.log(res);
              })
              .catch((err) => {
                  notifyError(`Erro ao criar conta: ${err}`);
                  throw new Error(err);
              })
              .finally(() => {
                  console.log('Request finished');
              });
      };

      const handleOnReset = () => {
          form.value.category_name = '';
          form.value.category_type = '';
          form.value.category_color = 'Conta Corrente';

          console.log('Form was reset');
      };

      return {
          form,

          handleOnSubmit,
          handleOnReset,
      };
  },
});
</script>
