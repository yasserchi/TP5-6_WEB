const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')

chai.should()
chai.use(chaiHttp)


/*
les differents cas:
- un login et mot de passe correct 
- absence login
- absence de mot de passe
- mauvais login ou mauvais mot de passe
*/

describe('Tests d\'authenfication', () => {
  it('authentification reussie (login correct et mot de passe correspondant)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro', password: 'pedro_mdp'})
      .end((err, res) => {  
        res
          .should
          .have 
          .status(200)
        res.should.be.json
        res.body.should.have.property("access_token");
        
        done()
      })
  })

  it('authentification echec (login absent)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({password: 'pedro_mdp'})
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        
        done()
      })
  })

  it('authentification echec (mot de passe absent)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro'})
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        
        done()
      })
  })

  it('authentification echec (mauvais mdp)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro', password: 'mauvais_mdp'})
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        
        done()
      })
  })

  it('acces refuse (mauvais token)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro', password: 'pedro_mdp'})
      .end((err, res) => {
        const token = 'mauvais_token';
        chai
          .request(app)
          .get('/v1/auth/verifyaccess')
          .set('Authorization', 'bearer ' + 'mauvais_token')
          .end((err, res) => {
            res
              .should
              .have
              .status(401)
            res
              .should
              .be
              .json
            res
              .body
              .should
              .have
              .property("message");
            res
              .body
              .message
              .should
              .equal("Unauthorized");
        done()
          })
      })
  })

  it('acces autorise (bon token)', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({login: 'pedro', password: 'pedro_mdp'})
      .end((err, res) => {
        chai
          .request(app)
          .get('/v1/auth/verifyaccess')
          .set('Authorization', 'bearer ' + res.body.access_token)
          .end((err, res) => {
            res
              .should
              .have
              .status(200)
            res
              .should
              .be
              .json
            res
              .body
              .should
              .have
              .property("message");
            res
              .body
              .message
              .should
              .equal("Ok");
        done()
          })
      })
  
    })
})