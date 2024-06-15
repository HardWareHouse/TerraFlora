<!-- Reviews start -->
<template>
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
                  fringilla augue nec est tristique auctor. Ipsum metus feugiat
                  sem, quis fermentum turpis eros eget velit. Donec ac tempus
                  ante. Fusce ultricies massa massa. Fusce aliquam, purus eget
                  sagittis vulputate, sapien libero hendrerit est, sed commodo
                  augue nisi non neque.Cras neque metus, consequat et blandit
                  et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet
                  ligula euismod eget. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Nam
                  erat mi, rutrum at sollicitudin rhoncus
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
                      Aliquam fringilla euismod risus ac bibendum. Sed sit amet
                      sem varius ante feugiat lacinia. Nunc ipsum nulla,
                      vulputate ut venenatis vitae, malesuada ut mi. Quisque
                      iaculis, dui congue placerat pretium, augue erat accumsan
                      lacus
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
  <!-- Reviews end -->
</template>
<style scoped>
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
</style>
