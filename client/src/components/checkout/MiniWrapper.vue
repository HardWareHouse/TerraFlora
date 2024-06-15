<template>
  <div class="checkoutaccordion" id="checkOutAccordion">
    <div class="card">
      <h3>
        Returning Customer?
        <span data-bs-toggle="collapse" data-bs-target="#logInaccordion"
          >Click Here To Login</span
        >
      </h3>
      <div
        id="logInaccordion"
        class="collapse"
        data-bs-parent="#checkOutAccordion"
      >
        <div class="card-body">
          <p>
            If you have shopped with us before, please enter your details in the
            boxes below. If you are a new customer, please proceed to the
            Billing &amp; Shipping section.
          </p>
          <div class="login-reg-form-wrap mt-20">
            <div class="row">
              <div class="col-lg-7 m-auto">
                <form action="#" method="post">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="single-input-item">
                        <input
                          type="email"
                          placeholder="Enter your Email"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="single-input-item">
                        <input
                          type="password"
                          placeholder="Enter your Password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="single-input-item">
                    <div
                      class="login-reg-form-meta d-flex align-items-center justify-content-between"
                    >
                      <div class="remember-meta">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="rememberMe"
                            required
                          />
                          <label class="custom-control-label" for="rememberMe"
                            >Remember Me</label
                          >
                        </div>
                      </div>

                      <a href="#" class="forget-pwd">Forget Password?</a>
                    </div>
                  </div>

                  <div class="single-input-item">
                    <button class="btn btn__bg">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>
        Have A Coupon?
        <span data-bs-toggle="collapse" data-bs-target="#couponaccordion"
          >Click Here To Enter Your Code</span
        >
      </h3>
      <div
        id="couponaccordion"
        class="collapse"
        data-bs-parent="#checkOutAccordion"
      >
        <div class="card-body">
          <div class="cart-update-option">
            <div class="apply-coupon-wrapper">
              <form action="#" method="post" class="d-block d-md-flex">
                <input
                  type="text"
                  placeholder="Enter Your Coupon Code"
                  required
                />
                <button class="btn btn__bg">Apply Coupon</button>
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
      showAccountCreate: false,
      showShipToDifferent: false,
      selectedPaymentMethod: null,
      showDropdown: false,
      paymentMethods: [
        { value: "creditcard", label: "Credit Card" },
        { value: "paypal", label: "PayPal" },
        // Add more payment methods here
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
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
