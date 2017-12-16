var studentModel = require("./student-model.js"),
    redisClient = require("redis").createClient,
    redis = redisClient(6379, "rediscon");

exports.interceptIds = function(req, res, next, id) {
    //var id = req.params.id;

    studentModel.findById(id, function(err, data) {
        if(err) {return next(new Error("...."))}

        req.student = data;
        next();
    });
}

exports.addStudent = function(req, res, next) {
    var student = req.body;

    var pupil = new studentModel(student);
    pupil.save(function(err, data) {
        if(err) {
            return next(new Error("cannot add students"))
        }

        res.status(200).json(data);
    });
};

exports.fetchAllStudents = (req, res, next) => {
    redis.get("allStudents", (err, reply) => {
        if(err) {return next(new Error("data not found in cache")); }

        if(reply) {
            console.log("done by redis");
            res.status(200).json(JSON.parse(reply));

        }  else {

            console.log("not redis");
            studentModel.find((err, data) => {
                if(err) {return next(new Error("....")); }

                redis.set("allStudents", JSON.stringify(data))
                res.status(200).json(data);
            });
        }
    });
}

exports.getStudents = function(req, res, next) {
    studentModel.find(function(err, data) {
        if(err) {
            return next(new Error("cannot get students"))
        }

        res.status(200).json(data)
    });
}

exports.getStudent = function(req, res, next) {
    if(!req.student) {
        return next(new Error("could not find student"))
    }

    res.status(200).json(data);
}

exports.deleteStudent = function(req, res, next) {

    studentModel.remove({_id: req.student._id}, (err, res) => {
        if(err) {return next(new Error("student could not be deleted"))}
    })
    
    res.status(200).json(req.student);
}

exports.updateStudent = function (req, res, next) {
    studentModel.update({_id: req.student._id}, req.body, (err, res) => {
        if(err) {
            return next(new Error("ccould not update student"))
        }
    })

    res.status(200).json(data);
}