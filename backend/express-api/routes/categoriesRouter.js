//CategoriesRouter.js
const express = require('express');
const {success, error} = require("../utils/apiResponse");
const {CategoryModel, ItemModel} = require("../models/ModelsUtils");
const router = express.Router();


router.get('/all', async (req, res, next) => {
    try {
        const categories = await CategoryModel.find().populate('locale').exec();

        return res.status(200).json(success("categories", {categories, },200));

    } catch (err) {
        console.error(err.message);
        return  res.status(500).json(error("Server Error:" + err.message,500));

    }
});


router.get('/only/:id', async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id).populate('locale').exec();
        if (!category) {


            return res.status(400).json(success("Category not found", {},400));
        }

        return res.status(200).json(success("categories", {  category},200));

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
                  return  res.status(404).json(error(" Category not found " + err.message ,404));
        }
        return  res.status(200).json(error("Server Error:" ,500));

    }
});


router.post('/save', async (req, res, next) => {
    const { slug, path, ancestor_ids, parent_id, locale } = req.body;
    try {
        const category = new CategoryModel({
            slug,
            path,
            ancestor_ids,
            parent_id,
            locale,
        });

        if(!slug){
            return res.status(400).json(error("slug is required",400));
        }

        if(!path){
            return res.status(400).json(error("path is required",400));
        }

        if(!locale){
            return res.status(400).json(error("locale is required",400));
        }

         if(!locale.title){
            return res.status(400).json(error("locale title is required",400));
        }


        await category.save();


        return res.status(200).json(success("saved Category", {category},200));

    } catch (err) {
        console.error(err.message);

        return  res.status(200).json(error("Server Error:" + err.message,500));
    }
});

router.post('/update', async (req, res, next) => {
    const {id ,slug, path, ancestor_ids, parent_id, locale } = req.body;



    if(!id){
        return res.status(400).json(error("id is required",400));
    }

    if(!slug){
        return res.status(400).json(error("slug is required",400));
    }

    if(!path){
        return res.status(400).json(error("path is required",400));
    }

    if(!locale){
        return res.status(400).json(error("locale is required",400));

    }

    if(!locale.title){
        return res.status(400).json(error("locale title is required",400));
    }


    try {
        let category = await CategoryModel.findById(id);
        if (!category) {

            return  res.status(400).json(error("Category not found",400));

        }
        category.slug = slug;
        category.path = path;
        category.ancestor_ids = ancestor_ids;
        category.parent_id = parent_id;
        category.locale = locale;

        await category.save();


        return res.status(200).json(success("category updated", { category },200));
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {

            return  res.status(200).json(error('Category not found',404));
        }
        return  res.status(200).json(error("Server Error:" + err.message,500));
    }
});



router.post('/delete', async (req, res, next) => {

   const {id} = req.body;
   if (!id) {
        return  res.status(404).json(error("Category not found"  ,404));
   }


    try {
        const category = await CategoryModel.findById(id);
        if (!category) {
            return  res.status(404).json(error("Category not found" ,404));

        }
        console.log("category",category);

        await  CategoryModel.findByIdAndRemove(id);


        return res.status(200).json(success("Category removed", {},200));

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {

            return  res.status(200).json(error(
                "Category not found"

                ,404));
        }
        return  res.status(200).json(error(
            "Server Error:" + err.message

            ,500));
    }
});



module.exports = router;




