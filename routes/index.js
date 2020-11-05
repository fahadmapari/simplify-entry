const router = require('express').Router();
const check = require('../middleware/auth');
const QRCode = require('qrcode');
const Society = require('../models/society');

router.get('/', check.isGuest ,(req, res)=>{
    res.render('index');
});

router.get('/register', check.isGuest ,async (req, res)=>{
    let societies = await Society.find({}, 'societyName _id');
    res.render('register',{
        societies
    });
});



router.get('/login', check.isGuest ,(req, res)=>{
    res.render('login');
});


router.get('/dash', check.isLoggedIn, check.isUser ,(req, res)=>{
    res.render('dash');
});

router.get('/admin-dash', check.isLoggedIn, check.isAdmin ,(req, res)=>{
    res.render('admin-dash');
});

router.get('/qr/create', check.isLoggedIn, check.isAdmin ,(req, res)=>{
    res.render('new-qr');
});

router.post('/qr/create', check.isLoggedIn, check.isAdmin ,(req, res)=>{

    Society.create({
        societyName: req.body.name,
        createdBy: req.user._id
    }, (err, result)=>{
        if(err){
            console.log(err);
            return;
        }
        QRCode.toString(`${result._id}`, { type: 'svg', width: 500} ,async function (err, svg) {
            if(err){
                console.log(err);
                return;
            }
            try{
            let doc = await Society.findOneAndUpdate({_id: result._id}, {
                qrSVG: svg,
            });

            res.redirect('/qr-list');
            }catch(err){
                console.log(err);
                res.redirect('/qr/create');
            }
            
        });
    });
});

router.get('/qr-list', check.isLoggedIn, check.isAdmin ,async (req, res)=>{
    let societies = await Society.find({createdBy: req.user._id});
    res.render('qr-list', {
        societies
    });
});


module.exports = router;