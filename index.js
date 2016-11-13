var express = require('express'), // require express code
    bodyParser = require('body-parser'), // require body-parser code
    common = require('./common'), // require common file code
    UserController = require('./Controller/UserController'), // require Controller code code
    ProjectController = require('./Controller/ProjectController'), // require Controller code code
    session = require('express-session'), // require express-session code
    passport = require('passport'), // require passport js code code
    multer = require('multer'), // require multer code
    upload = multer({
        dest: 'images/'
    }),
    // install npm install passport-local --save (for install local strategy)
    LocalStrategy = require('passport-local').Strategy,
    PORT = process.env.PORT || 8080,
    // install npm install passport-google-oauth2 --save (for install Google strategy)
    // Need to Create A app on https://console.cloud.google.com/
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    app = express(); // initilize exporess in app variable
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
// here public is name of a folder of static file
app.use(express.static('public'));
// Make session by express-session obj (secure false because we use http not https)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        secure: false
    }
}));
// use these lines after make session
app.use(passport.initialize());
app.use(passport.session());
// use passport local Strategy  use middle ware with middle ware
passport.use(new LocalStrategy(function(username, password, done) {
    // For Pass Condition of Login
    done(null, username);
    // For fail Conditions of Login
    //done(null, false);
}));
// use passport Google Strategy  use middle ware with middle ware
passport.use(new GoogleStrategy({
        clientID: '702764497550-9dt3j01t9pdt0jqfhf44e3f0pcijo5cn.apps.googleusercontent.com',
        clientSecret: '18Rk68ZMTdzrAsOgUemnmbL-',
        callbackURL: "http://localhost:8080/userLoginCallback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));
// passport serialize user
passport.serializeUser(function(user, done) {
    console.log('serializeUser')
    done(null, user.id);
});
// passport deserialize user
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser')
    // here serializeUser done function second arg is same to deserializeUser function first arg (id = user)
    done(null, id);
});
// User Apis
app.get('/userLogin', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}));
app.get('/userLoginCallback', passport.authenticate('google'), UserController.insertUpsertUser);
app.get('/getUserWithoutAccess', isAuthenticate, UserController.getUserWithoutAccess);
// Project Apis
app.post('/createNewProject', isAuthenticate, ProjectController.createNewProject);
// Post Dummy Api for file Upload
app.post('/upload', isAuthenticate, upload.single('logo'), function(req, res) {
    console.log(req.file);
});

// For Check Start Server function
app.listen(PORT, function() {
    console.log('Server Started In Rest Api on port ' + PORT);
});

function isAuthenticate(req, res, done) {
     done();
    // if (req.user) done()
    // else res.send("Not Logged in")
}