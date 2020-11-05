const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./db');
var flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const User = require('./models/user');

//express configs
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false},
    store: new MongoStore({ mongooseConnection: db.connection })
}));

app.use(flash());

//auth 
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrat(User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

app.use(function (req, res, next) {
    res.locals.user = req.user || '';
    next();
});

//routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/log', require('./routes/log'));


app.listen(process.env.PORT || 3000, ()=>{
    console.log('server started');
});