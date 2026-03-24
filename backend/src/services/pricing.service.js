const calculatePrice = (order) => {

let price = 500; // base cake price

// layer pricing
price += order.layers * 150;


// size pricing
if(order.size === "medium"){
price += 200;
}

if(order.size === "large"){
price += 400;
}


// premium flavor
if(order.flavor === "red velvet" || order.flavor === "hazelnut"){
price += 250;
}


// rush delivery
const today = new Date();
const delivery = new Date(order.deliveryDate);

const diffDays = (delivery - today)/(1000*60*60*24);

if(diffDays < 2){
price += 300;
}

return price;

};

module.exports = { calculatePrice };