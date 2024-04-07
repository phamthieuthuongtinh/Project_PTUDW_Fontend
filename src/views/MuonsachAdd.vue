<template>
    <div class="page">
        <h4 style="text-align: center;">Thông tin mượn sách</h4>
        <MuonsachForm :muonsach="{}" @submit:muonsach="addMuonsach" style="margin-left: 400px;" />
        <!-- <p style="margin-left: 400px; color: red;">{{ message }}</p> -->

    </div>
</template>
<script>
import MuonsachService from "@/services/muonsach.service";
import MuonsachForm from "@/components/MuonsachForm.vue";
export default {
    components: {
        MuonsachForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addMuonsach(data) {
            try {
                await MuonsachService.create(data);

                this.message = "tạo thành công.";
                alert("Mượn sách thành công! tôi sẽ đưa bạn về trang chủ.")
                this.$router.push({ name: "borrowbook" })
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>