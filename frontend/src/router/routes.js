const routes = [
    {
        path: '',
        component: () => import('layouts/LoginLayout.vue'),
        children: [
            { path: '', redirect: 'login' },
            {
                path: 'login',
                name: 'login-user',
                component: () => import('pages/user/LoginUser.vue'),
                meta: {
                    label: 'login',
                },
            },
            {
                path: 'register',
                name: 'register-user',
                component: () => import('pages/user/RegisterUser.vue'),
                meta: {
                    label: 'registre-se',
                },
            },
            {
                path: 'email-confirmation',
                name: 'email-confirmation',
                component: () => import('pages/user/EmailConfirmation.vue'),
                meta: {
                    label: 'confirme seu email',
                },
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component: () => import('pages/user/ForgotPassword.vue'),
                meta: {
                    label: 'esqueci minha senha',
                },
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('pages/user/ResetPassword.vue'),
                meta: {
                    label: 'redefina minha senha',
                },
            },
        ],
    },
    {
        path: '/me',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'me', component: () => import('pages/Me.vue') },
            {
                path: 'accounts/create',
                name: 'createAccount',
                component: () => import('pages/accounts/CreateAccount.vue'),
            },
            {
                path: 'category/create',
                name: 'createCategory',
                component: () => import('pages/category/CreateCategory.vue'),
            },
            {
                path: 'transaction/create',
                name: 'createTransaction',
                component: () => import('pages/transaction/CreateTransaction.vue'),
            },
            {
                path: 'transaction/history',
                name: 'historyTransaction',
                component: () => import('pages/transaction/HistoryTransaction.vue'),
            },
        ],
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
