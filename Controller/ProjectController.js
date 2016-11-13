Project = require("../Model/Project"); // Require User Molel file
//Q = require("q");
// Create A new project
function _createNewProject(req, res) {
    var CreateProject = new Project({
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        projectPrority: req.body.projectPrority,
        developers: req.body.developers,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
    });
    CreateProject.save(function(err, doc) {
        if (err) res.send(err)
        else res.send(doc);
    });
}
// Export Methodz
module.exports = {
    createNewProject: _createNewProject
};