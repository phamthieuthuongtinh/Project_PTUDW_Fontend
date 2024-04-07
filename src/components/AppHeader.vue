<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark" v-if="isLoggedIn && isAdmin">
        <a href="/admin" class="navbar-brand ">Quản lý mượn sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link" v-if="isLoggedIn">
                    Quản lý sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'nhaxuatban' }" class="nav-link" v-if="isLoggedIn">
                    Quản lý nhà xuất bản
                    <i class="fas fa-city"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'docgia' }" class="nav-link" v-if="isLoggedIn">
                    Quản lý độc giả
                    <i class="fas fa-user"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'nhanvien' }" class="nav-link" v-if="isLoggedIn">
                    Quản lý nhân viên
                    <i class="fas fa-address-card"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'muonsach' }" class="nav-link" v-if="isLoggedIn">
                    Quản lý mượn sách
                    <i class="fas fa-book-reader"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'borrowbook' }" class="nav-link" v-if="isLoggedIn">
                    Trang chủ thư viện
                    <i class="fas fa-home"></i>
                </router-link>
            </li>
        </div>
        <div class="navbar-nav">
            <li v-if="isLoggedIn" class="nav-item">

                <a @click="logout" class="nav-link"><i class="fas fa-sign-out"></i>
                    Đăng xuất</a>
            </li>
            <li v-else class="nav-item">
                <router-link :to="{ name: 'dangnhap' }" class="nav-link"> <i class="fas fa-sign-in"></i>Đăng
                    nhập</router-link>
            </li>
        </div>
    </nav>
    <nav class="navbar navbar-expand navbar-dark bg-dark" v-else>
        <a href="/admin" class="navbar-brand ">Trang mượn sách thư viện</a>
    <div class="mr-auto navbar-nav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'borrowbook' }" class="nav-link">
                    Trang chủ
                    <i class="fas fa-home"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'about' }" class="nav-link">
                    Về chúng tôi
                    <i class="fas fa-question-circle"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'docgia.add' }" class="nav-link">
                    Đăng ký
                    <i class="fas fa-user-plus"></i>
                </router-link>
            </li>
            <!-- Đưa phần "Tài khoản" vào trong navbar-nav -->
            <li v-if="isLoggedIn" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user"></i> Tài khoản
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a @click="logout" class="dropdown-item"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                    <a @click="goToEditDocgia" class="dropdown-item"><i class="fas fa-edit"></i> Sửa thông tin</a>
                </div>
            </li>
            <li v-else class="nav-item">
                <router-link :to="{ name: 'dangnhap' }" class="nav-link">
                    Đăng nhập
                    <i class="fas fa-sign-in"></i>
                </router-link>
            </li>
        </ul>
    </div>
</nav>


</template>


<script>
export default {
    data() {
        return {
            isLoggedIn: false,
            isAdmin: false
        };
    },
    created() {
        const loggedIn = localStorage.getItem("loggedIn");
        const Admin = localStorage.getItem("isAdmin");
        if (loggedIn === "true") {
            this.isLoggedIn = true;
        }
        if (Admin === "true") {
            this.isAdmin = true;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("userId");
            localStorage.removeItem("holot");
            localStorage.removeItem("ten");
            localStorage.removeItem("dienthoai");
            localStorage.removeItem("diachi");
            this.isLoggedIn = false;
            this.$router.push({ name: "borrowbook" });
        },
        goToEditDocgia() {
            this.$router.push({ name: "docgia.edit",params: { id: localStorage.getItem("userId") },  });
        }


    }
};
</script>
