<template>
    <div class="page row">
      <div class="col-md-10">
        <InputSearch v-model="searchText" />
      </div>
      <div class="mt-3 col-md-6">
        <h4>
          Tất cả độc giả
          <i class="fas fa-address-card"></i>
        </h4>
        <DocgiaList v-if="filteredDocgiasCount > 0" :docgias="filteredDocgias" v-model:activeIndex="activeIndex" />
        <p v-else>Không có độc giả nào.</p>
        <div class="mt-3 row justify-content-around align-items-center">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
          <!-- <button class="btn btn-sm btn-success" @click="goToAddDocgia">
            <i class="fas fa-plus"></i> Thêm mới
          </button> -->
          <button class="btn btn-sm btn-danger" @click="removeAllDocgia">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <div class="mt-3 col-md-6">
        <div v-if="activeDocgia">
          <h4>
            Chi tiết độc giả
            <i class="fas fa-address-card"></i>
          </h4>
          <DocgiaCard :docgia="activeDocgia" />
          <router-link :to="{
            name: 'docgia.edit',
            params: { id: activeDocgia._id },
          }">
            <span class="mt-2 badge badge-warning">
              <i class="fas fa-edit"></i> Hiệu chỉnh</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import DocgiaCard from "@/components/DocgiaCard.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import DocgiaList from "@/components/DocgiaList.vue";
  import DocgiaService from "@/services/docgia.service";
  export default {
    components: {
      DocgiaCard,
      InputSearch,
      DocgiaList,
    },
    data() {
      return {
        docgias: [],
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
      docgiaStrings() {
        return this.docgias.map((docgia) => {
          const { holot, ten, diachi } = docgia;
          return [holot, ten, diachi].join("");
        });
      },
      // Trả về các contact có chứa thông tin cần tìm kiếm.
      filteredDocgias() {
        if (!this.searchText) return this.docgias;
        return this.docgias.filter((_docgia, index) =>
          this.docgiaStrings[index].includes(this.searchText)
        );
      },
      activeDocgia() {
        // console.log("Active index:", this.activeIndex);
        // console.log("Filtered nxbs:", this.filteredNxbs);
        if (this.activeIndex < 0) return null;
        return this.filteredDocgias[this.activeIndex];
      },  
      filteredDocgiasCount() {
        return this.filteredDocgias.length;
      },
    },
    methods: {
      async retrieveDocgias() {
        try {
          this.docgias = await DocgiaService.getAll();
        } catch (error) {
            console.log(error);
      }
    },
    refreshList() {
      this.retrieveDocgias();
      this.activeIndex = -1;
    },
    async removeAllDocgia() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await DocgiaService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddDocgia() {
      this.$router.push({ name: "docgia.add" });
    },
  },
  mounted() {
    // console.log("Active Nxb:", this.activeNxb);
    this.refreshList();
  },
  updated() {
  console.log("Active Docgia (Updated):", this.activeDocgia);
},
};
</script>
<style scoped>
.page {
  text-align: left;
}
</style>