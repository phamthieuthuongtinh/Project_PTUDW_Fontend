<template>
    <div v-if="nhanvien" class="page">
        <h4 style="text-align: center;">Hiệu chỉnh nhân viên</h4>
        <NhanvienForm :nhanvien="nhanvien" @submit:nhanvien="updateNhanvien" @delete:nhanvien="deleteNhanvien" style="margin-left: 400px;" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            nhanvien: null,
            message: "",
        };
    },
    methods: {
        async getNhanvien(id) {
            try {
                this.nhanvien = await NhanvienService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateNhanvien(data) {
            try {
                await NhanvienService.update(this.nhanvien._id, data);
                this.message = "Nhan vien được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNhanvien() {
            if (confirm("Bạn muốn xóa nhan vien này?")) {
                try {
                    await NhanvienService.delete(this.nhanvien._id);
                    this.$router.push({ name: "nhanvien" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNhanvien(this.id);
        this.message = "";
    },
};
</script>