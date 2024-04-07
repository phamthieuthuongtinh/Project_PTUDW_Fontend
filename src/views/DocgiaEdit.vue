<template>
    <div v-if="docgia" class="page">
        <h4 style="text-align: center;"> Sửa thông tin cá nhân</h4>
        <DocgiaForm :docgia="docgia" @submit:docgia="updateDocgia" @delete:docgia="deleteDocgia" style="margin-left: 400px;" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import DocgiaForm from "@/components/DocgiaForm.vue";
import DocgiaService from "@/services/docgia.service";
export default {
    components: {
        DocgiaForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            docgia: null,
            message: "",
        };
    },
    methods: {
        async getDocgia(id) {
            try {
                this.docgia = await DocgiaService.get(id);
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
        async updateDocgia(data) {
            try {
                await DocgiaService.update(this.docgia._id, data);
                this.message = "được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteDocgia() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await DocgiaService.delete(this.docgia._id);
                    this.$router.push({ name: "docgia" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getDocgia(this.id);
        this.message = "";
    },
};
</script>