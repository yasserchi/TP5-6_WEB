const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')
// importer le middleware


chai.should()
chai.use(chaiHttp)

//initialiser le token à l'aide du middleware
const goodToken = "eyJhbGciOiJSUzI1NiJ9.cGVkcm8.P_mHLsuyJBt53CmSKRUPSkY3agSUV8LAoHvSAKS07B6XfXJxAwub2bKtK33EzxT1mNCGwcbWSEXwRR0HhzvRWA";

describe('Alerts tests', () => {

	it('should not give access', done => {
    	chai
	    	.request(app)
	    	.get('/v1/alerts/search')
	    	.set('Authorization', 'Bearer ' + 'mauvais token')
	    	.end((err, res) => {
	        	res
		        	.should
		        	.have
		        	.status(401)
		        res
		        	.should
		        	.be
		        	.json
		        done()
			})
	})

	it('should create an alert and list it on /v1/alerts/<id> GET', done => {
	    chai
	      	.request(app)
	      	.post('/v1/alerts')
	      	.set('Authorization', 'Bearer ' + goodToken)
	      	.send({ type: 'sea', label: 'test2', status: 'danger', from: '2020-05-21T15:18:18.490Z', to: '2020-05-21T15:18:18.490Z' })
	      	.end((err, res) => {
		        chai
		          	.request(app)
		          	.get('/v1/alerts/' + res.body.id)
		          	.set('Authorization', 'Bearer ' + goodToken)
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
		              		.equal(res.body.id)
		            	done()
		          })
	      	})
	})

	it('should not list an UNKNOW alert on /v1/alerts/<id> GET', done => {
	    chai
	      	.request(app)
	    	.get('/v1/alerts/45745c60-unknow-2d42b21b1a3e')
	      	.set('Authorization', 'Bearer ' + goodToken)
	      	.end((err, res) => {
	        	res
	          		.should
	          		.have
	          		.status(404)
	        	res
	        		.should
	        		.be
	        		.json
	       		done()
	      })
  	})

	it('should list alerts with the status warning on /v1/alerts/search GET', done => {
    	chai
      		.request(app)
      		.post('/v1/alerts')
      		.set('Authorization', 'Bearer ' + goodToken)
      		.send({ type: 'weather', label: 'test3', status: 'warning', from: '2020-05-21T15:18:18.490Z', to: '2020-05-21T15:18:18.490Z' })
      		.end((err, res) => {
        		chai
          			.request(app)
			        .get('/v1/alerts/search')
			        .query({ status: ['warning'] })
			        .set('Authorization', 'Bearer ' + goodToken)
			        .end((err, res) => {
			            res
			              	.should
			              	.have
			              	.status(200)
			            res
			            	.body
			            	.should
			            	.be
			            	.an('array')
			            done()
			        })
      		})
  	})

	it('should not add an INVALID alert on /v1/alerts POST', done => {
    	chai
      		.request(app)
      		.post('/v1/alerts')
      		.set('Authorization', 'Bearer ' + goodToken)
      		.send({ type: 'sea', label: 'tsunami' })
      		.end((err, res) => {
        		res
          			.should
          			.have
          			.status(405)
        		res
        			.should
        			.be
        			.json
        		done()
      		})
  	})

	it("create and update an alert", done => {
    	chai
      		.request(app)
      		.post("/v1/alerts")
      		.set('Authorization', 'Bearer ' + goodToken)
      		.send({ type: 'sea', label: 'test3', status: 'danger', from: '2020-05-21T15:18:18.490Z', to: '2020-05-21T15:18:18.490Z' })
      		.end((err, res) => {
		        chai
		          	.request(app)
		          	.put('/v1/alerts/' + res.body.id)
		          	.set('Authorization', 'Bearer ' + goodToken)
					.send({id: res.body.id, type: 'sea', label: 'test3_update', status: 'danger', from: '2020-05-21T15:18:18.490Z', to: '2020-05-21T15:18:18.490Z' })
		          	.end((err, res) => {
		                res.should.have.status(200)
		                res.body.should.have.property("type")
		                res.body.should.have.property("label")
		                res.body.should.have.property("status")
		                res.body.should.have.property("from")
		                res.body.should.have.property("to")
		                res.body.type.should.equal("sea")
		                res.body.label.should.equal("test3_update")
		                res.body.status.should.equal("danger")
		                res.body.from.should.equal("2020-05-21T15:18:18.490Z")
		                res.body.to.should.equal("2020-05-21T15:18:18.490Z")
		                done()
		            })
		    })
    })

	it('create and delete a SINGLE alert on /v1/alerts/<id> DELETE', done => {
    	chai
      		.request(app)
      		.post('/v1/alerts')
      		.set('Authorization', 'Bearer ' + goodToken)
      		.send({ type: 'sea', label: 'test4', status: 'danger', from: '2020-05-21T15:18:18.490Z', to: '2020-05-21T15:18:18.490Z' })
      		.end((err, res) => {
        		chai
          		.request(app)
          		.delete('/v1/alerts/' + res.body.id)
          		.set('Authorization', 'Bearer ' + goodToken)
          		.end((err, res) => {
            		res
            			.should
            			.be
            			.json
            		res
              			.should
              			.have
              			.status(200)
           			done()
          		})
      		})
  	})
})