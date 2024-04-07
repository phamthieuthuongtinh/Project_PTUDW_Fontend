<script>
export default {
    props: {
        docgias: { type: Array, default: [] },
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
        <li class="list-group-item" v-for="(docgia, index) in docgias" :key="docgia._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ docgia.holot }} {{ docgia.ten }}
        </li>
    </ul>
</template>