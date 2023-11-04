<template>
    <q-page padding class="text-center q-mt-xl" style="height: 60vh">
        <p class="text-body2 opacity-75">obrigado por se registrar</p>
        <p class="text-body1">falta pouco...</p>
        <div class="row q-mt-xl q-mb-md">
            <p class="text-body1 q-mt-xl">
                por favor confirme seu email para completar seu cadastro: <br /><br />
                <strong>{{ $route.query.email }}</strong>
            </p>
        </div>
        <div class="row justify-center">
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-btn
                    label="voltar ao login"
                    class="full-width button nph-out"
                    :to="{ name: 'login-user' }"
                />
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EmailConfirmation',
});
</script>
