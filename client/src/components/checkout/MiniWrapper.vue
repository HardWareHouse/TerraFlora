<template>
  <div>
    <div class="w-3/4 mx-auto mt-5 mb-3">
      <h3
        class="bg-gray-100 border-t-4 border-red-600 text-gray-900 text-sm font-medium uppercase py-3 pl-3"
      >
        Returning Customer?
        <span
          class="text-red-600 cursor-pointer transition duration-400 ml-2"
          @click="toggleLoginAccordion"
          >Click Here To Login</span
        >
      </h3>
      <div
        id="logInaccordion"
        v-show="showLoginAccordion"
        class="border-t border-gray-300 p-4"
      >
        <div>
          <p class="mb-4">
            If you have shopped with us before, please enter your details in the
            boxes below. If you are a new customer, please proceed to the
            Billing &amp; Shipping section.
          </p>
          <div class="mt-5">
            <div class="flex justify-center">
              <div class="w-full max-w-lg">
                <form action="#" method="post">
                  <div class="space-y-4">
                    <div class="">
                      <input
                        type="email"
                        class="w-full p-3 bg-gray-200 border border-gray-300 rounded"
                        placeholder="Enter your Email"
                        required
                      />
                    </div>
                    <div class="">
                      <input
                        type="password"
                        class="w-full p-3 bg-gray-200 border border-gray-300 rounded"
                        placeholder="Enter your Password"
                        required
                      />
                    </div>
                  </div>

                  <div class="mt-4">
                    <div class="flex justify-between items-center">
                      <div>
                        <label class="inline-flex items-center">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            class="border-gray-300"
                          />
                          <span class="ml-2">Remember Me</span>
                        </label>
                      </div>
                      <a href="#" class="text-red-600 text-xs"
                        >Forget Password?</a
                      >
                    </div>
                  </div>

                  <div class="mt-4">
                    <button class="bg-red-600 text-white py-2 px-4 rounded">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-3/4 mx-auto">
      <h3
        class="bg-gray-100 border-t-4 border-red-600 text-gray-900 text-sm font-medium uppercase py-3 pl-3"
      >
        Have A Coupon?
        <span
          class="text-red-600 cursor-pointer transition duration-400 ml-2"
          @click="toggleCouponAccordion"
          >Click Here To Enter Your Code</span
        >
      </h3>
      <div
        id="couponaccordion"
        v-show="showCouponAccordion"
        class="border-t border-gray-300 p-4"
      >
        <div class="">
          <div>
            <div>
              <form action="#" method="post" class="block md:flex">
                <input
                  type="text"
                  class="p-3 bg-gray-200 border border-gray-300 rounded w-full md:w-auto mb-3 md:mb-0 md:mr-4 text-sm"
                  placeholder="Enter Your Coupon Code"
                  required
                />
                <button class="bg-red-600 text-white rounded px-3 h-14">
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showLoginAccordion = ref(false);
const showCouponAccordion = ref(false);
const showDropdown = ref(false);

function toggleLoginAccordion() {
  showLoginAccordion.value = !showLoginAccordion.value;
}

function toggleCouponAccordion() {
  showCouponAccordion.value = !showCouponAccordion.value;
}
</script>
