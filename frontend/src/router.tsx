import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import QuotesPage from './pages/QuotesPage';
import PrayersPage from './pages/PrayersPage';
import GalleryPage from './pages/GalleryPage';
import FavoritesPage from './pages/FavoritesPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const quotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quotes',
  component: QuotesPage,
});

const prayersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prayers',
  component: PrayersPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/favorites',
  component: FavoritesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  quotesRoute,
  prayersRoute,
  galleryRoute,
  favoritesRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
