import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import About from "../views/AboutView.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.path === "/login" && auth.currentUser) {
      next("/");
      return;
    }
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !auth.currentUser
    ) {
      next("/login");
      return;
    }
    next();
  }
);

export default router;
