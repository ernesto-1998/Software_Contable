const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "inicio",
        component: () => import("pages/InicioPage.vue"),
      },
    ],
  },

  {
    path: "/analisis",
    component: () => import("layouts/GeneralLayout.vue"),
    children: [
      {
        path: "/reportes",
        name: "reportes",
        component: () => import("pages/Reportes.vue"),
      },
      {
        path: "/admin",
        name: "admin",
        component: () => import("src/pages/AdministracionPage.vue"),
      },
      {
        path: "/razones",
        name: "razones",
        component: () => import("src/pages/analisis/RazonesFinancieras.vue"),
      },
      {
        path: "/vertical",
        name: "vertical",
        component: () => import("src/pages/analisis/AnalisisVertical.vue"),
      },
      {
        path: "/horizontal",
        name: "horizontal",
        component: () => import("src/pages/analisis/AnalisisHorizontal.vue"),
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
