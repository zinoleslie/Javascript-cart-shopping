const products = [
    {
        name: "MacBook Air M1",
        productimg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s",
        description: "Apple's MacBook Air powered by the M1 chip. Ultra-fast performance, stunning Retina display, and all-day battery life.",
        price: 999,
        quantity: 1
    },
    {
        name: "Dell XPS 13",
        productimg: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg",
        description: "The Dell XPS 13 features a stunning 13.4-inch InfinityEdge display with excellent performance, powered by Intel Core processors.",
        price: 1199,
        quantity: 1
    },
    {
        name: "HP Spectre x360",
        productimg: "https://cdn.thewirecutter.com/wp-content/media/2023/11/editing-laptop-2048px-231551-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
        description: "The HP Spectre x360 is a convertible laptop with a sleek design, great battery life, and impressive performance, perfect for professionals.",
        price: 1299,
        quantity: 1
    },
    {
        name: "Lenovo ThinkPad X1 Carbon",
        productimg: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/3747141/1.jpg?4481",
        description: "The Lenovo ThinkPad X1 Carbon is known for its durability, powerful performance, and lightweight design, ideal for business users.",
        price: 1499,
        quantity: 1
    },
    {
        name: "Asus ROG Zephyrus G14",
        productimg: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/92/6953412/1.jpg?3771",
        description: "A powerful gaming laptop, the Asus ROG Zephyrus G14 offers great portability, long battery life, and high-end gaming performance.",
        price: 1399,
        quantity: 1
    }
];

// Render cards to the DOM
const cartContainer = document.getElementById('cart-list');

// Function for incrementing quantity
function increamentQuantity(param) {
    let clickproductname = param.target.id;

    // Find the product in the array
    let Newproduct = products.find(item => item.name === clickproductname);

    // Increment the quantity
    Newproduct.quantity++;

    // Update the quantity element
    let quantityEle = document.getElementById(`quantity-${clickproductname}`);
    quantityEle.textContent = Newproduct.quantity;

    totalElem.innerHTML= sumProducts();
    
}

// Handle decrement
function decreamentQuantiy(param) {
    let clickproductname = param.target.id;

    // Find the product in the array
    let Newproduct = products.find(item => item.name === clickproductname);

    // Decrement quantity if greater than 1
    if (Newproduct.quantity > 1) {
        Newproduct.quantity--;
    }

    // Update the quantity element
    let quantityEle = document.getElementById(`quantity-${clickproductname}`);
    quantityEle.textContent = Newproduct.quantity;

    totalElem.innerHTML= sumProducts();
}
 

// delete function
function removecard(param){
        let clickremove = param.target.id;
        // to check if the item name matches with the
       let product;
        for (let item of products) {
            if (item.name === clickremove) {
                 product = item;
                 break;
            }
        }

        // remove the product card from the array
        let index = products.indexOf(product);
        products.splice(index, 1);

        //nremove the product card from the cart container
       let productCard = param.target.parentElement.parentElement;
       cartContainer.removeChild(productCard);

        totalElem.textContent= sumProducts();
}






// calculate the total 
function sumProducts(){
      let total= 0;
      for(items of products) {
        total += items.price * items.quantity;
      }
      return total;
}

//

//get the total id and craete  var for it 
let totalElem = document.getElementById("total");
totalElem.innerHTML= sumProducts();


// Handle rendering of products
function renderProducts() {
    products.forEach(item => {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "prductCard");

        let productimg = document.createElement("img");
        productimg.src = item.productimg;
        productimg.setAttribute("class","imgsection");

        let productName = document.createElement("h3");
        productName.innerHTML = item.name;

        let productPrice = document.createElement("p");
        productPrice.textContent =`$ ${item.price}`;

        let productDescription = document.createElement("p");
        productDescription.textContent = item.description;

        // Buttons
        let increamentBtn = document.createElement("button");
        increamentBtn.textContent = "+";
        increamentBtn.setAttribute("id", item.name);
        increamentBtn.addEventListener('click', function(eventobj) {
            increamentQuantity(eventobj);
        });

        let decreamentBtn = document.createElement("button");
        decreamentBtn.textContent = "-";
        decreamentBtn.setAttribute("id", item.name);
        decreamentBtn.addEventListener("click", function(eventobj) {
            decreamentQuantiy(eventobj);
        });

        // Quantity Display
        let quantity = document.createElement("p");
        quantity.textContent = item.quantity;
        quantity.setAttribute("id", `quantity-${item.name}`); // Unique ID for each product's quantity
        
        // delete button
        let deleteEle = document.createElement("button");
        deleteEle.textContent = "remove";
        deleteEle.setAttribute("id", item.name);
        deleteEle.addEventListener('click', function(eventobj) {
           removecard(eventobj)
        })


        let leftbox = document.createElement("div");
        leftbox.setAttribute('class', 'left-box');
        leftbox.appendChild(decreamentBtn);
        leftbox.appendChild(quantity);
        leftbox.appendChild(increamentBtn);

        let actionBox = document.createElement("div");
        actionBox.setAttribute("class", "action-box");
        actionBox.appendChild(leftbox);
        actionBox.appendChild(deleteEle);

        // Add elements to the product card
        productCard.appendChild(productimg);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDescription);
        productCard.appendChild(actionBox);

        cartContainer.appendChild(productCard);
    });
}

renderProducts();
