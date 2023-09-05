var cart = {};
function addToCart(product){
	var productName = product.getAttribute("data-name");
	var price = product.getAttribute("data-price");

	cart[productName] = price;
	alert(productName + " successfully added to cart");


	console.log(cart);
	sessionStorage.setItem("myCart", JSON.stringify(cart));
}

function getCart(){
	var test = sessionStorage.getItem("myCart");
	console.log(JSON.parse(test));
}

function clearCart(){
	sessionStorage.removeItem("myCart");
}

function display() {
        var cart = JSON.parse(sessionStorage.getItem("myCart"));
        var content = document.getElementById("cartTable");
    
        content.innerHTML = cart.map(product => {
            return '<tr><td>' + product.name + '</td><td>' + product.price + '</td></tr>';
        }).join('');
    }