<template>
    <div class="page">
      <h4 style="text-align: center;">Thêm nhà xuất bản</h4>
      <NxbForm :nxb="{}" @submit:nxb="addNxb" style="margin-left: 400px;"/>
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import NxbForm from "@/components/NxbForm.vue";
  import NxbService from "@/services/nxb.service";
  export default {
    components: {
      NxbForm,
    },
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async addNxb(data) {
        try {
          await NxbService.create(data);
          this.message = "nhà xuất bản được tạo thành công.";
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>