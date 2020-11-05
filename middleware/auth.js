function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

function isGuest(req, res, next){
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/dash');
    }
}

function isAdmin(req, res, next){
    if(req.user.type === 'admin'){
        next();
    }else{
        res.redirect('/dash');
    }
}

function isUser(req, res, next){
    if(req.user.type === 'user'){
        next();
    }else{
        res.redirect('/admin-dash');
    }
}


module.exports = {
    isLoggedIn,
    isAdmin,
    isGuest,
    isUser
}