import Vue from 'vue';
import VueRouter from 'vue-router';

// Public Pages
import Welcome from '@/views/Welcome.vue';

// Components
import Page404 from '@/components/Page404.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: {
        title: `Baby shower | Invitación`,
      },
    },
    {
      path: '/thank-you',
      name: 'Thanks',
      component: () => import('@/views/Thanks.vue'),
      meta: {
        title: `Baby shower | Agradecimientos`,
      },
    },
    {
      path: '*',
      component: Page404,
      meta: {
        title: `Baby shower | 404 Pagina no encontrada`,
      },
    },
  ];
}

router.beforeEach((to, from, next) => {

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  return next();
});