<template>
  <div class="checkoutaccordion" id="checkOutAccordion">
    <div class="card">
      <h3
        class="bg-gray-200 border-t-3 border-red-600 text-gray-900 text-sm font-medium uppercase"
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
        <div class="card-body">
          <p class="mb-4">
            If you have shopped with us before, please enter your details in the
            boxes below. If you are a new customer, please proceed to the
            Billing &amp; Shipping section.
          </p>
          <div class="login-reg-form-wrap mt-5">
            <div class="flex justify-center">
              <div class="w-full max-w-lg">
                <form action="#" method="post">
                  <div class="space-y-4">
                    <div class="single-input-item">
                      <input
                        type="email"
                        class="w-full p-3 bg-gray-200 border border-gray-300 rounded"
                        placeholder="Enter your Email"
                        required
                      />
                    </div>
                    <div class="single-input-item">
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

                  <div class="single-input-item mt-4">
                    <button
                      class="btn btn__bg bg-red-600 text-white py-2 px-4 rounded"
                    >
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

    <div class="card">
      <h3
        class="bg-gray-200 border-t-3 border-red-600 text-gray-900 text-sm font-medium uppercase"
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
        <div class="card-body">
          <div class="cart-update-option">
            <div class="apply-coupon-wrapper">
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

<script>
export default {
  data() {
    return {
      showLoginAccordion: false,
      showCouponAccordion: false,
      showDropdown: false,
    };
  },
  methods: {
    toggleLoginAccordion() {
      this.showLoginAccordion = !this.showLoginAccordion;
    },
    toggleCouponAccordion() {
      this.showCouponAccordion = !this.showCouponAccordion;
    },
  },
};
</script>
<style scoped>
/* Checkout Login Coupon Accordion Start */
.checkout-page-wrapper {
  margin-bottom: -8px;
}

@media only screen and (min-width: 768px) and (max-width: 991.98px),
  only screen and (max-width: 767.98px) {
  .checkout-page-wrapper {
    margin-bottom: 0;
  }
}

.checkoutaccordion {
  margin-bottom: 46px;
}

.checkoutaccordion h3 {
  background-color: #f7f7f7;
  border-top: 3px solid #cc2121;
  color: #111;
  font-size: 14px;
  font-weight: 500;
  padding: 15px 20px;
  position: relative;
  text-transform: uppercase;
}

.checkoutaccordion h3 span {
  color: #cc2121;
  cursor: pointer;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  margin-left: 10px;
}

@media only screen and (max-width: 479.98px) {
  .checkoutaccordion h3 span {
    display: block;
    padding-top: 5px;
    margin-left: 0;
  }
}

.checkoutaccordion h3 span:hover {
  color: #111;
}

@media only screen and (max-width: 479.98px) {
  .checkoutaccordion h3 {
    font-size: 14px;
  }
}

.checkoutaccordion .card {
  border: none;
  padding: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  margin-bottom: 30px;
  width: 80%;
  margin: 2rem auto;
}

.checkoutaccordion .card:last-child {
  margin-bottom: 0;
}

.checkoutaccordion .card .card-body {
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 20px;
}

.checkoutaccordion .card .card-body .cart-update-option {
  border: none;
  padding: 0;
}

.checkoutaccordion
  .card
  .card-body
  .cart-update-option
  .apply-coupon-wrapper
  input {
  padding: 12px 10px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  margin-right: 15px;
}

@media only screen and (max-width: 479.98px) {
  .checkoutaccordion
    .card
    .card-body
    .cart-update-option
    .apply-coupon-wrapper
    input {
    margin-bottom: 15px;
  }
}

.checkout-box-wrap .custom-control {
  padding-left: 0;
  margin-left: 1.5rem;
}

.checkout-billing-details-wrap h2 {
  color: #111;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-weight: 500;
}

@media only screen and (max-width: 767.98px) {
  .checkout-billing-details-wrap h2 {
    margin-bottom: 26px;
  }
}

