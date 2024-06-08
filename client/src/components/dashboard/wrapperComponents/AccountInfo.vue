<template>
    <div class="myaccount-content">
      <h3 class="text-xl font-semibold">Account Details</h3>
      <div class="account-details-form">
        <form action="#">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full lg:w-1/2 px-2">
              <div class="single-input-item">
                <label for="first-name" class="required">First Name</label>
                <input type="text" id="first-name" class="w-full p-2 border rounded" placeholder="First Name">
              </div>
            </div>
            <div class="w-full lg:w-1/2 px-2">
              <div class="single-input-item">
                <label for="last-name" class="required">Last Name</label>
                <input type="text" id="last-name" class="w-full p-2 border rounded" placeholder="Last Name">
              </div>
            </div>
          </div>
          <div class="single-input-item">
            <label for="display-name" class="required">Display Name</label>
            <input type="text" id="display-name" class="w-full p-2 border rounded" placeholder="Display Name">
          </div>
          <div class="single-input-item">
            <label for="email" class="required">Email Address</label>
            <input type="email" id="email" class="w-full p-2 border rounded" placeholder="Email Address">
          </div>
          <fieldset>
            <legend class="text-lg font-semibold">Password change</legend>
            <div class="single-input-item">
              <label for="current-pwd" class="required">Current Password</label>
              <input type="password" id="current-pwd" class="w-full p-2 border rounded" placeholder="Current Password">
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full lg:w-1/2 px-2">
                <div class="single-input-item">
                  <label for="new-pwd" class="required">New Password</label>
                  <input type="password" id="new-pwd" class="w-full p-2 border rounded" placeholder="New Password">
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-2">
                <div class="single-input-item">
                  <label for="confirm-pwd" class="required">Confirm Password</label>
                  <input type="password" id="confirm-pwd" class="w-full p-2 border rounded" placeholder="Confirm Password">
                </div>
              </div>
            </div>
          </fieldset>
          <div class="single-input-item">
            <button class="btn btn__bg">Save Changes</button>
          </div>
        </form>
      </div>
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
  
  .account-details-form {
    margin-top: 16px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  fieldset {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  legend {
    padding: 0 8px;
    font-weight: 600;
  }
  
  .btn {
    background-color: #1d4ed8;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .btn:hover {
    background-color: #2563eb;
  }
  </style>
  