process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Tenant = require("../tenant/tenant");

let should = chai.should();
chai.use(chaiHttp);

describe("Tenant", () => {
  beforeEach(done => {
    Tenant.remove({}, err => {
      done();
    });
  });

  describe("/GET tenants", () => {
    it("it should GET all the tenants", done => {
      chai
        .request(server)
        .get("/v1/tenants")
        .set("superuser", process.env.SUPERUSER)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST tenant", () => {
    it("it should create a tenant", done => {
      const tenant = { name: 'Ershadul'};
      chai
        .request(server)
        .post("/v1/tenants")
        .send(tenant)
        .set("superuser", process.env.SUPERUSER)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          done();
        });
    });
  });

  describe("/POST tenant", () => {
    it("it should not create a tenant", done => {
      const tenant = {};
      chai
        .request(server)
        .post("/v1/tenants")
        .send(tenant)
        .set("superuser", process.env.SUPERUSER)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          // res.body.should.have.property('name');
          done();
        });
    });
  });
});
