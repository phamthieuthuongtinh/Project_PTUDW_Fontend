<template>
    <Form @submit="submitMuonsach" :validation-schema="muonsachFormSchema">
        <div class="form-group">
            <label for="holot">Họ lót</label>
            <Field readonly name="holot" type="text" class="form-control" v-model="muonsachLocal.holot" :placeholder="muonsachLocal.holot" />
            <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ten">Tên</label>
            <Field readonly name="ten" type="text" class="form-control" v-model="muonsachLocal.ten" :placeholder="muonsachLocal.ten"/>
            <ErrorMessage name="ten" class="error-feedback" />
        </div>
       
        
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field readonly name="diachi" type="text" class="form-control" v-model="muonsachLocal.diachi" :placeholder="muonsachLocal.diachi"/>
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label  for="dienthoai">Điện thoại</label>
            <Field readonly name="dienthoai" type="tel" class="form-control" v-model="muonsachLocal.dienthoai" :placeholder="muonsachLocal.dienthoai" />
            <ErrorMessage name="dienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
    <label for="ngaymuon">Ngày mượn</label>
    <Field name="ngaymuon" type="text" class="form-control" v-model="muonsachLocal.ngaymuon" :placeholder="muonsachLocal.ngaymuon" />
    <ErrorMessage name="ngaymuon" class="error-feedback" />
</div>
        <div class="form-group">
            <label  for="ngaytra">Ngày trả (*Quy định 10 ngày của thư viện)</label>
            <Field name="ngaytra" type="text" class="form-control" v-model="muonsachLocal.ngaytra" :placeholder="muonsachLocal.ngaytra"/>
            <ErrorMessage name="ngaytra" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Xác nhận</button>
            <button v-if="muonsachLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteMuonsach">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
console.log(localStorage.getItem("docgiaId"));
console.log(localStorage.getItem("masach"));
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:muonsach", "delete:muonsach"],
    props: {
        muonsach: { type: Object, required: true },
  
        
    },
    
    data() {
        const muonsachFormSchema = yup.object().shape({
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
           
            diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            dienthoai: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
           
            muonsachLocal:{
                holot: localStorage.getItem("holot"),
                ten: localStorage.getItem("ten"), 
                diachi: localStorage.getItem("diachi"),
                dienthoai: localStorage.getItem("dienthoai"), 
                ngaymuon: new Date().toISOString().slice(0, 10),
                ngaytra: (() => {
                    const ngayTra = new Date(); // Ngày trả mặc định là 10 ngày sau từ ngày hiện tại
                    ngayTra.setDate(ngayTra.getDate() + 10); // Thêm 10 ngày vào ngày hiện tại
                    return ngayTra.toISOString().slice(0, 10); // Format ngày trả
                })(),
                madocgia: localStorage.getItem("userId"), 
                masach: localStorage.getItem("masach"),
            },
            
            muonsachFormSchema,
        };
    },
    methods: {
        
        submitMuonsach() {
            console.log(1234);
            this.$emit("submit:muonsach", this.muonsachLocal);
        },
        deleteMuonsach() {
            this.$emit("delete:muonsach", this.muonsachLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
    