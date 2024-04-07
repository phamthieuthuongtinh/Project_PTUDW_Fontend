<template>
    <Form @submit="submitNhanvien" :validation-schema="nhanvienFormSchema">
        <div class="form-group">
            <label for="HoTenNV">Tên nhân viên</label>
            <Field name="HoTenNV" type="text" class="form-control" v-model="nhanvienLocal.HoTenNV" />
            <ErrorMessage name="HoTenNV" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Password">Mật khẩu</label>
            <Field name="Password" type="text" class="form-control" v-model="nhanvienLocal.Password" />
            <ErrorMessage name="Password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ChucVu">Chức vụ</label>
            <Field name="ChucVu" type="text" class="form-control" v-model="nhanvienLocal.ChucVu" />
            <ErrorMessage name="ChucVu" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="nhanvienLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SoDienThoai">Điện thoại</label>
            <Field name="SoDienThoai" type="tel" class="form-control" v-model="nhanvienLocal.SoDienThoai" />
            <ErrorMessage name="SoDienThoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="nhanvienLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNhanvien">
                Xóa
            </button>
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
    emits: ["submit:nhanvien", "delete:nhanvien"],
    props: {
        nhanvien: { type: Object, required: true }
    },
    data() {
        const nhanvienFormSchema = yup.object().shape({
            HoTenNV: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            Password: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            DiaChi: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .email("E-mail không đúng.")
            //     .max(50, "E-mail tối đa 50 ký tự."),
            // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            SoDienThoai: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            nhanvienLocal: this.nhanvien,
            nhanvienFormSchema,
        };
    },
    methods: {
        
        submitNhanvien() {
            console.log(1234);
            this.$emit("submit:nhanvien", this.nhanvienLocal);
        },
        deleteNhanvien() {
            this.$emit("delete:nhanvien", this.nhanvienLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
    