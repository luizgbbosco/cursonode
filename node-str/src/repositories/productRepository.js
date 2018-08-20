const mongoose = require('mongoose');
const Product = mongoose.model('product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title price slug description tags')
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price')
};

exports.getById = (id) => {
    return Product
        .findById(id)
};

exports.getByTag = (tag) => {
    return Product
        .find({
            tags : tag,
            active: true
        }, 'title description price')
};

exports.create = (data) => {
    var product = new Product(data);
    return product.save()
}

exports.update = (id, data) => {
    return Product
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

exports.delete = (id) => {
    return Product
        .findOneAndRemove(id);
}