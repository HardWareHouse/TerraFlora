<script setup>
import { ref } from 'vue';

// Définition de l'état réactif avec ref
const activeTab = ref('dashboard');

// Définition de la méthode selectTab
const selectTab = (tab) => {
  activeTab.value = tab;
};
</script>
  
<template>
    <div class="my-account-wrapper py-8 pb-0">
      <div class="container mx-auto">
        <div class="bg-gray-100 p-4 rounded-lg">
          <div class="flex flex-wrap">
            <div class="w-full">
              <!-- My Account Page Start -->
              <div class="myaccount-page-wrapper">
                <!-- My Account Tab Menu Start -->
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-1/4 md:w-1/3">
                    <div class="myaccount-tab-menu flex flex-col space-y-2" role="tablist">
                      <a href="#dashboard" class="active py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('dashboard')" :class="{'bg-gray-200': activeTab === 'dashboard'}"><i class="fa fa-dashboard"></i> Dashboard</a>
                      <a href="#orders" class="py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('orders')" :class="{'bg-gray-200': activeTab === 'orders'}"><i class="fa fa-cart-arrow-down"></i> Orders</a>
                      <a href="#download" class="py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('download')" :class="{'bg-gray-200': activeTab === 'download'}"><i class="fa fa-cloud-download"></i> Download</a>
                      <a href="#payment-method" class="py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('payment-method')" :class="{'bg-gray-200': activeTab === 'payment-method'}"><i class="fa fa-credit-card"></i> Payment Method</a>
                      <a href="#address-edit" class="py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('address-edit')" :class="{'bg-gray-200': activeTab === 'address-edit'}"><i class="fa fa-map-marker"></i> Address</a>
                      <a href="#account-info" class="py-2 px-4 bg-white rounded-lg shadow-md" @click="selectTab('account-info')" :class="{'bg-gray-200': activeTab === 'account-info'}"><i class="fa fa-user"></i> Account Details</a>
                      <a href="login-register.html" class="py-2 px-4 bg-white rounded-lg shadow-md"><i class="fa fa-sign-out"></i> Logout</a>
                    </div>
                  </div>
                  <!-- My Account Tab Menu End -->
  
                  <!-- My Account Tab Content Start -->
                  <div class="w-full lg:w-3/4 md:w-2/3">
                    <div class="tab-content">
                      <div v-if="activeTab === 'dashboard'" class="tab-pane active show" id="dashboard">
                        <div class="myaccount-content">
                          <h3 class="text-xl font-semibold">Dashboard</h3>
                          <div class="welcome">
                            <p>Hello, <strong>Erik Jhonson</strong> (If Not <strong>Jhonson</strong>! <a href="login-register.html" class="text-blue-500 underline">Logout</a>)</p>
                          </div>
                          <p class="mb-0">From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                        </div>
                      </div>
  
                      <div v-if="activeTab === 'orders'" class="tab-pane fade" id="orders">
                        <div class="myaccount-content">
                          <h3 class="text-xl font-semibold">Orders</h3>
                          <div class="myaccount-table table-responsive text-center">
                            <table class="table-auto w-full">
                              <thead class="bg-gray-200">
                                <tr>
                                  <th class="px-4 py-2">Order</th>
                                  <th class="px-4 py-2">Date</th>
                                  <th class="px-4 py-2">Status</th>
                                  <th class="px-4 py-2">Total</th>
                                  <th class="px-4 py-2">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="border px-4 py-2">1</td>
                                  <td class="border px-4 py-2">Aug 22, 2023</td>
                                  <td class="border px-4 py-2">Pending</td>
                                  <td class="border px-4 py-2">$3000</td>
                                  <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
                                </tr>
                                <tr>
                                  <td class="border px-4 py-2">2</td>
                                  <td class="border px-4 py-2">July 22, 2023</td>
                                  <td class="border px-4 py-2">Approved</td>
                                  <td class="border px-4 py-2">$200</td>
                                  <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
                                </tr>
                                <tr>
                                  <td class="border px-4 py-2">3</td>
                                  <td class="border px-4 py-2">June 12, 2023</td>
                                  <td class="border px-4 py-2">On Hold</td>
                                  <td class="border px-4 py-2">$990</td>
                                  <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
  
                      <div v-if="activeTab === 'download'" class="tab-pane fade" id="download">
                        <div class="myaccount-content">
                          <h3 class="text-xl font-semibold">Downloads</h3>
                          <div class="myaccount-table table-responsive text-center">
                            <table class="table-auto w-full">
                              <thead class="bg-gray-200">
                                <tr>
                                  <th class="px-4 py-2">Product</th>
                                  <th class="px-4 py-2">Date</th>
                                  <th class="px-4 py-2">Expire</th>
                                  <th class="px-4 py-2">Download</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="border px-4 py-2">Flowers daisy pink stick</td>
                                  <td class="border px-4 py-2">Aug 22, 2023</td>
                                  <td class="border px-4 py-2">Yes</td>
                                  <td class="border px-4 py-2"><a href="#" class="btn btn__bg"><i class="fa fa-cloud-download"></i> Download File</a></td>
                                </tr>
                                <tr>
                                  <td class="border px-4 py-2">Orchid flower red stick</td>
                                  <td class="border px-4 py-2">Sep 12, 2023</td>
                                  <td class="border px-4 py-2">Never</td>
                                  <td class="border px-4 py-2"><a href="#" class="btn btn__bg"><i class="fa fa-cloud-download"></i> Download File</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
  
                      <div v-if="activeTab === 'payment-method'" class="tab-pane fade" id="payment-method">
                        <div class="myaccount-content">
                          <h3 class="text-xl font-semibold">Payment Method</h3>
                          <p class="saved-message">You Can't Save Your Payment Method yet.</p>
                        </div>
                      </div>
  
                      <div v-if="activeTab === 'address-edit'" class="tab-pane fade" id="address-edit">
                        <div class="myaccount-content">
                          <h3 class="text-xl font-semibold">Billing Address</h3>
                          <address>
                            <p><strong>Erik Jhonson</strong></p>
                            <p>1355 Market St, Suite 900 <br> San Francisco, CA 94103</p>
                            <p>Mobile: (123) 456-7890</p>
                          </address>
                          <a href="#" class="btn btn__bg"><i class="fa fa-edit"></i> Edit Address</a>
                        </div>
                      </div>
  
                      <div v-if="activeTab === 'account-info'" class="tab-pane fade" id="account-info">
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
                      </div>
                    </div>
                  </div> <!-- My Account Tab Content End -->
                </div>
              </div> <!-- My Account Page End -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

  
<style scoped>
</style>
  
