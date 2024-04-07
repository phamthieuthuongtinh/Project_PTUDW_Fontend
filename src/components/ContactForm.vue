<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="tensach">Tên sách</label>
            <Field name="tensach" type="text" class="form-control" v-model="contactLocal.tensach" />
            <ErrorMessage name="tensach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="hinhanh">Link hình ảnh</label>
            <Field name="hinhanh" type="text" class="form-control" v-model="contactLocal.hinhanh" />
            <ErrorMessage name="hinhanh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dongia">Đơn giá</label>
            <Field name="dongia" type="text" class="form-control" v-model="contactLocal.dongia" />
            <ErrorMessage name="dongia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soquyen">Số quyển</label>
            <Field name="soquyen" type="text" class="form-control" v-model="contactLocal.soquyen" />
            <ErrorMessage name="soquyen" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="tacgia">Tác giả</label>
            <Field name="tacgia" type="text" class="form-control" v-model="contactLocal.tacgia" />
            <ErrorMessage name="tacgia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="namxuatban">Năm xuất bản</label>
            <Field name="namxuatban" type="text" class="form-control" v-model="contactLocal.namxuatban" />
            <ErrorMessage name="namxuatban" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="manxb">Nhà xuất bản</label>
            <select v-model="contactLocal.manxb" class="form-control">
                <option v-for="nxb in nxbs" :value="nxb._id">{{ nxb.tennxb }}</option>
            </select>
            <ErrorMessage name="manxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NxbService from "@/services/nxb.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            tensach: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            dongia: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            soquyen: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            tacgia: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            namxuatban: yup
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
            contactLocal: this.contact,
            contactFormSchema,
            nxbs: []
        };
    },
    async created() {
        try {
            // Lấy danh sách các nhà xuất bản từ cơ sở dữ liệu
            this.nxbs = await NxbService.getAll();
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
    