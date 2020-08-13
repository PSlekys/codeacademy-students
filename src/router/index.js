import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/students",
    name: "Students",
    component: () =>
      import(
        /* webpackChunkName: "students" */ "../views/students/Students.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-student",
    name: "Add Student",
    component: () =>
      import(
        /* webpackChunkName: "addStudent" */ "../views/students/AddStudent.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-student/:id",
    name: "Edit Student",
    component: () =>
      import(
        /* webpackChunkName: "editStudent" */ "../views/students/EditStudent.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/groups",
    name: "Groups",
    component: () =>
      import(/* webpackChunkName: "groups" */ "../views/groups/Groups.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-group",
    name: "Add Group",
    component: () =>
      import(/* webpackChunkName: "addGroup" */ "../views/groups/AddGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-group/:id",
    name: "Edit Group",
    component: () =>
      import(
        /* webpackChunkName: "editGroup" */ "../views/groups/EditGroup.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/classes",
    name: "Classes",
    component: () =>
      import(/* webpackChunkName: "classes" */ "../views/classes/Classes.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-class",
    name: "Add Class",
    component: () =>
      import(
        /* webpackChunkName: "addClass" */ "../views/classes/AddClass.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-class/:id",
    name: "Edit Class",
    component: () =>
      import(
        /* webpackChunkName: "editClass" */ "../views/classes/EditClass.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
    meta: {
      requiresAnon: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/students" });
    } else {
      next();
    }
  });
});

export default router;
