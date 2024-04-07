<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Tất cả danh sách mượn
        <i class="fas fa-book-reader"></i>
      </h4>
      <MuonsachList v-if="filteredMuonsachsCount > 0" :muonsachs="filteredMuonsachs"
        v-model:activeIndex="activeIndex" />
      <p v-else>Không có.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <!-- <button class="btn btn-sm btn-success" @click="goToAddContact">
            <i class="fas fa-plus"></i> Thêm mới
          </button> -->
        <!-- <button class="btn btn-sm btn-danger" @click="removeAllContacts">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button> -->
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeMuonsach">
        <h4>
          Chi tiết mượn sách
          <i class="fas fa-book-reader"></i>
        </h4>
        <MuonsachCard :muonsach="activeMuonsach" />
        <!-- <router-link :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }">
            <span class="mt-2 badge badge-warning">
              <i class="fas fa-edit"></i> Hiệu chỉnh</span>
          </router-link> -->
        <button style="font-size: 20px;" v-if="activeMuonsach.trangthai == 0" class="btn btn-sm btn-warning mt-2"
          @click="approveMuonsach(activeMuonsach)">
          <i style="color: green;" class="fas fa-check"></i> Duyệt
        </button>
        <button style="font-size: 20px;" v-else class="btn btn-sm btn-danger mt-2"
          @click="unapproveMuonsach(activeMuonsach)">
          <i style="color: green;" class="fas fa-check"></i> Bỏ duyệt
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import MuonsachCard from "@/components/MuonsachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import MuonsachList from "@/components/MuonsachList.vue";
import MuonsachService from "@/services/muonsach.service";
export default {
  components: {
    MuonsachCard,
    InputSearch,
    MuonsachList,
  },
  data() {
    return {
      muonsachs: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    muonsachStrings() {
      return this.muonsachs.map((muonsach) => {
        const { HoTenNV, ten } = muonsach;
        return [HoTenNV, ten].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredMuonsachs() {
      if (!this.searchText) return this.muonsachs;
      return this.muonsachs.filter((_muonsach, index) =>
        this.muonsachStrings[index].includes(this.searchText)
      );
    },
    activeMuonsach() {
      if (this.activeIndex < 0) return null;
      return this.filteredMuonsachs[this.activeIndex];
    },
    filteredMuonsachsCount() {
      return this.filteredMuonsachs.length;
    },
  },
  methods: {
    async retrieveMuonsachs() {
      try {
        this.muonsachs = await MuonsachService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveMuonsachs();
      this.activeIndex = -1;
    },
    async approveMuonsach(activeMuonsach) {
      try {
        if (activeMuonsach) {
          let manv=localStorage.getItem("userId");  
          await MuonsachService.update(activeMuonsach._id, { trangthai: 1,MSNV: manv });
          alert("Duyệt thành công.");
          this.refreshList();
        }
      } catch (error) {
        alert("Lỗi khi duyệt muonsach:" + error);
      }
    },
    async unapproveMuonsach(activeMuonsach) {
      try {
        if (activeMuonsach) {
          await MuonsachService.update(activeMuonsach._id, { trangthai: 0,MSNV:"" });
          alert("Bỏ duyệt thành công.");
          this.refreshList();
        }
      } catch (error) {
        alert("Lỗi khi duyệt muonsach:" + error);
      }
    }
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
}
</style>