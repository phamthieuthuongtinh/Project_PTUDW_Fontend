<script>
import AppHeader from "@/components/AppHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    AppHeader,
    Footer,
  },
};
</script>

<template>
  <div id="app" class="app-container">
    <AppHeader />
    <div class="content">
      <div class="container mt-3  align-items-center justify-content-center">
        <router-view />
      </div>
    </div>
    <br><br>
    <Footer />
  </div>
</template>

<style>
/* CSS cho app container */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }
  .content {
    flex: 1; /* Đảm bảo nội dung chiếm hết không gian trống còn lại */
  }
  /* .content {
    background-image: url('https://res.cloudinary.com/dopc4arla/image/upload/v1711115927/web%20vue/blurred-bookshelf-many-old-books-book-shop-library_327072-7345_aao39c.jpg');
    background-size: cover;
    background-position: center; 

} */
  .footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
  }
  .nav-item {
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 5px; 
    margin-bottom: 5px; /* Hoặc bất kỳ giá trị margin nào bạn muốn */
}
</style>
