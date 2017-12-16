var request = require("supertest"),
    app = require("./server.js"),
    chai = require("chai"),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("students", function() {

    it("should test that all students are returned", function(next) {

        request(app)
        .get("/api/v1/students")

        .end(function(err, res) {
            expect(res.body).to.be.an("array")

            next()
        })
    })

    it("should add a student", function(next) {
        var data = {
            name: "ogheneochuko",
            role: "programmer"
        }

        request(app)
        .post("/api/v1/students")

        .send(data)
        .set("Content-Type", "Application/json")
        .end(function (err, res) {
            
            expect(res.body).to.be.an("object")
            expect(res.body.name).to.equal("ogheneochuko")
            expect(res.body.role).to.equal("programmer")

            
            next()
        });
    });

    it("should get a student by id", function(next) {
        var data = {
            name: "nimaat",
            role: "engineer"
        }

        request(app)

            .post("/api/v1/students")
            .send(data)
            .set("Content-Type", "Application/json")
            .end(function(err, res) {

                var id = res.body._id;

                request(app)
                    .get("/api/v1/students" + id)
                    .end(function(err, res) {

                        expect(res.body.name).to.equal("nimaat");
                        expect(res.body.role).to.equal("engineer");

                    });

                    next();
            });
    });

    it("should update a student by id", function(next) {
        var data = {
            name: "deola",
            role: "lawyer"
        }

        request(app)
        .post("/api/v1/students")

        .send(data)
        .set("Content-Type", "Application/json")
        .end(function (err, res) {
            

            var id = res.body._id;

            /* request(app)
                .get("/api/v1/students" + id)
                .end(function(err, res) {

                    expect(res.body).to.be.an("object")
                    expect(res.body.name).to.equal("deola")
                    expect(res.body.role).to.equal("lawyer") */

                     //it("should update a student by id", function(next) {
                        var data2 = {
                            name: "doyin",
                            role: "sculptor"
                        }

                        request(app)
                        .put("/api/v1/students" + id)

                        .send(data2)
                        .set("Content-Type", "Application/json")
                        .end(function(err, res) {

                            // expect(res.body).to.be.an("object")
                            expect(res.body.name).to.equal("doyin")
                            expect(res.body.role).to.equal("sculptor")
                        })

                    //})
                    next();
                    
                //})
        })
    })
});