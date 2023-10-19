const routes = [
    {
        path: '/',
        component: () => import('layouts/LoginLayout.vue'),
        children: [
            { path: '', name: 'loginDefault', component: () => import('pages/user/LoginUser.vue') },
            {
                path: 'login',
                name: 'login-user',
                component: () => import('pages/user/LoginUser.vue'),
            },
            {
                path: 'register',
                name: 'register-user',
                component: () => import('pages/user/RegisterUser.vue'),
            },
            {
                path: 'email-confirmation',
                name: 'email-confirmation',
                component: () => import('pages/user/EmailConfirmation.vue'),
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component: () => import('pages/user/ForgotPassword.vue'),
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('pages/user/ResetPassword.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
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
