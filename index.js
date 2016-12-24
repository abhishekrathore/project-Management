/* 
1. Thrott link Programming (Read About this)
*/
var express = require('express'), // require express code
    bodyParser = require('body-parser'), // require body-parser code
    common = require('./common'), // require common file code
    UserController = require('./Controller/UserController'), // require Controller code code
    ProjectController = require('./Controller/ProjectController'), // require Controller code code
    DocumentController = require('./Controller/DocumentController'), // require Controller code code
    PageMapsController = require('./Controller/PageMapsController'), // require Controller code code
    TaskController = require('./Controller/TaskController'), // require Controller code code
    session = require('express-session'), // require express-session code
    passport = require('passport'), // require passport js code code
    multer = require('multer'), // require multer code
    // install npm install passport-local --save (for install local strategy)
    LocalStrategy = require('passport-local').Strategy,
    PORT = process.env.PORT || 8080,
    // install npm install passport-google-oauth2 --save (for install Google strategy)
    // Need to Create A app on https://console.cloud.google.com/
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    storage = multer.diskStorage({
        destination: function(req, file, cb) {
            var docPath = process.env.IMAGE_PATH || './images/';
            cb(null, docPath)
        },
        filename: function(req, file, cb) {
            var type = file.mimetype.split('/');
            cb(null, Date.now() + '.' + type[type.length - 1]);
        }
    })
upload = multer({
        storage: storage
    }),
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
        maxAge: 600000,
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
        callbackURL: process.env.GOOGLE_CB || "http://localhost:8080/userLoginCallback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        UserController.insertUpsertUser(profile, done);
    }
));
// passport serialize user
passport.serializeUser(function(user, done) {
    console.log('serializeUser')
    UserController.getUserDetail(user.emails[0].value, done);
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
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        var resultObj = {};
        resultObj.status = 'unauthorized';
        resultObj.result = {
            message: 'Succefully Loggd out'
        };
        res.send(resultObj); //Inside a callback… bulletproof!
    });
});
// User Collections Apis
app.get('/userLoginCallback', passport.authenticate('google'), function(req, res) {
    var resultObj = {};
    resultObj.status = 'ok';
    resultObj.result = {
        message: 'Succefully Loggd In'
    };
    res.send(resultObj);
});
app.get('/getUserWithoutAccess', isAdminAuthenticate, UserController.getUserWithoutAccess);
app.get('/giveAccessToUser', isAdminAuthenticate, UserController.giveAccessToUser);
app.get('/getDeveloperList', isAdminAuthenticate, UserController.getDeveloperList);
app.get('/giveUserDetail', isAuthenticate, UserController.giveUserDetail)
    // Project Collections Apis
app.post('/createNewProject', isAdminAuthenticate, ProjectController.createNewProject);
app.get('/getProjectDetailByProjectId/:id', isAuthenticate, ProjectController.getProjectDetailByProjectId);
app.put('/editProjectDetail/:id', isAdminAuthenticate, ProjectController.editProjectDetail);
app.get('/getActiveProject', isAuthenticate, ProjectController.getActiveProject);
app.get('/checkProjectId/:id', isAuthenticate, ProjectController.checkProjectId);
// Document Collections Apis
app.post('/uploadDocs', isAuthenticate, upload.single('doc'), DocumentController.uploadDocument);
app.get('/deleteDocument', isAuthenticate, DocumentController.deleteDocument);
app.get('/files/:filename', isAuthenticate, DocumentController.getDocument);
// Project Map Collections Apis
app.post('/saveScreen', isAuthenticate, PageMapsController.saveScreen);
app.get('/getActiveScreens/:id', isAuthenticate, PageMapsController.getActiveScreens);
app.get('/getScreenDetail/:id', isAuthenticate, PageMapsController.getScreenDetail);
app.put('/updateScreen/:id', isAuthenticate, PageMapsController.updateScreen);
// Task Api
app.get('/getTaskByProjectOrScreenId/:projectId/:screenId', isAuthenticate, TaskController.getTaskByProjectOrScreenId);
app.get('/getUserByProjectId/:id', isAuthenticate, ProjectController.getUserByProjectId);
app.post('/saveTask', isAuthenticate, TaskController.saveTask);
app.put('/editTask/:id', isAuthenticate, TaskController.editTask);
app.get('/showTaskByProjectId/:projectId', isAuthenticate, TaskController.showTaskByProjectId);
// Check authenticate 
app.get('/isAuthenticate', isAuthenticate, function(req, res) {
    var resultObj = {};
    resultObj.status = 'ok';
    resultObj.result = {
        message: 'Succefully Logged In',
        accessFlag: req.user[0].accessflag,
        profileUrl: req.user[0].profileImage
    };
    res.send(resultObj);
});


// For Check Start Server function
app.listen(PORT, function() {
    console.log('Server Started In Rest Api on port ' + PORT);
});

function isAuthenticate(req, res, done) {
    var resultObj = {};
    if (req.user && req.user[0] && req.user[0].accessflag) {
        resultObj.status = 'ok';
        done();
    } else if (req.user && req.user[0] && !req.user[0].accessflag) {
        resultObj.status = 'noaccess';
        resultObj.result = 'No Access this User';
        resultObj.result = {
            message: 'No Access this User',
            accessFlag: req.user[0].accessflag,
            profileUrl: req.user[0].profileImage
        };
        res.send(resultObj)
    } else {
        resultObj.status = 'unauthorized';
        res.send(resultObj)
    }
}

function isAdminAuthenticate(req, res, done) {
    var resultObj = {};
    if (req.user && req.user[0].userrole === 'Admin') {
        resultObj.status = 'ok';
        done();
    } else if (req.user && req.user[0].userrole !== 'Admin') {
        resultObj.status = 'fail';
        resultObj.result = 'This Api Only Access By Admin';
        res.send(resultObj)
    } else {
        resultObj.status = 'unauthorized';
        res.send(resultObj)
    }
}