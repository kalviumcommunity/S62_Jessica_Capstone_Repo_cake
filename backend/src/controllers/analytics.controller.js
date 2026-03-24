const analyticsService = require("../services/analytics.service");


const totalRevenue = async (req,res) => {

try{

const revenue = await analyticsService.getTotalRevenue();

res.json({ totalRevenue: revenue });

}

catch(error){

res.status(500).json({ message:error.message });

}

};



const popularFlavors = async (req,res) => {

try{

const flavors = await analyticsService.getPopularFlavors();

res.json(flavors);

}

catch(error){

res.status(500).json({ message:error.message });

}

};



const ordersPerDay = async (req,res) => {

try{

const data = await analyticsService.getOrdersPerDay();

res.json(data);

}

catch(error){

res.status(500).json({ message:error.message });

}

};


module.exports = {
totalRevenue,
popularFlavors,
ordersPerDay
};