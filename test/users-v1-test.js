const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')

chai.should()
chai.use(chaiHttp)

describe('Users tests', () => {

  let token

  before((done) => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro', password: 'pedro_mdp'})
      .end((err, res) => {
        token = res.body.access_token
        done()
    })
  });



  it('should list ALL users on /v1/users GET', done => {
    chai
      .request(app)
      .get('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('array')
        done()
      })
  })
  it('should list a SINGLE user on /v1/users/<id> GET', done => {
    chai
      .request(app)
      .get('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .id
          .should
          .equal('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        done()
      })
  })

  it('should list an UNKNOW user on /v1/users/<id> GET', done => {
    chai
      .request(app)
      .get('/v1/users/45745c60-unknow-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        res.should.be.json
        done()
      })
  })

    it('should add a SINGLE user on /v1/users POST', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({name: 'Robert', login: 'roro', age: 23, password: 'password_robert'})
      .end((err, res) => {
        res
          .should
          .have
          .status(201)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .should
          .have
          .property('name')
        res
          .body
          .name
          .should
          .equal('Robert')
        res
          .body
          .should
          .have
          .property('age')
        res
          .body
          .age
          .should
          .equal(23)
        res
          .body
          .should
          .have
          .property('login')
        res
          .body
          .login
          .should
          .equal('roro')
        res
          .body
          .should
          .have
          .property('password')
        done()
      })
  })

  it('should add a INVALID user on /v1/users POST (wrong parameter)', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({name: 'Robert', login: 'roro', age: 23, password: 'password_robert', wrongparam: 'value'})
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should add an EMPTY user on /v1/users POST', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should update a SINGLE user on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .send({name: 'Robertinio', password: 'password_robertinio'})
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .id
          .should
          .equal('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        res
          .body
          .name
          .should
          .equal('Robertinio')
        res
          .body
          .login
          .should
          .equal('pedro')
        res
          .body
          .should
          .have
          .property('password')
        done()
      })
  })

  it('should update a user with wrong parameters on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .send({wrongparam1: 'Robertinio'})
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should update a UNKNOW user on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-unknow-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .send({name: 'Robertinio'})
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        res.should.be.json
        done()
      })
  })

  it('should delete a SINGLE user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        done()
      })
  })

  it('should delete a UNKNOWN user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/45745c60-unknown-2d42b21b1a3e')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        done()
      })
  })

  it('should delete a NULL ID user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        done()
      })
  })
})