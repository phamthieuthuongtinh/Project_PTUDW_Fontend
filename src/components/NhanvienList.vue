<script>
export default {
    props: {
        nhanviens: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            // console.log("Clicked index:", index);
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(nhanvien, index) in nhanviens" :key="nhanvien._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ nhanvien.HoTenNV }}
        </li>
    </ul>
</template>