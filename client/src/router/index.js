import Vue from 'vue';
import VueRouter from 'vue-router';

const title = 'Baby Shower';

// Containers
const Container = () => import('@/containers/Container');

// Public Pages
const Invitation = () => import('@/views/Invitation');
const Thanks = () => import('@/views/Invitation');

// Components
const Page404 = () => import('@/components/Page404');

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: '/pages',
      redirect: '/pages/inivitation',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [
        {
          path: 'invitation',
          name: 'Invitation',
          component: Invitation,
          meta: {
            title: `${title} | Invitación`,
            isPublic: true,
          },
        },
        {
          path: 'thank-you',
          name: 'Thanks',
          component: Thanks,
          meta: {
            title: `${title} | Agradecimientos`,
            isPublic: true,
          },
        },
      ],
    },
    {
      path: '*',
      component: Page404,
      meta: {
        title: `${title} | 404 Pagina no encontrada`,
      },
    },
  ];
}

const isAuthenticated = function() {
  return window.localStorage.user;
};

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    return next({ name: 'Login' });
  }

  if (to.name === 'Login' && isAuthenticated()) {
    return next({ name: 'Dashboard' });
  }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  return next();
});