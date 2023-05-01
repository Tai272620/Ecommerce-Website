window.onload = function () {
    const bar = document.getElementById("bar");
    const close = document.getElementById("close");
    const nav = document.getElementById("navbar");

    if (bar) {
        bar.addEventListener("click", () => {
            nav.classList.add("active");
        });
    }

    if (close) {
        close.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // product-one
    let product0ne = document.querySelector(".product-one");
    // console.log(product0ne);
    async function fetchProduct1(url) {
        let data = await fetch(url);
        let response = await data.json();

        for (let i = 0; i < response.length; i++) {
            product0ne.innerHTML += `
            <div class="pro">
                <img src="${response[i].image}" alt="" />
                <div class="des">
                    <span>${response[i].title}</span>
                    <h5>${response[i].description}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${response[i].price}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
            </div>
            `;
        }
    }
    fetchProduct1("http://localhost:3000/product1");

    // product-two
    let productTwo = document.querySelector(".product-two");
    // console.log(productTwo);
    async function fetchProduct2(url) {
        let data = await fetch(url);
        let response = await data.json();

        for (let i = 0; i < response.length; i++) {
            productTwo.innerHTML += `
                <div class="pro">
                    <img src="${response[i].image}" alt="" />
                    <div class="des">
                        <span>${response[i].title}</span>
                        <h5>${response[i].description}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>$78</h4>
                    </div>
                    <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                </div>
                `;
        }
    }
    fetchProduct2("http://localhost:3000/product2");

    // product-three
    let productThree = document.querySelector(".product-three");
    // console.log(productThree);
    async function fetchProduct3(url) {
        let data = await fetch(url);
        let response = await data.json();

        for (let i = 0; i < response.length; i++) {
            productThree.innerHTML += `
            <div class="pro" onclick="handle(${response[i].id})">
                <img src="${response[i].image}" alt="" />
                <div class="des">
                    <span>${response[i].title}</span>
                    <h5>${response[i].description}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${response[i].price}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
            </div>
            `;
        }
    }
    fetchProduct3("http://localhost:3000/product3");

    let prodetails = document.querySelector("#prodetails");

    async function fetchProduct4(url) {
        let data = await fetch(url);
        let response = await data.json();
        for (let i = 0; i < response.length; i++) {
            let search = basket.find((x) => x.id === response[i].id) || [];
            if (response[i].id == localStorage.getItem("keyid")) {
                prodetails.innerHTML += `
                    <div class="single-pro-image" id="single-pro-image">
                        <img src="${response[i].image}" width="100%" id="MainImg" alt="" class="MainImg">
                    </div>
                    <div class="single-pro-details" id="single-pro-details">
                        <h6>Home / T-Shirt</h6>
                        <h4 id="productName">${response[i].description}</h4>
                        <h2 id="productPrice">${response[i].price}</h2>
                        <select>
                            <option id="size">S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select>
                        <div class="buttons">
                            <i class="bi bi-dash-lg" onclick="decrement(${response[i].id})"></i>
                            <div id=${response[i].id} class="quantity">
                                ${search.n === undefined ? 0 : search.n}
                            </div>
                            <i class="bi bi-plus-lg" onclick="increment(${response[i].id})"></i>
                        </div>
                
                        <button class="normal" onclick="handleButton(${response[i].id})">Add To Cart</button>
                        <h4>Product Details</h4>
                        <span>A 100% cotton T-shirt that has been washed for a rough finish. Contrasting color block design.</span>
                    </div>
                    `;
                const addToCartBtn = document.querySelector(".single-pro-details .normal");
                addToCartBtn.addEventListener("click", function () {
                    let popup = document.getElementById("popup");
                    popup.classList.add("open-popup");
                })
            }
        };
    };
    fetchProduct4("http://localhost:3000/product3");


});
function handle(id) {
    // console.log(id);
    window.location.href = "sproduct.html";
    localStorage.setItem("keyid", id);
}

function handleButton(id) {
    // console.log(id);
    localStorage.setItem("productId", id);
}
let basket = JSON.parse(localStorage.getItem("items")) || [];

function increment(id) {
    // console.log(id);

    // console.log(JSON.parse(localStorage.getItem("items")));
    // console.log(basket)
    let search = basket.find((x) => x.id === id);
    // console.log(search);
    let productName = document.getElementById("productName");
    let productPrice = document.getElementById("productPrice");

    // console.log(productPrice.innerHTML.slice(1))
    // parseInt(productPrice.innerHTML.slice(1))
    // console.log(parseInt(productPrice.innerHTML.slice(1)))
    let mainImg = document.getElementById("MainImg");
    // console.log(mainImg.src);
    // console.log(productPrice.innerHTML);
    if (search === undefined) {
        basket.push({
            id: id,
            name: productName.innerHTML,
            price: productPrice.innerHTML,
            image: mainImg.src,
            no: 1
        });
    } else {
        search.no += 1;
    }
    // console.log(basket);
    update(id);
    localStorage.setItem("items", JSON.stringify(basket));
}

function decrement(id) {
    // console.log(basket);
    let search = basket.find((x) => x.id === id);
    if (search === undefined) return;
    else if (search.no === 0) return;
    else {
        search.no -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.no !== 0);
    // console.log(basket);
    localStorage.setItem("items", JSON.stringify(basket));
}

function update(id) {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.no;
    // console.log(search);
    calculation();
}

function calculation() {
    let cartAmount = document.getElementById("cartAmount");
    cartAmount.innerHTML = basket.map((x) => x.no).reduce((x, y) => x + y, 0);
}

calculation();


