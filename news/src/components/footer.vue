<template>
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <p>&copy; 2024 My Website</p>
        </div>
        <div class="col-md-6 text-md-end">
          <a href="#" class="mr-3">Privacy Policy</a>
          <a href="#" class="mr-3">Terms of Use</a>
          <a href="#" class="mr-3">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  color: #333;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
}
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: auto;
  position: relative;
  align-items: center;
}
.footer a {
  color: #333;
  text-decoration: none;
}

.footer a:hover {
  color: #666;
}
</style>
