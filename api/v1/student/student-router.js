var express = require("express"),
    router = express.Router(),          //enables us mount our handlers on a particular route
    controller = require("./student-controller.js"),
    auth = require("../auth/auth.js");

router.param("/:id", controller.interceptIds);

router.route("/")
    .post(controller.addStudent)
    .get(controller.getStudents)

router.route("/:id")
    .get(controller.getStudent)
    .delete(controller.deleteStudent)
    .put(controller.updateStudent)


module.exports = router;


