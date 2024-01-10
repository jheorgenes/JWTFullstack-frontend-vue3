import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        auth: true
      }
    },
  ]
})

//Antes de cada rota, será executado o beforeEach
//To -> A rota que estou indo nessa requisição
//from -> A rota que estou atualmente
router.beforeEach(async (to, from, next) => {
  if(to.meta?.auth) {
    const auth = useAuth();
    if(auth.token && auth.user) {
      const isAuthenticated = await auth.checkToken();
      console.log(isAuthenticated);

      if(isAuthenticated) {
        next()
      } else {
        next({ name: 'login' });
      }
      
    } else { //Se não existir token e usuário no auth, redirecione para login
      next({ name: 'login' });
    }
    // console.log(to.name);
  } else { //Se não tiver o meta, não precisa autenticar
    next()
  }
})

export default router
