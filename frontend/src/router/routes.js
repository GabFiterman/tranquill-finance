const routes = [
    {
        path: '/',
        component: () => import('layouts/LoginLayout.vue'),
        children: [
            { path: '', name: 'loginUser', component: () => import('pages/LoginUser.vue') },
            { path: 'login', name: 'login', component: () => import('pages/LoginUser.vue') },
            {
                path: 'register',
                name: 'register',
                component: () => import('pages/RegisterUser.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: 'me', name: 'me', component: () => import('pages/Me.vue') }],
        meta: {
            requiresAuth: true,
        },
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
