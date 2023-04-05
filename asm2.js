jQuery(document).ready(function ($) {

    $('#checkbox').change(function(){
      setInterval(function () {
          moveRight();
      }, 3000);
    });
    
    var slideCount = $('.slider ul li').length;
    var slideWidth = $('.slider ul li').width();
    var slideHeight = $('.slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    
    $('.slider').css({ width: slideWidth, height: slideHeight });
    
    $('.slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
      $('.slider ul li:last-child').prependTo('.slider ul');
  
      function moveLeft() {
          $('.slider ul').animate({
              left: + slideWidth
          }, 200, function () {
              $('.slider ul li:last-child').prependTo('.slider ul');
              $('.slider ul').css('left', '');
          });
      };
  
      function moveRight() {
          $('.slider ul').animate({
              left: - slideWidth
          }, 200, function () {
              $('.slider ul li:first-child').appendTo('.slider ul');
              $('.slider ul').css('left', '');
          });
      };
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
          moveRight();
      });
  
  });    

//
$(function () {
    $(".sidebar-link").click(function () {
        $(".sidebar-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});

$(window)
    .resize(function () {
        if ($(window).width() > 1090) {
            $(".sidebar").removeClass("collapse");
        } else {
            $(".sidebar").addClass("collapse");
        }
    })
    .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
    v.addEventListener("mouseover", () => {
        const video = v.querySelector("video");
        video.play();
    });
    v.addEventListener("mouseleave", () => {
        const video = v.querySelector("video");
        video.pause();
    });
});

$(function () {
    $(".logo, .logo-expand, .discover").on("click", function (e) {
        $(".main-container").removeClass("show");
        $(".main-container").scrollTop(0);
    });
    $(".stream-area, .trending").on("click", function (e) {
        $(".main-container").addClass("show");
        //   $(".main-container").scrollTop(0);
        $(".sidebar-link").removeClass("is-active");
        $(".trending").addClass("is-active");

    });
     $(".continer, .playlist").on("click", function (e) {
        $(".main-container").addClass("show");
        //   $(".main-container").scrollTop(0);
        $(".sidebar-link").removeClass("is-active");
        $(".playlist").addClass("is-active");
    });
    $(".video").on("click", function () {
        var source = $(this).find("source").attr("src");
        var title = $(this).find(".video-name").text();
        var person = $(this).find(".video-by").text();
        var img = $(this).find(".author-img").attr("src");
        $(".video-stream video").stop();
        $(".video-stream source").attr("src", source);
        $(".video-stream video").load();
        $(".video-p-title").text(title);
        $(".video-p-name").text(person);
        $(".video-detail .author-img").attr("src", img);
    });
});
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () { addToCart(this); });
}

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    var sibs = [];
    var getImage;
    var getprice;
    var getproductName;
    var cart = [];
    var stringCart;
    //cycles siblings for product info near the add button
    while (elem = elem.previousSibling) {
        if (elem.nodeType === 4) continue; // text node
        if(elem.className == "imgg"){
            getImage = elem.src;
        }
        if (elem.className == "price") {
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        images : getImage,
        productname: getproductName,
        price: getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */

    if (!sessionStorage.getItem('cart')) {
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
        cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal() {
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var image = "";
    var productname = "";
    var carttable = "";
    if (sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++) {
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            image = x.images.replace("http://127.0.0.1:5500/","");
            //get property value of price
            price = parseFloat(x.price);
            productname = x.productname;
            //add price to total
            console.log(image);
            console.log(productname);
            carttable += "<tr><td><img src='" + image + "' style='width: 120px; height: 100px; border-radius: 20px; padding:10px'></td><td>" + productname + "</td></tr>";
            total += 1 * (price);
        }

    }
    //update total on website HTML
    // document.getElementById("total").innerHTML = total;
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    // document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
    var message = pname + " đã được thêm vào playlist";
    var alerts = document.getElementById("alerts");
    alerts.innerHTML = message;
    if (!alerts.classList.contains("message")) {
        alerts.classList.add("message");
    }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
        //clear message and remove class style
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "";
        if (alerts.classList.contains("message")) {
            alerts.classList.remove("message");
        }
    }
}