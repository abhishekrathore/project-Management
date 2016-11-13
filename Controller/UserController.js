Users = require("../Model/User"); // Require User Molel file
//Q = require("q");
// Make a function for find user by querry
function _getUserWithoutAccess(req, res) {
    // for get query string from url api
    var query = req.query;
    // search functionlity work on only on model not document
    // find for all / findOne for only for one record
    Users.find(query, function(err, docs) {
        if (err) throw err;
        res.send(docs);
    });
}
// Insert New User Function 
function _insertUpsertUser(req, res) {
    Users.findOne({
        useremail: req.user.emails[0].value
    }, function(err, doc) {
        if (err) throw err
        if (!doc) {
            var saveUser = new Users({
                name: req.user.displayName,
                useremail: req.user.emails[0].value,
                userrole: 'Developer',
                accessflag: false,
                deleteflag: false
            });
            saveUser.save(function(err, doc) {
                if (err) throw err
                else res.send(doc);
            });
        }
    });
}
// Export Methodz
module.exports = {
    getUserWithoutAccess: _getUserWithoutAccess,
    insertUpsertUser: _insertUpsertUser
};