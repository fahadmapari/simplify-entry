const router = require('express').Router();
const Log = require('../models/log');
const Society = require('../models/society');
const check = require('../middleware/auth');

router.get('/entry', check.isLoggedIn ,check.isUser ,(req, res)=>{
    res.render('log-entry');
});

router.get('/exit', check.isLoggedIn, check.isUser ,(req, res)=>{
    res.render('log-exit');
});

router.post('/entry/add', check.isLoggedIn, check.isUser ,async (req, res)=>{
    let foundSociety = await Society.findOne({_id: req.body.qrValue});
    Log.create({
        loggedBy: req.user._id,
        society: foundSociety.societyName,
        societyOwner: foundSociety.createdBy,
        type: 'entry',
    }, (err, log)=>{
        if(err) {
            console.log(err);
            res.json({status: false})
        }
        res.json({status: true, name: log.society, type: log.type}); 
    }); 
});

router.post('/exit/add', check.isLoggedIn, check.isUser ,async (req, res)=>{
    let foundSociety = await Society.findOne({_id: req.body.qrValue});
    Log.create({
        loggedBy: req.user._id,
        society: foundSociety.societyName,
        societyOwner: foundSociety.createdBy,
        type: 'exit',
    }, (err, log)=>{
        if(err) {
            console.log(err);
            res.json({status: false})
        }
        res.json({status: true, name: log.society, type: log.type}); 
    }); 
});

router.get('/records/entries', check.isLoggedIn, check.isUser ,async (req, res)=>{
    let logs;
    if(req.query.startdate && req.query.enddate){
        let d = req.query.enddate.split('-');
        let stringEndDate = '';
        d[2] = Number(d[2]) + 1;
        for(let i = 0; i < d.length; i++){
            if(i < d.length - 1){
                stringEndDate += d[i] + '-';
          }else{
                stringEndDate += d[i];
          }
        }
        req.query.enddate = stringEndDate;
        console.log(req.query.enddate);
        logs = await Log.find({ loggedAt: { $gte: new Date(req.query.startdate), $lte: new Date(req.query.enddate)} ,loggedBy: req.user._id, type: 'entry' });

        
    }else{
        logs = await Log.find({ loggedBy: req.user._id, type: 'entry' });
    }


    function formatDate(date){
        let d = new Date(date);
        return `${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    res.render('logs', {
        activelink: 0,
        logs,
        formatDate,
        username: req.user.name,
        type: 'entries'
    });
});

router.get('/records/exits', check.isLoggedIn, check.isUser ,async (req, res)=>{
    let logs;
    if(req.query.startdate && req.query.enddate){
        let d = req.query.enddate.split('-');
        let stringEndDate = '';
        d[2] = Number(d[2]) + 1;
        for(let i = 0; i < d.length; i++){
            if(i < d.length - 1){
                stringEndDate += d[i] + '-';
          }else{
                stringEndDate += d[i];
          }
        }
        req.query.enddate = stringEndDate;
        console.log(req.query.enddate);
        logs = await Log.find({ loggedAt: { $gte: new Date(req.query.startdate), $lte: new Date(req.query.enddate)} ,loggedBy: req.user._id, type: 'exit' });

        
    }else{
        logs = await Log.find({ loggedBy: req.user._id, type: 'exit' });
    }


    function formatDate(date){
        let d = new Date(date);
        return `${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    res.render('logs', {
        activelink: 1,
        logs,
        formatDate,
        username: req.user.name,
        type: 'exits'
    });
});



router.get('/records/admin/entries', check.isLoggedIn, check.isAdmin ,async (req, res)=>{
    let logs = await Log.find({ societyOwner: req.user._id, type: 'entry' }).populate('loggedBy').exec();

    function formatDate(date){
        let d = new Date(date);
        return `${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    res.render('admin-logs', {
        activelink: 0,
        logs,
        formatDate,
    });
});

router.get('/records/admin/exits', check.isLoggedIn, check.isAdmin ,async (req, res)=>{
    let logs = await Log.find({ societyOwner: req.user._id, type: 'exit' }).populate('loggedBy').exec();

    function formatDate(date){
        let d = new Date(date);
        return `${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    res.render('admin-logs', {
        activelink: 1,
        logs,
        formatDate,
    });
});

module.exports = router;