.checkout-billing-details-wrap .billing-form-wrap {
  margin-top: -20px;
}

.forget-pwd {
  color: #cc2121;
  font-size: 12px;
  margin-top: -6px;
}

.single-form-row {
  margin-top: 15px;
  display: none;
}

.single-form-row p {
  margin: 0;
  font-size: 14px;
}

@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .order-summary-details {
    margin-top: 70px;
  }
}

@media only screen and (max-width: 767.98px) {
  .order-summary-details {
    margin-top: 52px;
  }
}

.order-summary-details h2 {
  color: #111;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-weight: 500;
}

.order-summary-table {
  background-color: #f7f7f7;
  margin-top: 34px;
}

.order-summary-table .table,
.order-summary-table table {
  color: #111;
  margin-bottom: 0;
  font-size: 15px;
  white-space: nowrap;
}

.order-summary-table .table tr td,
.order-summary-table .table tr th,
.order-summary-table table tr td,
.order-summary-table table tr th {
  font-weight: 400;
  vertical-align: middle;
  padding: 15px 10px;
  border-width: 1px;
}

.order-summary-table .table tr td a,
.order-summary-table .table tr th a,
.order-summary-table table tr td a,
.order-summary-table table tr th a {
  color: #111;
  font-weight: 400;
}

.order-summary-table .table tr td strong,
.order-summary-table .table tr th strong,
.order-summary-table table tr td strong,
.order-summary-table table tr th strong {
  font-weight: 500;
}

.order-summary-table .shipping-type {
  text-align: left;
}

.order-summary-table .shipping-type li {
  margin-bottom: 5px;
}

.order-summary-table .shipping-type li:last-child {
  margin-bottom: 0;
}

.order-payment-method {
  background-color: #f7f7f7;
  padding: 40px 20px 30px;
}

@media only screen and (min-width: 768px) and (max-width: 991.98px),
  only screen and (max-width: 767.98px) {
  .order-payment-method {
    padding: 32px 20px 36px;
  }
}

.single-payment-method {
  margin-bottom: 20px;
}

.single-payment-method:last-child {
  margin-bottom: 0;
}

.single-payment-method:first-child .payment-method-details {
  display: block;
}

.single-payment-method label,
.single-payment-method .custom-control-label {
  font-weight: 500;
}

.single-payment-method .paypal-card {
  max-width: 150px;
  height: 50px;
  margin-top: 10px;
  display: block;
}

.single-payment-method .payment-method-details {
  background-color: #f1f1f1;
  color: #111;
  font-weight: 400;
  font-size: 13px;
  padding: 10px;
  position: relative;
  margin-top: 20px;
  display: none;
}

.single-payment-method .payment-method-details:after {
  content: "";
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #f1f1f1;
  bottom: 100%;
}

.single-payment-method .payment-method-details * {
  margin: 0;
}

.summary-footer-area .btn-brand {
  margin-top: 40px;
}

/*------- input box style css start -------*/
.single-input-item {
  margin-top: 20px;
}

.single-input-item label {
  color: #111;
  text-transform: capitalize;
  font-size: 14px;
}

.single-input-item label.required:after {
  content: "*";
  color: red;
  font-size: 14px;
  margin-left: 3px;
  margin-top: 5px;
}

.single-input-item input,
.single-input-item textarea {
  color: #555;
  border: 1px solid #ccc;
  padding: 12px 10px;
  width: 100%;
  font-size: 14px;
  background: #f7f7f7;
}

.single-input-item input:active,
.single-input-item input:focus,
.single-input-item textarea:active,
.single-input-item textarea:focus {
  border-color: #cc2121;
  background-color: #fff;
}

.single-input-item .nice-select {
  width: 100%;
  border-radius: 0;
  height: 48px;
  border-color: #ccc;
  background-color: #f7f7f7;
}

.single-input-item .nice-select .current {
  color: #555;
}

.single-input-item .nice-select .list {
  max-height: 200px;
  overflow: auto;
  width: 100%;
}
</style>
