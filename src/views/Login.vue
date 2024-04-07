<template>
  <div class="page">
    <h4 style="text-align: center;">Đăng nhập</h4>
    <div class="">
      <LoginForm @submit:login="login" style="margin-left: 400px;"/>
    </div>
    <p style="margin-left: 400px; color: red;">{{ message }}</p>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import NhanvienService from "@/services/nhanvien.service";
import DocgiaService from "@/services/docgia.service";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
  async login(loginData) {    
    try {
      let nhanvien = null;
      try {
        nhanvien = await NhanvienService.getBySdt(loginData.sdt);
      } catch (error) {
        // Xử lý lỗi gọi API
        console.error("Lỗi gọi API nhân viên:", error);
      }
      
      if (!nhanvien) {
        const docgia = await DocgiaService.getBySdt(loginData.sdt);
        if (!docgia) {
          throw new Error("Số điện thoại không tồn tại!");
        } else {
          if (docgia.password !== loginData.password) {
            throw new Error("Mật khẩu không đúng!");
          }
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("userId", docgia._id);
          localStorage.setItem("holot", docgia.holot);
          localStorage.setItem("ten", docgia.ten);
          localStorage.setItem("dienthoai", docgia.dienthoai);
          localStorage.setItem("diachi", docgia.diachi);
          localStorage.setItem("isAdmin", false);
          this.message = "Đăng nhập thành công!";
          this.$router.push({ name: "borrowbook" }).then(() => {
            window.location.reload();
          });
        }
      } else {
        if (nhanvien.Password !== loginData.password) {
          throw new Error("Mật khẩu không đúng!");
        }
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userId", nhanvien._id);
        localStorage.setItem("isAdmin", true);
        this.message = "Đăng nhập thành công!";
        this.$router.push({ name: "contactbook" }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      this.message = "Đăng nhập không thành công. " + error.message;
    }
  },
}

  }
</script>


