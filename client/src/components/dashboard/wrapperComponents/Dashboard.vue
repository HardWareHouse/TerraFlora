<template>
    <div class="myaccount-content">
      <h3 class="text-xl font-semibold">Dashboard</h3>
      <div class="welcome">
        <p>Hello, <strong>Erik Jhonson</strong> (If Not <strong>Jhonson</strong>! 
          <a href="login-register.html" class="text-blue-500 underline">Logout</a>
        </p>
      </div>
      <p class="mb-0">
        From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
      </p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .myaccount-content {
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .welcome {
    margin-bottom: 16px;
  }
  
  .welcome p {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  a {
    color: #1d4ed8;
    text-decoration: underline;
  }
  
  a:hover {
    color: #2563eb;
  }
  </style>
  