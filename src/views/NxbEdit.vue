<template>
    <div v-if="nxb" class="page">
        <h4 style="text-align: center;">Hiệu chỉnh nhà xuất bản</h4>
        <NxbForm :nxb="nxb" @submit:nxb="updateNxb" @delete:nxb="deleteNxb"  style="margin-left: 400px;"/>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            nxb: null,
            message: "",
        };
    },
    methods: {
        async getNxb(id) {
            try {
                this.nxb = await NxbService.get(id);
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
        async updateNxb(data) {
            try {
                await NxbService.update(this.nxb._id, data);
                this.message = "Liên hệ được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNxb() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await NxbService.delete(this.nxb._id);
                    this.$router.push({ name: "nhaxuatban" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNxb(this.id);
        this.message = "";
    },
};
</script>