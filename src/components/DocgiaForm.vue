<template>
    <Form @submit="submitDocgia" :validation-schema="docgiaFormSchema">
        <div class="form-group">
            <label for="holot">Họ lót</label>
            <Field name="holot" type="text" class="form-control" v-model="docgiaLocal.holot" />
            <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ten">Tên</label>
            <Field name="ten" type="text" class="form-control" v-model="docgiaLocal.ten" />
            <ErrorMessage name="ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngaysinh">Ngày sinh</label>
            <Field name="ngaysinh" type="text" class="form-control" v-model="docgiaLocal.ngaysinh" />
            <ErrorMessage name="ngaysinh" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="phai">Giới tính</label>
            <Field name="phai" type="text" class="form-control" v-model="docgiaLocal.phai" />
            <ErrorMessage name="phai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="docgiaLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dienthoai">Điện thoại</label>
            <Field name="dienthoai" type="tel" class="form-control" v-model="docgiaLocal.dienthoai" />
            <ErrorMessage name="dienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="docgiaLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Xác nhận</button>
            <!-- <button v-if="docgiaLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteDocgia">
                Xóa
            </button> -->
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import DocgiaService from "@/services/docgia.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:docgia", "delete:docgia"],
    props: {
        docgia: { type: Object, required: true }
    },
    data() {
        const docgiaFormSchema = yup.object().shape({
            holot: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            ten: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            phai: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            ngaysinh: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // manxb: yup
            //     .string()
            //     .required("Tên phải có giá trị.")
            //     .min(2, "Tên phải ít nhất 2 ký tự.")
            //     .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .email("E-mail không đúng.")
            //     .max(50, "E-mail tối đa 50 ký tự."),
            // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            dienthoai: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            docgiaLocal: this.docgia,
            docgiaFormSchema,
        };
    },
    methods: {
        submitDocgia() {
            this.$emit("submit:docgia", this.docgiaLocal);
        },
        deleteDocgia() {
            this.$emit("delete:docgia", this.docgiaLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
    