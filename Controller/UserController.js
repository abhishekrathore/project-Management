Users = require("../Model/User"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
//Q = require("q");
// Make a function for find user by querry
function _getUserWithoutAccess(req, res) {
    // search functionlity work on only on model not document
    // find for all / findOne for only for one record
    var findObj = {
        accessflag: false,
        deleteFlag: false,
        userrole: {
            $nin: 'Admin'
        }
    };
    Users.find(findObj, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
        };
        res.send(resultObj);
    });
}
// Insert New User Function 
function _insertUpsertUser(req, res) {
    Users.findOne({
        useremail: req.user.emails[0].value
    }, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else if (!docs) {
            var saveUser = new Users({
                name: req.user.displayName,
                useremail: req.user.emails[0].value
            });
            saveUser.save(function(err, docs) {
                if (err) {
                    resultObj.status = FAIL;
                    resultObj.result = err;
                } else {
                    resultObj.status = OK;
                    resultObj.result = docs;
                };
                res.send(resultObj);
            });
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
        }
        res.send(resultObj);
    });
}

// Get All Developer for Drop Down
function _getDeveloperList(req, res) {
    var findObj = {
        accessflag: true,
       // deleteFlag: false,
        userrole: {
            $nin: 'Admin'
        }
    };
    Users.find(findObj, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
        };
        res.send(resultObj);
    });
}


// Give Access To User for Project Management
function _giveAccessToUser(req, res) {
    var userId = req.query.id;
    Users.findByIdAndUpdate(userId, {
            $set: {
                accessflag: true
            }
        },
        function(err, docs) {
            if (err) {
                resultObj.status = FAIL;
                resultObj.result = err;
            } else {
                resultObj.status = OK;
                resultObj.result = docs;
            };
            res.send(resultObj);
        });
}
// Export Methodz
module.exports = {
    getUserWithoutAccess: _getUserWithoutAccess,
    insertUpsertUser: _insertUpsertUser,
    getDeveloperList: _getDeveloperList,
    giveAccessToUser: _giveAccessToUser
};