<template>
    <div class="page row">
      <div class="col-md-10">
        <InputSearch v-model="searchText" />
      </div>
      <div class="mt-3 col-md-6">
        <h4>
          Tất cả nhân viên
          <i class="fas fa-address-card"></i>
        </h4>
        <NhanvienList v-if="filteredNhanviensCount > 0" :nhanviens="filteredNhanviens" v-model:activeIndex="activeIndex" />
        <p v-else>Không có nhân viên.</p>
        <div class="mt-3 row justify-content-around align-items-center">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
          <button class="btn btn-sm btn-success" @click="goToAddNhanvien">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button class="btn btn-sm btn-danger" @click="removeAllNhanviens">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <div class="mt-3 col-md-6">
        <div v-if="activeNhanvien">
          <h4>
            Chi tiết nhân viên
            <i class="fas fa-address-card"></i>
          </h4>
          <NhanvienCard :nhanvien="activeNhanvien" />
          <router-link :to="{
            name: 'nhanvien.edit',
            params: { id: activeNhanvien._id },
          }">
            <span class="mt-2 badge badge-warning">
              <i class="fas fa-edit"></i> Hiệu chỉnh</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import NhanvienCard from "@/components/NhanvienCard.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import NhanvienList from "@/components/NhanvienList.vue";
  import NhanvienService from "@/services/nhanvien.service";
  export default {
    components: {
      NhanvienCard,
      InputSearch,
      NhanvienList,
    },
    data() {
      return {
        nhanviens: [],
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
      nhanvienStrings() {
        return this.nhanviens.map((nhanvien) => {
          const { HoTenNV } = nhanvien;
          return [HoTenNV].join("");
        });
      },
      // Trả về các contact có chứa thông tin cần tìm kiếm.
      filteredNhanviens() {
        if (!this.searchText) return this.nhanviens;
        return this.nhanviens.filter((_nhanvien, index) =>
          this.nhanvienStrings[index].includes(this.searchText)
        );
      },
      activeNhanvien() {
        // console.log("Active index:", this.activeIndex);
        // console.log("Filtered nxbs:", this.filteredNxbs);
        if (this.activeIndex < 0) return null;
        return this.filteredNhanviens[this.activeIndex];
      },  
      filteredNhanviensCount() {
        return this.filteredNhanviens.length;
      },
    },
    methods: {
      async retrieveNhanviens() {
        try {
          this.nhanviens = await NhanvienService.getAll();
        } catch (error) {
            console.log(error);
      }
    },
    refreshList() {
      this.retrieveNhanviens();
      this.activeIndex = -1;
    },
    async removeAllNhanviens() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await NhanvienService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNhanvien() {
      this.$router.push({ name: "nhanvien.add" });
    },
  },
  mounted() {
    console.log("Active Nhanvien:", this.activeNhanvien);
    this.refreshList();
  },
  updated() {
  console.log("Active Nhanvien (Updated):", this.activeNhanvien);
},
};
</script>
<style scoped>
.page {
  text-align: left;
}
</style>