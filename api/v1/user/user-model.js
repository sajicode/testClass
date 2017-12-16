var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    UserSchema;

mongoose.connect("mongodb://mongodb:27017/student");

UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true}
});

//encrypting the password
UserSchema.pre("save", function (next) {
    this.password = this.encryptPassword(this.password);
    next();
})

UserSchema.methods = {
    encryptPassword: function(plaintext) {
        if(!plaintext) { return "";}

        var salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(plaintext, salt);
    },

    authenticate: function(plaintext) {
        return bcrypt.compareSync(plaintext, this.password);
    }
}

module.exports = mongoose.model("user", UserSchema);