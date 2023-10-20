<template>
    <q-page padding>
        <!-- <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
            <p class="col-12 text-h5 text-center">Reset Password</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                  <q-input
                      label="New Password"
                      v-model="password"
                      lazy-rules
                      :rules="[(val) => (val && val.length >= 6) || 'Password is required']"
                  />
                <div class="full-width q-pt-md q-gutter-y-sm">
                    <q-btn
                        label="Send New Password"
                        color="primary"
                        class="full-width"
                        outline
                        rounded
                        type="submit"
                    />
                </div>
            </div>
        </q-form> -->
        <h1>Oops...</h1>
        <p>Parece que ainda não tem nada por aqui...</p>
        <p>
            Nossos desenvolvedores estão dando duro para que esta funcionalidade em breve seja
            adicionada :)
        </p>
        <q-btn label="Voltar ao início" color="primary" class="full-width" rounded />
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ResetPassword',
    setup() {
        const { passwordReset } = useAuthUser();
        const { notifyError, notifySuccess } = useNotify();
        const router = useRouter();
        const password = ref('');

        const handlePasswordReset = async () => {
            // console.log(password.value)
            // console.log(value)
            // if(error) notifyError(error.message);
            // if(data) {
            //   notifySuccess('Senha redefinida com sucesso!');
            //   console.log(data)
            //   router.push({ name: 'login' });
            // }
            try {
                await passwordReset(password.value);
                notifySuccess();
            } catch (error) {
                notifyError();
                throw new Error(error.data);
            }
        };

        return {
            password,
            handlePasswordReset,
        };
    },
});
</script>
