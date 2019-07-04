process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Tenant = require("../tenant/tenant");
const Company = require("../company/company");

let should = chai.should();
chai.use(chaiHttp);

describe("Company", () => {
  beforeEach(done => {
    Company.remove({}, err => {
      done();
    });
  });

  describe("/GET tenants", () => {
    it("it should raise error when tenant header is empty", done => {
      chai
        .request(server)
        .get("/v1/companies")
        .set("tenant", '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.property("message");
          done();
        });
    });
  });
});
