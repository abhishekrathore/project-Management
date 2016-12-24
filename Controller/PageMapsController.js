var PageMaps = require("../Model/PageMaps"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
// Save Project Screen
function _saveScreen(req, res) {
    var savePageMap = new PageMaps(req.body);
    savePageMap.save(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(resultObj);
        };
    });
}

function _updateScreen(req, res) {
    var screenId = req.params.id;
    PageMaps.findByIdAndUpdate(screenId, {
        $set: req.body
    }, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(resultObj);
        }
    });
}

function _getScreenDetail(req, res) {
    var findObj = {
        'deleteflag': false,
        '_id': req.params.id
    };
    PageMaps.findOne(findObj).populate('docId').exec(function(err, docs) {
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

function _getActiveScreens(req, res) {
    var findObj = {
        'deleteflag': false,
        'projectId': req.params.id
    };
    PageMaps.find(findObj, function(err, docs) {
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
    saveScreen: _saveScreen,
    updateScreen: _updateScreen,
    getScreenDetail: _getScreenDetail,
    getActiveScreens: _getActiveScreens
};