<template>
    <div class="page">
      <h4 style="text-align: center;">Đăng ký</h4>
      <DocgiaForm :docgia="{}" @submit:docgia="addDocgia" style="margin-left: 400px;"/>
      <p style="margin-left: 400px; color: red;">{{ message }}</p>
      
    </div>
  </template>
  <script>
  import DocgiaForm from "@/components/DocgiaForm.vue";
  import DocgiaService from "@/services/docgia.service";
  export default {
    components: {
      DocgiaForm,
    },
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async addDocgia(data) {
        try {
          await DocgiaService.create(data);
          
          this.message = "tạo thành công.";
          alert("Tạo tài khoản thành công! tôi sẽ đưa bạn về trang đăng nhập.")
          this.$router.push({ name: "dangnhap" })
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>