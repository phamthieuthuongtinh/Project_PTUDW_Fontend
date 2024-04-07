<template>
    <Form @submit="submitNxb" :validation-schema="nxbFormSchema">
        <div class="form-group">
            <label for="tennxb">Tên nhà xuất bản</label>
            <Field name="tennxb" type="text" class="form-control" v-model="nxbLocal.tennxb" />
            <ErrorMessage name="tennxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="nxbLocal.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="nxbLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNxb">
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
    emits: ["submit:nxb", "delete:nxb"],
    props: {
        nxb: { type: Object, required: true }
    },
    data() {
        const nxbFormSchema = yup.object().shape({
            tennxb: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .email("E-mail không đúng.")
            //     .max(50, "E-mail tối đa 50 ký tự."),
            // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            // phone: yup
            //     .string()
            //     .matches(
            //         /((09|03|07|08|05)+([0-9]{8})\b)/g,
            //         "Số điện thoại không hợp lệ."
            //     ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            nxbLocal: this.nxb,
            nxbFormSchema,
        };
    },
    methods: {
        submitNxb() {
            this.$emit("submit:nxb", this.nxbLocal);
        },
        deleteNxb() {
            this.$emit("delete:nxb", this.nxbLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
    