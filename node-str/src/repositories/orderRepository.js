const mongoose = require('mongoose');
const Order = mongoose.model('order');

exports.get = async () => {
    const res = await Order.find({},'number')
        .populate('items.product', 'title')
        .populate('customer', 'name');
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save()
}