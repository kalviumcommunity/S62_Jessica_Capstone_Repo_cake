const Order = require("../models/order.model");


// TOTAL REVENUE
const getTotalRevenue = async () => {

const result = await Order.aggregate([
{
$group:{
_id:null,
totalRevenue:{ $sum:"$finalPrice" }
}
}
]);

return result[0]?.totalRevenue || 0;

};


// MOST POPULAR FLAVOR
const getPopularFlavors = async () => {

const result = await Order.aggregate([
{
$group:{
_id:"$flavor",
count:{ $sum:1 }
}
},
{
$sort:{ count:-1 }
},
{
$limit:5
}
]);

return result;

};


// ORDERS PER DAY
const getOrdersPerDay = async () => {

const result = await Order.aggregate([
{
$group:{
_id:{
$dateToString:{ format:"%Y-%m-%d", date:"$createdAt" }
},
orders:{ $sum:1 }
}
},
{
$sort:{ _id:1 }
}
]);

return result;

};


module.exports = {
getTotalRevenue,
getPopularFlavors,
getOrdersPerDay
};