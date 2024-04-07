<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema">
      <div class="form-group">
        <label for="sdt">Số điện thoại</label>
        <Field name="sdt" type="tel" class="form-control" v-model="loginData.sdt" />
        <ErrorMessage name="sdt" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field name="password" type="password" class="form-control" v-model="loginData.password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      
      <div class="form-group">
        <button class="btn btn-primary">Đăng nhập</button>
      </div>
    </Form>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:login"],
    data() {
      const loginFormSchema = yup.object().shape({
        sdt: yup
          .string()
          .required("Số điện thoại không được để trống.")
          .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            "Số điện thoại không hợp lệ."
          ),
        password: yup
          .string()
          .required("Mật khẩu không được để trống."),
      });
      return {
        // Tạo một đối tượng loginData để lưu trữ dữ liệu đăng nhập và liên kết với các input trên form
        loginData: {
          sdt: "",
          password: "",
        },
        loginFormSchema,
      };
    },
    methods: {
      submitLogin() {
        // Khi form được submit, gửi dữ liệu đăng nhập lên component cha thông qua sự kiện emit
        this.$emit("submit:login", this.loginData);
      },
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  