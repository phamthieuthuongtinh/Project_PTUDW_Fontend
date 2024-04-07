<template>
    <div class="about">
      <h1>Liên Hệ Với Chúng Tôi</h1>
      <p>Nếu bạn có bất kỳ câu hỏi hoặc ý kiến nào, hãy liên hệ với chúng tôi bằng cách điền vào biểu mẫu dưới đây. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể!</p>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Họ và Tên:</label>
          <input type="text" class="form-control" id="name" v-model="formData.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="message">Nội dung:</label>
          <textarea class="form-control" id="message" rows="5" v-model="formData.message" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Gửi</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm() {
        console.log('Dữ liệu form đã được gửi:', this.formData);
        this.formData = {
          name: '',
          email: '',
          message: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .about {
    text-align: justify;
    margin-top: 50px;
  }
  .about h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .about p {
    font-size: 18px;
    line-height: 1.6;
  }
  .about form {
    margin-top: 20px;
  }
  </style>
  