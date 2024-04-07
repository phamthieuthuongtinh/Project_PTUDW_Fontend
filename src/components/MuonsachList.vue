<script>
import DocgiaService from "@/services/docgia.service";

export default {
  props: {
    muonsachs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  data() {
    return {
      docgias: [],
    };
  },
  emits: ["update:activeIndex"],
  async created() {
    await this.fetchDocgiaData();
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async fetchDocgiaData() {
      try {
        for (const muonsach of this.muonsachs) {
          const docgia = await DocgiaService.get(muonsach.madocgia);
          this.docgias.push(docgia);
        }

        // Sắp xếp cả hai mảng muonsachs và docgias dựa trên trạng thái của muonsachs
        this.muonsachs.sort((a, b) => a.trangthai - b.trangthai);
        this.docgias = this.muonsachs.map(muonsach => {
          return this.docgias.find(docgia => docgia._id === muonsach.madocgia);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(muonsach, index) in muonsachs"
      :key="muonsach._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <template v-if="docgias[index]">
        {{ docgias[index].holot }} {{ docgias[index].ten }}
      </template>
    </li>
  </ul>
</template>
