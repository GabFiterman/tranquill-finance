<template>
    <q-layout view="lHh Lpr lFf" class="login-background">
        <div class="row justify-center q-py-lg">
            <label class="text-italic text-subtitle1">
                {{ $route.meta.label }}
            </label>
        </div>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'LoginLayout',

    setup() {},
});
</script>
