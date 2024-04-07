<template>
  <div class="library-container">
    <div class="container-fluid mt-5">
      <h1 class="text-center mb-4" style="color: aliceblue;">Thư Viện Sách</h1>
      <div class="row">
        <!-- Form tìm kiếm sách -->
        <div class="col-md-12 mb-4">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Tìm kiếm sách" v-model="searchTerm">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="searchBooks">Tìm kiếm</button>
            </div>
          </div>
        </div>
        <!-- Kết thúc Form tìm kiếm sách -->

        <!-- Danh sách sách -->
        <div class="col-md-3 mb-4" v-for="(book, index) in paginatedBooks" :key="index"> 
          
          <div class="card h-100">
            <img :src="book.hinhanh" width="220px" height="300px" class="card-img-top" alt="Ảnh bìa sách">
            <hr>
            <div class="card-body" style="text-align: center;">
              <h5 class="card-title">{{ book.tensach }}</h5>
              <p class="card-text">Tác giả: {{ book.tacgia }}</p>
              <p class="card-text">Giá: {{ book.dongia }} đồng</p>
              
              <button class="btn btn-primary" @click="goToAddMuonsach(book._id)">Mượn</button>
            </div>
          </div>
        </div>
        <!-- Kết thúc Danh sách sách -->
      </div>
      <div class="pagination justify-content-center mt-4">
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" class="btn btn-outline-primary">{{ pageNumber }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";
export default {
  data() {
    return {
      books: [],
      itemsPerPage: 8, // Số lượng sách trên mỗi trang
      currentPage: 1, // Trang hiện tại
      searchTerm: '' // Từ khóa tìm kiếm
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
  },
  methods: {
    logBookId(book) {
    console.log(book._id);
  },
    async retrieveBooks() {
      try {
        const allBooks = await ContactService.getAll(); // Lấy tất cả sách
        if (this.searchTerm.trim() === '') {
          // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sách
          this.books = allBooks;
        } else {
          // Chuyển đổi dữ liệu thành chuỗi JSON và tìm kiếm trên chuỗi
          const searchTermLowerCase = this.searchTerm.trim().toLowerCase();
      this.books = allBooks.filter(book => book.tensach.toLowerCase().includes(searchTermLowerCase));
        }
      } catch (error) {
        console.log(error);
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      // this.retrieveBooks();
    },
    async searchBooks() {
      try {
        await this.retrieveBooks();
      } catch (error) {
        console.log(error);
      }
    },
    goToAddMuonsach(_id) {
      if(localStorage.getItem("loggedIn")==="true"){
        localStorage.setItem("masach",_id);
        this.$router.push({ name: "muonsach.add" });
      }
      else{
        alert("Bạn chưa đăng nhập, hãy đăng nhập!!");
        this.$router.push({ name: "dangnhap" });
      }
    },
  },
  mounted() {
    this.retrieveBooks();
  },
};
</script>

<style>
.library-container {
  background-image: url('https://res.cloudinary.com/dopc4arla/image/upload/v1711115927/web%20vue/blurred-bookshelf-many-old-books-book-shop-library_327072-7345_aao39c.jpg');
  background-size: cover;
  background-position: center;
  padding: 50px 0;
  max-width: 100%;
}

.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.container-fluid {
  padding: 0;
}

.row {
  margin: 0 auto !important;
  max-width: 100% !important; /* Thay đổi giá trị max-width */
  flex-wrap: wrap !important;
  align-items: flex-start; /* Căn trên cùng của container */
}

.container-fluid {
  padding: 0;
  max-width: 100% !important; /* Thay đổi giá trị max-width */
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
</style>
