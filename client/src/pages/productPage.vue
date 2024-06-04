<script setup>
import { ref, onMounted } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

onMounted(() => {
  const tabTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tab"]')
  );
  tabTriggerList.forEach((tabTriggerEl) => {
    tabTriggerEl.addEventListener("click", (event) => {
      event.preventDefault();
      new bootstrap.Tab(tabTriggerEl).show();
    });
  });
});
const images = [
  {
    src: "https://webshop.plnts.com/media/catalog/product/cache/aa5d334f459227518b6c3cf7ea9d29ed/p/l/pl.xxl.002_-_monstera_pertusum-vierkant.jpg",
    alt: "Image 1",
  },
  {
    src: "https://fr-fr.bakker.com/cdn/shop/files/VIS_018129_2_BK_1705411406384.jpg?v=1705411425",
    alt: "Image 2",
  },
  {
    src: "https://www.picturethisai.com/wiki-image/1080/347088479137988608.jpeg",
    alt: "Image 3",
  },
];

// Define a reactive state for quantity
const quantity = ref(1);

// Method to handle incrementing the quantity
const incrementQuantity = () => {
  quantity.value += 1;
};

// Method to handle decrementing the quantity
const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};
</script>

<template>
  <div id="productPage">
    <div class="flex mt-16 ml-10">
      <Carousel>
        <Slide v-for="image in images" :key="image.alt">
          <img class="carousel__item" :src="image.src" :alt="image.alt" />
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <div class="flex flex-col text-center mx-auto">
        <h2 class="text-4xl font-thin mb-4">Monstera</h2>
        <div class="ratings flex mx-auto align-items-center mb-3">
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <div class="pro-review">
            <span class="text-xs text-gray-600 ml-1">1 Reviews</span>
          </div>
        </div>
        <p class="w-5/6 mx-auto text-gray-700 text-center">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. Phasellus id nisi quis justo tempus mollis sed et
          dui. In hac habitasse platea dictumst.
        </p>
        <div class="quantity-cart-box flex items-center mx-auto mt-8">
          <h5 class="mr-2">Quantity:</h5>
          <div class="quantity mr-2">
            <div class="pro-qty">
              <span class="dec qtybtn" @click="decrementQuantity">-</span>
              <input type="text" :value="quantity" readonly />
              <span class="inc qtybtn" @click="incrementQuantity">+</span>
            </div>
          </div>
          <div class="action_link">
            <a
              class="btn btn-cart2 bg-red-700 px-4 py-3 rounded text-white text-center"
              href="#"
              >Add to cart</a
            >
          </div>
        </div>
        <div class="useful-links flex mx-auto mt-5 p-5">
          <div class="flex items-center space-x-2 mr-4">
            <a
              href="#"
              data-bs-toggle="tooltip"
              data-bs-original-title="Compare"
              class="flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <p class="text-sm">Compare</p>
            </a>
          </div>
          <div class="flex items-center space-x-2">
            <a
              href="#"
              data-bs-toggle="tooltip"
              data-bs-original-title="Wishlist"
              class="flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <p class="text-sm">Wishlist</p>
            </a>
          </div>
        </div>
        <div class="like-icon">
          <a class="facebook" href="#"><i class="bi bi-facebook"></i>like</a>
          <a class="twitter" href="#"><i class="bi bi-twitter-x"></i>tweet</a>
          <a class="pinterest" href="#"><i class="bi bi-pinterest"></i>save</a>
        </div>
      </div>
    </div>
    <div class="product-details-reviews section-space pb-0 mx-24 my-10">
      <div class="row">
        <div class="col-lg-12">
          <div class="product-review-info">
            <ul class="nav review-tab">
              <li>
                <a class="active" data-bs-toggle="tab" href="#tab_one"
                  >description</a
                >
              </li>
              <li>
                <a data-bs-toggle="tab" href="#tab_two">information</a>
              </li>
              <li>
                <a data-bs-toggle="tab" href="#tab_three">reviews (1)</a>
              </li>
            </ul>
            <div class="tab-content reviews-tab">
              <div class="tab-pane fade show active" id="tab_one">
                <div class="tab-one">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    fringilla augue nec est tristique auctor. Ipsum metus
                    feugiat sem, quis fermentum turpis eros eget velit. Donec ac
                    tempus ante. Fusce ultricies massa massa. Fusce aliquam,
                    purus eget sagittis vulputate, sapien libero hendrerit est,
                    sed commodo augue nisi non neque.Cras neque metus, consequat
                    et blandit et, luctus a nunc. Etiam gravida vehicula tellus,
                    in imperdiet ligula euismod eget. Pellentesque habitant
                    morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus
                  </p>
                </div>
              </div>
              <div class="tab-pane fade" id="tab_two">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>color</td>
                      <td>black, blue, red</td>
                    </tr>
                    <tr>
                      <td>size</td>
                      <td>L, M, S</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="tab_three">
                <form action="#" class="review-form">
                  <h5>1 review for <span>Chaz Kangeroo</span></h5>
                  <div class="total-reviews">
                    <div class="rev-avatar">
                      <img src="" alt="" />
                    </div>
                    <div class="review-box">
                      <div class="ratings">
                        <span class="good"><i class="fa fa-star"></i></span>
                        <span class="good"><i class="fa fa-star"></i></span>
                        <span class="good"><i class="fa fa-star"></i></span>
                        <span class="good"><i class="fa fa-star"></i></span>
                        <span><i class="fa fa-star"></i></span>
                      </div>
                      <div class="post-author">
                        <p><span>admin -</span> 30 Mar, 2023</p>
                      </div>
                      <p>
                        Aliquam fringilla euismod risus ac bibendum. Sed sit
                        amet sem varius ante feugiat lacinia. Nunc ipsum nulla,
                        vulputate ut venenatis vitae, malesuada ut mi. Quisque
                        iaculis, dui congue placerat pretium, augue erat
                        accumsan lacus
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col">
                      <label class="col-form-label"
                        ><span class="text-danger">*</span> Your Name</label
                      >
                      <input type="text" class="form-control" required />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col">
                      <label class="col-form-label"
                        ><span class="text-danger">*</span> Your Email</label
                      >
                      <input type="email" class="form-control" required />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col">
                      <label class="col-form-label"
                        ><span class="text-danger">*</span> Your Review</label
                      >
                      <textarea class="form-control" required></textarea>
                      <div class="help-block pt-10">
                        <span class="text-danger">Note:</span>
                        HTML is not translated!
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col">
                      <label class="col-form-label"
                        ><span class="text-danger">*</span> Rating</label
                      >
                      &nbsp;&nbsp;&nbsp; Bad&nbsp;
                      <input type="radio" value="1" name="rating" />
                      &nbsp;
                      <input type="radio" value="2" name="rating" />
                      &nbsp;
                      <input type="radio" value="3" name="rating" />
                      &nbsp;
                      <input type="radio" value="4" name="rating" />
                      &nbsp;
                      <input type="radio" value="5" name="rating" checked />
                      &nbsp;Good
                    </div>
                  </div>
                  <div class="buttons">
                    <button class="sqr-btn" type="submit">Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-3xl font-thin mb-4 text-center">Related Products</h2>
    <Carousel :items-to-show="2.5" :wrap-around="true" class="mx-auto">
      <Slide v-for="image in images" :key="image.alt" class="m-5">
        <div class="flex flex-col">
          <h5>{{ image.alt }}</h5>
          <img class="carousel__item" :src="image.src" :alt="image.alt" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.carousel {
  width: 66%;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity .pro-qty {
  width: 90px;
  height: 40px;
  border: 1px solid #ddd;
  padding: 0 15px;
  border-radius: 4px;
  float: left;
}

.quantity .pro-qty .qtybtn {
  width: 15px;
  display: block;
  float: left;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  color: #555;
}

.quantity .pro-qty input {
  width: 28px;
  float: left;
  border: none;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  background-color: transparent;
}

.product-review-info .nav.review-tab li a {
  color: #fff;
  display: block;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;
  padding: 8px 10px;
  border: 1px solid #ebebeb;
  border-bottom: none;
  background-color: #979898;
}

.product-review-info .nav.review-tab li a:hover,
.product-review-info .nav.review-tab li a.active {
  color: #555;
  background-color: #fff;
}

@media only screen and (max-width: 479.98px) {
  .product-review-info .nav.review-tab li a {
    font-size: 12px;
    padding: 8px 8px;
  }
}

.product-review-info .tab-content.reviews-tab {
  border: 1px solid #ebebeb;
  padding: 15px 20px 20px;
}

.product-review-info .tab-content.reviews-tab .table {
  margin-bottom: 0;
}

.product-review-info .tab-content.reviews-tab .table tr {
  text-transform: capitalize;
}

.product-review-info .tab-content .review-description {
  padding-top: 25px;
  padding-bottom: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .product-review-info .tab-content .review-description {
    padding: 15px 0;
  }
}

@media only screen and (max-width: 767.98px) {
  .product-review-info .tab-content .review-description {
    display: block;
  }
}

.product-review-info .tab-content .review-description .tab-thumb {
  -webkit-flex-basis: 300px;
  -ms-flex-preferred-size: 300px;
  flex-basis: 300px;
}

@media only screen and (max-width: 767.98px) {
  .product-review-info .tab-content .review-description .tab-thumb {
    -webkit-flex-basis: 220px;
    -ms-flex-preferred-size: 220px;
    flex-basis: 220px;
  }
}

.product-review-info .tab-content .review-description .tab-des {
  padding-left: 40px;
  -webkit-flex-basis: calc(100% - 300px);
  -ms-flex-preferred-size: calc(100% - 300px);
  flex-basis: calc(100% - 300px);
}

@media only screen and (max-width: 767.98px) {
  .product-review-info .tab-content .review-description .tab-des {
    padding-left: 14px;
    -webkit-flex-basis: calc(100% - 220px);
    -ms-flex-preferred-size: calc(100% - 220px);
    flex-basis: calc(100% - 220px);
  }
}

.product-review-info .tab-content .review-description .tab-des h3 {
  color: #cc2121;
  font-size: 20px;
  font-weight: 22px;
  font-weight: 700;
  text-transform: capitalize;
  padding-bottom: 10px;
}

.product-review-info .tab-content .review-description .tab-des ul li {
  font-size: 13px;
  list-style: inherit;
}

.review-form h5 {
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 20px;
  text-transform: capitalize;
}

@media only screen and (max-width: 575.98px) {
  .review-form h5 {
    font-size: 16px;
  }
}

.total-reviews {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 50px;
}

@media only screen and (max-width: 479.98px) {
  .total-reviews {
    display: block;
  }
}

.total-reviews .rev-avatar {
  -webkit-flex-basis: 60px;
  -ms-flex-preferred-size: 60px;
  flex-basis: 60px;
  max-height: 60px;
}

@media only screen and (max-width: 479.98px) {
  .total-reviews .rev-avatar {
    margin-bottom: 20px;
  }
}

.total-reviews .review-box {
  margin-left: 10px;
  border: 1px solid #ebebeb;
  padding: 10px;
  -webkit-flex-basis: calc(100% - 70px);
  -ms-flex-preferred-size: calc(100% - 70px);
  flex-basis: calc(100% - 70px);
}

@media only screen and (max-width: 479.98px) {
  .total-reviews .review-box {
    margin-left: 0;
  }
}

.total-reviews .review-box .post-author {
  padding-bottom: 10px;
}

.total-reviews .review-box .post-author p {
  font-size: 12px;
  font-style: italic;
  text-transform: capitalize;
}

.total-reviews .review-box .post-author p span {
  font-size: 13px;
}

.total-reviews .review-box p {
  font-size: 14px;
  font-style: italic;
}
.like-icon {
  padding-top: 20px;
  border-top: 1px solid #ebebeb;
}

.like-icon a {
  color: #fff;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  line-height: 22px;
  padding: 0 8px;
  margin-right: 6px;
  border-radius: 3px;
  text-transform: capitalize;
}

@media only screen and (max-width: 479.98px) {
  .like-icon a {
    margin-right: 0;
  }
}

.like-icon a i {
  padding-right: 5px;
}

.like-icon a.facebook {
  background-color: #3b5999;
}

.like-icon a.twitter {
  background-color: #1da1f2;
}

.like-icon a.pinterest {
  background-color: #cb2028;
}

.like-icon a.google {
  background-color: #fe6d4c;
}

.like-icon a:hover.facebook {
  background-color: #2d4474;
}

.like-icon a:hover.twitter {
  background-color: #0c85d0;
}

.like-icon a:hover.pinterest {
  background-color: #9f191f;
}

.like-icon a:hover.google {
  background-color: #fe4419;
}

.share-icon {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.share-icon h5 {
  color: #111;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  margin-right: 10px;
  text-transform: uppercase;
}

.share-icon a {
  color: #555;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  padding: 0 8px;
  margin-right: 5px;
}

@media only screen and (max-width: 479.98px) {
  .share-icon a {
    padding: 0 5px;
  }
}

.share-icon a:hover {
  color: #cc2121;
}
</style>
