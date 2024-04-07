import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import authMiddleware from "./middle.js";
const routes = [
      //home
      {
        path: "/",
        name: "borrowbook",
        component: () => import("@/views/Borrow.vue"),
    },
    {
        path: "/admin",
        name: "contactbook",
        component: ContactBook,
       
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/contacts/",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),

    },



    // NXB
    {
        path: "/nxb",
        name: "nhaxuatban",
        component: () => import("@/views/Nxb.vue"),
    },
    {
        path: "/nxb/:id",
        name: "nxb.edit",
        component: () => import("@/views/NxbEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nxb",
        name: "nxb.add",
        component: () => import("@/views/NxbAdd.vue"),

    },



    //DocGia
    {
        path: "/docgia",
        name: "docgia",
        component: () => import("@/views/Docgia.vue"),
    },
    {
        path: "/docgia/:id",
        name: "docgia.edit",
        component: () => import("@/views/DocgiaEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/docgia",
        name: "docgia.add",
        component: () => import("@/views/DocgiaAdd.vue"),

    },


    //Nhanvien
    {
        path: "/nhanvien",
        name: "nhanvien",
        component: () => import("@/views/Nhanvien.vue"),
    },
    {
        path: "/nhanvien/:id",
        name: "nhanvien.edit",
        component: () => import("@/views/NhanvienEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/nhanvien",
        name: "nhanvien.add",
        component: () => import("@/views/NhanvienAdd.vue"),

    },




    // Dang nhap
    {
        path: "/dangnhap",
        name: "dangnhap",
        component: () => import("@/views/Login.vue"),
    },

    // Quan ly Muon sach
    {
        path: "/muonsach",
        name: "muonsach",
        component: () => import("@/views/Muonsach.vue"),
    },
    {
        path: "/muonsachadd",
        name: "muonsach.add",
        component: () => import("@/views/MuonsachAdd.vue"),
    },

    //ve chung toi
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/About.vue"),
    },
  
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;