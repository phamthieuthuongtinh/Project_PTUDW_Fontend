// authMiddleware.js

export default function (to, from, next) {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn || loggedIn !== "true") {
      next({ name: "dangnhap" }); // Chuyển hướng đến trang đăng nhập
    } else {
      next(); // Tiếp tục chuyển hướng đến trang tiếp theo
    }
  }
  