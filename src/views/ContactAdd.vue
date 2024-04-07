<template>
    <div class="page" >
      <h4 style="text-align: center;">Thêm sách</h4>
      <ContactForm :contact="{}" @submit:contact="addContact" style="margin-left: 400px;"/>
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import ContactForm from "@/components/ContactForm.vue";
  import ContactService from "@/services/contact.service";
  export default {
    components: {
      ContactForm,
    },
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async addContact(data) {
        try {
          await ContactService.create(data);
          this.message = "Liên hệ được tạo thành công.";
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>