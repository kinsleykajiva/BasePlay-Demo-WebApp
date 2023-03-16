// ModelsUtils.js
const mongoose = require('mongoose');

const localeSchema = {
    title: {type: String, required: true},
    description: {type: String, required: false},
    seo_title: {type: String},
    summary: {type: String},
    seo_description: {type: String},
    use_seo_values: {type: Boolean, default: false}
};
const mediaSchema = {
    type_: {type: String, required: true},
    src: {type: String, required: true}
};

const contentSchema = {
    src: {type: String, required: false},
    extension: {type: String, required: false},
    text: {type: String, required: false},
    quality: {type: String},
    size: {type: Number},
    size_unit: {type: String}
};
const categorySchema = new mongoose.Schema({
    slug: {type: String, required: true},
    path: {type: String, required: true},
    parent_id: {type: String, required: false},
    ancestor_ids: {type: [String], default: []},
    locale: [localeSchema]

});
const itemSchema = new mongoose.Schema({
    item_type: {type: String, required: true},
    slug: {type: String, required: true},
    creator: {type: String, required: true},
    locale: [localeSchema],
    media: [mediaSchema],
    content: contentSchema,
    categories: {type: [String], default: []},
});
const CategoryModel = mongoose.model('categories', categorySchema);
const ItemModel = mongoose.model('items', itemSchema);

module.exports = {CategoryModel, ItemModel};















