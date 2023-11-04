<template>
    <q-page padding>
        <q-form
            class="row justify-center items-center"
            style="height: 60vh"
            @submit.prevent="handleLogin"
        >
            <p class="col-12 text-subtitle1 text-center color-text">
                olá, seja bem vinda a sua nova jornada financeira
            </p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input
                    placeholder="email"
                    v-model="form.email"
                    borderless
                    class="nph-in input"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Email is required']"
                    type="email"
                />

                <q-input
                    placeholder="senha"
                    type="password"
                    v-model="form.password"
                    borderless
                    class="nph-in input"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Password is required']"
                />

                <div class="full-width q-pt-sm">
                    <q-btn label="login" class="full-width button nph-out" type="submit" />
                </div>
                <div class="full-width q-gutter-y-sm">
                    <q-btn
                        label="não tenho uma conta"
                        class="full-width button-invisible"
                        flat
                        :to="{ name: 'register-user' }"
                    />
                    <q-btn
                        label="esqueci minha senha"
                        class="full-width button-invisible"
                        flat
                        :to="{ name: 'forgot-password' }"
                    />
                </div>
            </div>
        </q-form>
        <div class="row justify-center q-pt-xl">
            <q-btn class="button nph-out">
                <!-- TODO: Substituir imagem por SVG -->
                <img src="/google-icon.png" alt="login com google" />
            </q-btn>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/useAuthUser';
import useNotify from 'src/composables/UseNotify';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    name: 'LoginUser',

    setup() {
        const router = useRouter();
        const route = useRoute();

        const { login, isLoggedIn } = useAuthUser();

        const { notifyError, notifySuccess } = useNotify();

        const form = ref({
            email: '',
            password: '',
        });

        onMounted(() => {
            // NOTE: Routing Treatment
            if (route.query.confirmedEmail == 'true') {
                notifySuccess('Email confirmado com sucesso!');
            }
            if (route.query.blockedRoute == 'true') {
                notifyError('Você não devia estar aqui! Por favor, efetue login antes!');
            }
        });

        const handleLogin = async () => {
            try {
                await login(form.value);
                notifySuccess('Login successfully!');
                router.push({ name: 'me' });
            } catch (error) {
                notifyError(error.message);
            }
        };

        return {
            form,
            handleLogin,
        };
    },
});
</script>
