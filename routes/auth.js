const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const check = require('../middleware/auth');

router.post('/register', check.isGuest ,(req, res)=>{
    const {username, name, society, password} = req.body;
    const newUser = new User({
        username: Number(username),
        name,
        society
    });
    User.register(newUser, password, (err, user)=>{
        if(err) {
            console.log(err);
            res.redirect('/register');
        }
        res.redirect('/login');
    });
});


router.post('/login', check.isGuest ,passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true 
  }) ,(req, res)=>{
    if(req.user.type === 'admin'){
        res.redirect('/admin-dash');
    }else{
        res.redirect('/dash');
    }
});

router.get('/logout', check.isLoggedIn , (req, res)=>{
    req.logout();
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;