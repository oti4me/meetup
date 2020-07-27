import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';
import { User } from '../../src/models/User';
import { validUser, invalidEmail } from '../data';
import { decode } from '../../src/helpers/jwt';

const expect = chai.expect;

const request = supertest(new App().getApp());

before((done) => {
  User.destroy({
    where: {},
    truncate: true,
  });
  global['eventEmitter'] = {
    emit: (name, data) => {},
  };
  done();
});

describe('Users Controller', () => {
  describe('Create User POST: /api/v1/users/signup', () => {
    it('should successfully create a new user', (done) => {
      expect(true).to.equal(true);
      request
        .post('/api/v1/users/signup')
        .send(validUser)
        .expect(201)
        .end(async (err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          const [user, error] = await decode(body.token);
          if (error) return done(error);
          expect(user.email).to.equal(validUser.email);
          done();
        });
    });
  });
  describe('Create User Validation POST: /api/v1/users/signup', () => {
    it('should return 409 on duplicate email', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(validUser)
        .expect(409)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal(
            'A user with this email already exists'
          );
          done();
        });
    });
    it('should return 422 for missing email', (done) => {
      request
        .post('/api/v1/users/signup')
        .send(invalidEmail)
        .expect(422)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message[0].msg).to.equal('Invalid email provided');
          done();
        });
    });
  });
  describe('Signin user POST: /api/v1/users/signin', () => {
    it('should successfully log in a registered user', (done) => {
      expect(true).to.equal(true);
      request
        .post('/api/v1/users/signin')
        .send(validUser)
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);
          const { body } = res.body;
          const [user, error] = await decode(body.token);
          if (error) return done(error);
          expect(user.email).to.equal(validUser.email);
          done();
        });
    });
    it('should return a 400 error if password field is empty', (done) => {
      const invalidaPassword = { ...validUser, password: 're' };
      request
        .post('/api/v1/users/signin')
        .send(invalidaPassword)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg).to.equal(
            'Password must be at 4-20 chars long'
          );
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('should return a 422 error if email field is invalid', (done) => {
      request
        .post('/api/v1/users/signin')
        .send(invalidEmail)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg).to.equal('Invalid email');
          expect(res.status).to.equal(422);
          done();
        });
    });
  });
});
