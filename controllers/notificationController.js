const notifications = require('../models/notifications');


module.exports.getNotifications = (req,res)=>{
    const email = req.params.id.replace(':','');
    notifications.find({user : email}).sort({date : 'desc'}).then(notifications=>{
        res.json({notifications : notifications});
    }).catch(err=>{
        res.json({result : notfound});
    })
}