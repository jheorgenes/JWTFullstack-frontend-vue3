import { useAuth } from '@/stores/auth.js'

export default async function routes(to, from, next) {
  if(to.meta?.auth) {
    const auth = useAuth();
    //Se não existir token e usuário no auth, redirecione para login
    if(auth.token && auth.user) {
      const isAuthenticated = await auth.checkToken();
      //Se autenticado -> prosseguir com a rota, se não, redirecione para login
      (isAuthenticated) ? next() : next({ name: 'login' });
    } else {
      next({ name: 'login' });
    }
  //Se não tiver o meta.auth, não precisa da autenticação
  } else { 
    next()
  }
}