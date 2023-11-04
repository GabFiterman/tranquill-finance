<template>
    <q-page padding>
        <q-form
            class="row justify-center items-center"
            style="height: 60vh"
            @submit.prevent="handleRegister"
        >
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input
                    placeholder="email"
                    v-model="form.email"
                    borderless
                    class="nph-in input"
                    lazy-rules
                    :rules="[
                        (val) => (val && val.length > 0) || 'email é obrigatório',
                        (val) => /.+@.+\..+/.test(val) || 'email não é válido',
                    ]"
                    type="email"
                />

                <q-input
                    placeholder="senha"
                    v-model="form.password"
                    borderless
                    class="nph-in input"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length >= 6) || 'senha deve ter no mínimo 6 caracteres',
                    ]"
                />

                <q-input
                    placeholder="confirmar senha"
                    v-model="form.confirmPassword"
                    borderless
                    class="nph-in input"
                    lazy-rules
                    :rules="[
                        (val) => (val && val === form.password) || 'senhas precisam ser iguais',
                    ]"
                />

                <div class="full-width q-pt-sm q-gutter-y-sm">
                    <q-btn label="cadastre-se" class="full-width button nph-out" type="submit" />

                    <q-btn
                        label="já tenho uma conta"
                        class="full-width button-invisible"
                        flat
                        :to="{ name: 'login-user' }"
                    />
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RegisterUser',

    setup() {
        const router = useRouter();
        const { register } = useAuthUser();
        const { notifyError, notifySuccess } = useNotify();

        const form = ref({
            email: '',
            password: '',
            confirmPassword: '',
        });

        const handleRegister = async () => {
            try {
                await register(form.value);
                notifySuccess('Usuário criado com sucesso!');
                router.push({
                    name: 'email-confirmation',
                    query: { email: form.value.email },
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        return {
            form,
            handleRegister,
        };
    },
});
</script>
