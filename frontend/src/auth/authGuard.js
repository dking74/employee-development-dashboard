import { getInstance } from '.';

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    // console.log('Here is auth service: ', JSON.stringify(authService));
    if (authService.isAuthenticated) {
      return next();
    }

    // Otherwise, log in
    authService.logout();
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", loading => {
    if (!loading) return fn();
  });
};