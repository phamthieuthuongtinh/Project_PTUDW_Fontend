<script>
export default {
    props: {
        docgia: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Họ lót:</strong>
            {{ docgia.holot }}
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ docgia.ten }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ docgia.ngaysinh }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ docgia.phai }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ docgia.diachi }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ docgia.dienthoai }}
        </div>
        
    </div>
</template>