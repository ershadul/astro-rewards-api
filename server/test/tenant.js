process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Tenant = require("../tenant/tenant");

let should = chai.should();

chai.use(chaiHttp);

describe('Tenant', () => {
  beforeEach((done) => {
    Tenant.remove({}, err => {
      done();
    });
  });

  describe("/v1/tenants", () => {
    it("it should GET all the tenants", done => {
      chai
        .request(server)
        .get("/v1/tenants")
        .set('superuser', process.env.SUPERUSER)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
