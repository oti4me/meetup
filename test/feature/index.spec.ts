import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';

const expect = chai.expect;

const request = supertest(new App().getApp());

describe('Test 404 handler', () => {
  it('should return a 404 error on invalid routes', (done) => {
    request
      .post('/api/v1/unvalidroute')
      .expect(404)
      .end((err, res) => {
        const { body } = res;
        if (err) return done(err);
        expect(body.message).to.equal('Not Found - /api/v1/unvalidroute');
        done();
      });
  });
});

describe('Test / route', () => {
  it('should return a 200 success', (done) => {
    const doc = process.env.DOCURL;
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        const { body } = res;
        if (err) return done(err);
        expect(body.message).to
          .equal(`Welcome to the meetup API, please consult \
        the API documentatuon for more info on ${doc}`);
        done();
      });
  });
});
