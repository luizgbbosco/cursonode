const mongoose = require('mongoose');
const Product = mongoose.model('product');

exports.get = async() => {
    const res = await Product.find({
            active: true
        }, 'title price slug description tags')
        return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
            slug: slug,
            active: true
        }, 'title description price');
        return res;
};

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
};

exports.getByTag = async (tag) => {
    const res = await Product.find({
            tags : tag,
            active: true
        }, 'title description price');
        return res;
};


exports.create = async (data) => {
    var product = new Product(data);
    await product.save()
}

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
                // tags : data.tag
            }
        });
}

exports.delete = async (id) => {
    //console.log("recebeu esse id",id)
    await Product
        .findOneAndDelete({_id : id});
}