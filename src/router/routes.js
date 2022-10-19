const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "", name: "inicio", component: () => import("pages/Inicio.vue") },
      {
        path: "/reportes",
        name: "home-reportes",
        component: () => import("pages/Reportes.vue"),
      },
      {
        path: "/dashboard",
        name: "home-dashboard",
        component: () => import("pages/DashBoard.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
