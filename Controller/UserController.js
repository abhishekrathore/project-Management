Users = require("../Model/User"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
// Make a function for find user by querry
function _getUserWithoutAccess(req, res) {
    // search functionlity work on only on model not document
    // find for all / findOne for only for one record
    var findObj = {
        'deleteflag': false,
        'accessflag': false,
        'userrole': {
            $nin: ['Admin']
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
function _insertUpsertUser(profile, callback) {
    Users.findOne({
        useremail: profile.emails[0].value
    }, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            callback(null, profile);
        } else if (!docs) {
            var saveUser = new Users({
                name: profile.displayName,
                useremail: profile.emails[0].value,
                profileImage : profile.photos[0].value
            });
            saveUser.save(function(err, docs) {
                if (err) {
                    resultObj.status = FAIL;
                    resultObj.result = err;
                } else {
                    resultObj.status = OK;
                    resultObj.result = docs;
                };
                callback(null, profile);
            });
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            callback(null, profile);
        }
    });
}

// Get All Developer for Drop Down
function _getDeveloperList(req, res) {
    var findObj = {
        'deleteflag': false,
        'accessflag': true,
        'userrole': {
            $nin: ['Admin']
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

function _giveUserDetail (req, res) {
    resultObj.status = FAIL;
    resultObj.result = req.user[0];
    res.send(resultObj);
}
// Get User Detail 
function _getUserDetail(useremail, callback) {
    var findObj = {
        'deleteflag': false,
        'useremail': useremail
    };
    Users.find(findObj, function(err, docs) {
        if (err) {
            callback(null, err)
        } else {
            callback(null, docs)
        };
    });
}
// Export Methodz
module.exports = {
    getUserWithoutAccess: _getUserWithoutAccess,
    insertUpsertUser: _insertUpsertUser,
    getDeveloperList: _getDeveloperList,
    giveAccessToUser: _giveAccessToUser,
    getUserDetail : _getUserDetail,
    giveUserDetail : _giveUserDetail
};
