// لیست محصولات
const products = [
    { id: 1, name: "موس بی‌سیم", price: 250000, image: ["images/mouse.jpg", "images/mouse2.jpg", "images/mouse3.jpg"],
      shortdesc:"موس بی سیم با کیفیت ",stock:20
     },
    { id: 2, name: "کیبورد", price: 450000, image: ["images/keyboard.jpg", "images/keyboard2.jpg", "images/keyboard3.jpg"],
        shortdesc:"کیبورد حرفه ای با کلید های مقاوم و نور پس زمینه", stock:15
     },
    { id: 3, name: "هدفون", price: 700000, image: ["images/headphones.jpg", "images/headphones2.jpg", "images/headphones3.jpg"],
        shortdesc:"هدفون با کیفیت صدای بالا و حذف نویز",stock:25
     },
    { id: 4, name: "فلش 32 گیگ", price: 300000, image: ["images/flash.jpg", "images/flash2.jpg"],
        shortdesc:"فلش USB 32 گیگابایت",stock:5
     },
    { id: 5, name: "هارد اکسترنال", price: 2500000, image: ["images/hard.jpg", "images/hard2.jpg", "images/hard3.jpg"],
        shortdesc:"هارد اکسترنال با ظرفیت بالا و مقاوم",stock:15
     },
    { id: 6, name: "پاوربانک", price: 900000, image: ["images/powerbank.jpg", "images/powerbanck2.jpg", "images/powerbank3.jpg"],
        shortdesc:"پاوربانک با شارز سریع و مقاوم",stock:17
     },
    { id: 7, name: "اسپیکر", price: 1200000, image: ["images/speaker.jpg", "images/speaker3.jpg"],
        shortdesc:"اسپیکر با کیفیت صدای عالی",stock:23
     },
    { id: 8, name: "وبکم", price: 800000, image: ["images/webcam.jpg", "images/webcam2.jpg"],
        shortdesc:"وبکم HD مناسب  تماس تصویری و ظبط ویدیو",stock:30
     },
    { id: 9, name: "مانیتور", price: 6000000, image: ["images/manitor.jpg", "images/manitor2.jpg", "images/manitor3.jpg"],
        shortdesc:"مانیتور با کیفیت full HD",stock:20
     },
    { id: 10, name: "ماوس پد", price: 150000, image: ["images/mousepad.jpg", "images/mousepad2.jpg"],
        shortdesc:"موس پد نرم و ضد لغزش",stock:18
     },
    { id: 11, name: "کابل USB", price: 100000, image: ["images/usb.jpg"],
        shortdesc:"کابل USB با طول مناسب",stock:12
     },
    { id: 12, name: "شارژر", price: 400000, image: ["images/charger.jpg"],
        shortdesc:"شارزر تایپ سی",stock:26
     },
    { id: 13, name: "رم 8 گیگ", price: 1300000, image: ["images/ram.jpg"],
        shortdesc:"رم 8 گیگابایت",stock:30
     },
    { id: 14, name: "SSD 512GB", price: 3500000, image: ["images/ssd.jpg"],
        shortdesc:"SSD 512 گیگ",stock:15
     },
    { id: 15, name: "کیس کامپیوتر", price: 2800000, image: ["images/computer-case.jpg"],
        shortdesc:"کیس کامپیوتر با تهویه مناسب",stock:16
     }
];

let cart = []; // سبد خرید خالی

// گرفتن div محصولات
const productsDiv = document.getElementById("products");

// نمایش محصولات
products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.style.cursor = "pointer";
    productCard.style.border = "1px solid #ccc";
    productCard.style.padding = "10px";
    productCard.style.margin = "10px";
    productCard.style.display = "inline-block";
    productCard.style.width = "180px";
    productCard.style.textAlign = "center";

    productCard.innerHTML = `
        <img src="${product.image[0]}" width="150">
        <h3>${product.name}</h3>
        <p>قیمت: ${product.price.toLocaleString()} تومان</p>
        <button>افزودن به سبد خرید</button>
    `;

    // کلیک روی کارت برای نمایش جزئیات
    productCard.addEventListener("click", () => showProductDetails(product));

    // کلیک روی دکمه افزودن به سبد خرید
    const btn = productCard.querySelector("button");
    btn.addEventListener("click", (event) => {
        event.stopPropagation(); // جلوگیری از باز شدن modal
        addToCart(product.id);
    });

    productsDiv.appendChild(productCard);
});

// افزودن یک محصول به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// افزودن چند عدد محصول به سبد (از modal)
function addToCartMultiple(productId, quantity) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (quantity > product.stock) {
        alert("تعداد انتخابی بیشتر از موجودی است!");
        return;
    }

    if (existing) {
        if (existing.quantity + quantity > product.stock) {
            alert("موجودی کافی نیست!");
            return;
        }
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    product.stock -= quantity; // کم شدن موجودی

    updateCartUI();
}


// بروزرسانی UI سبد خرید
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    cartItems.innerHTML = "";
    let totalPrice = 0;

cart.forEach(item => {
    totalPrice += item.price * item.quantity;  // ← این خط رو اضافه کن
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${item.image[0]}" width="50" style="margin-right:5px">
        <strong>${item.name}</strong> | ${item.quantity} × ${item.price.toLocaleString()} تومان
        <br>${item.shortdesc}
        <br><button onclick="removeFromCart(${item.id})">حذف</button>
        <hr>
    `;
    cartItems.appendChild(div);
});


    if(cart.length > 0){
        const totalDiv = document.createElement("div");
        totalDiv.innerHTML = `<hr><p>مجموع: ${totalPrice.toLocaleString()} تومان</p>
        <button id="checkout">تایید خرید</button>`;
        cartItems.appendChild(totalDiv);
    }
}

// حذف محصول از سبد خرید
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// نمایش/مخفی کردن سبد خرید
document.getElementById("cart-button").addEventListener("click", () => {
    const cartItems = document.getElementById("cart-items");
    cartItems.style.display = cartItems.style.display === "none" ? "block" : "none";
});

// نمایش جزئیات محصول (modal)
function showProductDetails(product) {
    const modal = document.getElementById("product-modal");
    const content = document.getElementById("modal-content");

    let imagesHTML = product.image.map(img => `<img src="${img}" width="100" style="margin:5px">`).join('');

    content.innerHTML = `
    <h2>${product.name}</h2>
    <div style="text-align:center">
        ${product.image.map(img => `<img src="${img}" style="width:200px; margin:5px">`).join('')}
    </div>
    <p><strong>قیمت:</strong> ${product.price.toLocaleString()} تومان</p>
    <p><strong>توضیح کوتاه:</strong> ${product.shortdesc}</p>
    <p><strong>تعداد موجودی:</strong> ${product.stock} عدد</p>
    <label>تعداد انتخابی: 
        <input type="number" id="modal-quantity" value="1" min="1" max="${product.stock}">
    </label>
    <br><br>
    <button id="modal-add">افزودن به سبد خرید</button>
`;


    document.getElementById("modal-add").onclick = () => {
        const qty = parseInt(document.getElementById("modal-quantity").value);
        addToCartMultiple(product.id, qty);
        modal.style.display = "none";
    };

    modal.style.display = "flex";
}

// بستن modal
document.getElementById("close-modal").onclick = () => {
    document.getElementById("product-modal").style.display = "none";
};

