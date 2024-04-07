<script>
import ContactService from "@/services/contact.service";
import NhanvienService from "@/services/nhanvien.service";
import DocgiaService from "@/services/docgia.service";
export default {
    props: {
        muonsach: { type: Object, required: true },
    },
    data() {
        return {
            contact: {},
            nhanvien: {},
            docgia:{}
        };
    },
    // async created() {
    //     await this.fetchNhanvienData();
    // },
    watch: {
        // Theo dõi thay đổi của prop 'contact'
        muonsach: {
            handler: 'fetchContactData', // Gọi lại hàm fetchNxbData khi contact thay đổi
            immediate: true // Gọi hàm fetchNxbData ngay lập tức khi component được tạo
        }
    },
    methods: {
        async fetchContactData() {
            try {
                this.contact = await ContactService.get(this.muonsach.masach);
                await this.fetchNhanvienData();
                await this.fetchDocgiaData();
            } catch (error) {
                console.log(error);
            }
        },
        async fetchNhanvienData() {
            try {
                this.nhanvien = await NhanvienService.get(this.muonsach.MSNV);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchDocgiaData() {
            try {
                this.docgia = await DocgiaService.get(this.muonsach.madocgia);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ contact.tensach }}
        </div>
        <div class="p-1">
            <strong>Độc giả:</strong>
            {{ docgia.holot }} {{ docgia.ten }}
        </div>
       
        <div class="p-1">
            <strong>Ngày mượn:</strong>
            {{ muonsach.ngaymuon }}
        </div>
        <div class="p-1">
            <strong>Ngày trả:</strong>
            {{ muonsach.ngaytra }}
        </div>       
        <div v-if="muonsach.MSNV" class="p-1">
            <strong>Nhân viên:</strong>
            {{ nhanvien.HoTenNV }}
            <!-- <i v-if="contact.manxb" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i> -->
        </div>
        <div v-else class="p-1">
            <strong>Nhân viên:</strong>
            <span style="color: grey;">Không có thông tin nhân viên</span>
        </div>
        <div v-if="muonsach.trangthai==1" class="p-1">
            <strong>Trạng thái: </strong>
            <span style="color: green;font-weight: 700;">Đã duyệt</span>
        
            
            <!-- <i v-if="contact.manxb" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i> -->
        </div>
        <div v-else class="p-1">
            <strong>Trạng thái: </strong>
            <span style="color: red;font-weight: 700;">Chờ duyệt</span>
            
            <!-- <i v-if="contact.manxb" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i> -->
        </div>
    </div>
</template>
