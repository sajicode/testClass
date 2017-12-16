var mongoose = require("mongoose"),
    studentSchema;

mongoose.connect("mongodb://mongodb:27017/student");    //connecting mongoose to mongodb and
                                                    //creating student database
studentSchema = new mongoose.Schema({
    name: {type: String, required: true},              //creating structure of database
    role: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("pupil", studentSchema);    //passing studentSchema inside collection called pupil