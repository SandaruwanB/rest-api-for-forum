const category = require('../models/categories');

module.exports.addCatogoryDetail = (req,res)=>{
    const categ = req.body.cat;
    
    const cat = new category({
        name : categ,
    });
    cat.save().then(()=>{
        res.json({result : 'success'});
    });
}

module.exports.getCategory = (req,res)=>{
    category.find({}).then(categories=>{
        res.json({category : categories});
    });
}

