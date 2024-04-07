<template>
    <div class="page">
      <h4 style="text-align: center;">Thêm nhân viên</h4>
      <NhanvienForm :nhanvien="{}" @submit:nhanvien="addNhanvien" style="margin-left: 400px;"/>
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import NhanvienForm from "@/components/NhanvienForm.vue";
  import NhanvienService from "@/services/nhanvien.service";
  export default {
    components: {
      NhanvienForm,
    },
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async addNhanvien(data) {
        try {
          await NhanvienService.create(data);

          this.message = "nhan vien được tạo thành công.";
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>