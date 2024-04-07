<script>
import NxbService from "@/services/nxb.service";

export default {
    props: {
        contact: { type: Object, required: true },
    },
    data() {
        return {
            nxb: {}
        };
    },
    async created() {
        await this.fetchNxbData();
    },
    watch: {
        // Theo dõi thay đổi của prop 'contact'
        contact: {
            handler: 'fetchNxbData', // Gọi lại hàm fetchNxbData khi contact thay đổi
            immediate: true // Gọi hàm fetchNxbData ngay lập tức khi component được tạo
        }
    },
    methods: {
        async fetchNxbData() {
            try {
                // Lấy thông tin nhà xuất bản từ service
                this.nxb = await NxbService.get(this.contact.manxb);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<template>
    <div class="contact-details">
      <div class="contact-details-left">
        <div class="p-1">
          <strong>Hình ảnh:</strong>
          <br>
          <img width="300px" height="412px" :src="contact.hinhanh" alt="Hình ảnh">
        </div>
        
      </div>
      <div class="contact-details-right">
        <br>
        <div class="p-1">
          <strong>Tên sách:</strong>
          {{ contact.tensach }}
        </div>
        <div class="p-1">
          <strong>Đơn giá:</strong>
          {{ contact.dongia }}
        </div>
        <div class="p-1">
          <strong>Số quyển:</strong>
          {{ contact.soquyen }}
        </div>
        <div class="p-1">
          <strong>Tác giả:</strong>
          {{ contact.tacgia }}
        </div>
        <div class="p-1">
          <strong>Năm xuất bản:</strong>
          {{ contact.namxuatban }}
        </div>
        <div class="p-1">
          <strong>Tên nhà xuất bản:</strong>
          {{ nxb.tennxb }}
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .contact-details {
    display: flex;
  }
  
  .contact-details-left {
    flex: 1;
  }
  
  .contact-details-right {
    flex: 1;
  }
  </style>
  
  
