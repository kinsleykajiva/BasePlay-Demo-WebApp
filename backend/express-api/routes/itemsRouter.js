var express = require('express');
const {success, error} = require("../utils/apiResponse");
const {Category, Item, ItemModel, CategoryModel} = require("../models/ModelsUtils");
var router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
    return res.status(200).json(
        success("🎉I'm alive", {
            name: "welcome to base play nodejs",
        }, 200)
    )
});

router.get('/info', (req, res, next) => {
    return res.status(200).json(
        success("🎉I'm alive", {
            name: "welcome to base play nodejs",
        }, 200)
    )
});

router.get('/health', (req, res, next) => {
    return res.status(200).json(
        success("🎉I'm alive", {
            name: "welcome to base play nodejs",
        }, 200)
    )
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------


router.get('/all', async (req, res, next) => {
    try {
        const items = await ItemModel.find().populate('locale media categories').exec();

        return res.status(200).json(success("items", {  items  }, 200));

    } catch (err) {
        console.error(err.message);
        return res.status(500).json(error("Server Error:" + err.message, 500));
    }
});


router.get('/only/:id', async (req, res, next) => {
    try {
        const item = await ItemModel.findById(req.params.id).populate('locale media categories').exec();
        if (!item) {

            return res.status(404).json(error("Item not found", 404));
        }

        return res.status(200).json(success("items", {item}, 200));

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {

            return res.status(404).json(error("Item not found", 404));

        }
        return res.status(500).json(error("Server Error:" + err.message, 500));

    }
});


router.post('/save', async (req, res, next) => {
    const {item_type, slug, locale, creator, media, content, categories} = req.body;
    try {
        const item = new ItemModel({
            item_type,
            slug,
            locale,
            creator,
            media,
            content,
            categories,
        });

        if(!slug){
            return res.status(400).json(error("slug is required",400));
        }

        if(!locale){
            return res.status(400).json(error("locale is required",400));
        }

        if(!locale.title){
            return res.status(400).json(error("locale title is required",400));
        }

        if(!creator){
            return res.status(400).json(error("creator is required",400));
        }

        if(!media){
            return res.status(400).json(error("media is required",400));
        }

        if(!content){
            return res.status(400).json(error("content is required",400));
        }

        if(!categories){
            return res.status(400).json(error("categories is required",400));
        }




        await item.save();

        return res.status(200).json(success("saved item", {item}, 200));
    } catch (err) {
        console.error(err.message);
        return res.status(200).json(error("Server Error:" + err.message, 500));

    }
});


router.post('/update', async (req, res, next) => {
    const {id ,item_type, slug, locale, creator, media, content, categories} = req.body;
    try {
        let item = await ItemModel.findById(id);
        if (!item) {
            return res.status(404).json(error(
                "Item not found"
                , 404));

        }

        if(!id){
            return res.status(400).json(error("id is required",400));
        }
        if(!slug){
            return res.status(400).json(error("slug is required",400));
        }

        if(!locale){
            return res.status(400).json(error("locale is required",400));
        }

        if(!locale.title){
            return res.status(400).json(error("locale title is required",400));
        }

        if(!creator){
            return res.status(400).json(error("creator is required",400));
        }

        if(!media){
            return res.status(400).json(error("media is required",400));
        }

        if(!content){
            return res.status(400).json(error("content is required",400));
        }

        if(!categories){
            return res.status(400).json(error("categories is required",400));
        }



        item.item_type = item_type;
        item.slug = slug;
        item.locale = locale;
        item.creator = creator;
        item.media = media;
        item.content = content;
        item.categories = categories;
        await item.save();

        return res.status(200).json(success("updated item", {item}, 200));
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json(success("Item not found", {}, 404));
        }
        return res.status(500).json(error("Server Error:" + err.message, 500));

    }
});


router.post('/delete', async (req, res, next) => {
    const{id} = req.body;
    try {
        const item = await ItemModel.findById(id);
        if (!item) {
            return res.status(404).json(error(  "Item not found" , 404));
        }


        await  ItemModel.findByIdAndRemove(id);

        return res.status(200).json(success("Item removed", {}, 200));

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json(error("Item not found" , 404));

        }

        return res.status(500).json(error("Server Error:" + err.message , 500));

    }
});


module.exports = router;
