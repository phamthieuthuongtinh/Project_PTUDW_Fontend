<template>
    <div class="page row">
      <div class="col-md-10">
        <InputSearch v-model="searchText" />
      </div>
      <div class="mt-3 col-md-6">
        <h4>
          Tất cả nhà xuất bản
          <i class="fas fa-city"></i>
        </h4>
        <NxbList v-if="filteredNxbsCount > 0" :nxbs="filteredNxbs" v-model:activeIndex="activeIndex" />
        <p v-else>Không có nhà xuất bản nào.</p>
        <div class="mt-3 row justify-content-around align-items-center">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
          <button class="btn btn-sm btn-success" @click="goToAddNxb">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button class="btn btn-sm btn-danger" @click="removeAllNxbs">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <div class="mt-3 col-md-6">
        <div v-if="activeNxb">
          <h4>
            Chi tiết nhà xuất bản
            <i class="fas fa-city"></i>
          </h4>
          <NxbCard :nxb="activeNxb" />
          <router-link :to="{
            name: 'nxb.edit',
            params: { id: activeNxb._id },
          }">
            <span class="mt-2 badge badge-warning">
              <i class="fas fa-edit"></i> Hiệu chỉnh</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import NxbCard from "@/components/NxbCard.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import NxbList from "@/components/NxbList.vue";
  import NxbService from "@/services/nxb.service";
  export default {
    components: {
      NxbCard,
      InputSearch,
      NxbList,
    },
    data() {
      return {
        nxbs: [],
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
      nxbStrings() {
        return this.nxbs.map((nxb) => {
          const { tennxb, diachi } = nxb;
          return [tennxb, diachi].join("");
        });
      },
      // Trả về các contact có chứa thông tin cần tìm kiếm.
      filteredNxbs() {
        if (!this.searchText) return this.nxbs;
        return this.nxbs.filter((_nxb, index) =>
          this.nxbStrings[index].includes(this.searchText)
        );
      },
      activeNxb() {
        // console.log("Active index:", this.activeIndex);
        // console.log("Filtered nxbs:", this.filteredNxbs);
        if (this.activeIndex < 0) return null;
        return this.filteredNxbs[this.activeIndex];
      },  
      filteredNxbsCount() {
        return this.filteredNxbs.length;
      },
    },
    methods: {
      async retrieveNxbs() {
        try {
          this.nxbs = await NxbService.getAll();
        } catch (error) {
            console.log(error);
      }
    },
    refreshList() {
      this.retrieveNxbs();
      this.activeIndex = -1;
    },
    async removeAllNxbs() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await NxbService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNxb() {
      this.$router.push({ name: "nxb.add" });
    },
  },
  mounted() {
    console.log("Active Nxb:", this.activeNxb);
    this.refreshList();
  },
  updated() {
  console.log("Active Nxb (Updated):", this.activeNxb);
},
};
</script>
<style scoped>
.page {
  text-align: left;
}
</style>