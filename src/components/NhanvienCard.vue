<script>
export default {
    props: {
        nhanvien: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên nhà xuất bản:</strong>
            {{ nhanvien.HoTenNV }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ nhanvien.ChucVu }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ nhanvien.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ nhanvien.SoDienThoai }}
        </div>
    </div>
</template>