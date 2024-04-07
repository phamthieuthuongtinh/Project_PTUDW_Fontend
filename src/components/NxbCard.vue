<script>
export default {
    props: {
        nxb: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên nhà xuất bản:</strong>
            {{ nxb.tennxb }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ nxb.diachi }}
        </div>
        
    </div>
</template>