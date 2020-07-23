import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';
import { User } from '../../src/models/User';

const expect = chai.expect;

const validUser = {
  username: 'oti4me',
  firstName: 'Henry',
  lastName: 'Otighe',
  email: 'oti4me+211@gmail.com',
  phone: '07067143161',
  password: 'oti4me',
  Jasper: 'this is the shit',
};

const invalidEmail = {
  username: 'oti4me',
  firstName: 'Henry',
  lastName: 'Otighe',
  email: 'oti4megmail.com',
  phone: '07067143161',
  password: 'oti4me',
  Jasper: 'this is the shit',
};

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
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.email).to.equal(validUser.email);
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
});
