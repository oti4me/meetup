import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';
import { Group } from '../../src/models/index';
import { validUser, validUser1, invalidToken } from '../data';
import { encode } from '../../src/helpers/jwt';

const expect = chai.expect;

const request = supertest(new App().getApp());
let token: any;
let token1: any;
const group = { name: 'my group' };

before(async (done) => {
  encode(validUser).then((result) => {
    const [tkn, err] = result;
    if (err) return done(err);
    token = tkn;
    Group.destroy({
      where: {},
      truncate: true,
    });
  });
  encode(validUser1).then((result) => {
    const [tkn, err] = result;
    if (err) return done(err);
    token1 = tkn;
    Group.destroy({
      where: {},
      truncate: true,
    });
  });

  done();
});

describe('Group Controller', () => {
  describe('Create Group POST: /api/v1/groups', () => {
    it('should successfully create a new group', (done) => {
      request
        .post('/api/v1/groups')
        .set({ authorization: token })
        .send(group)
        .expect(201)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.name).to.equal(group.name);
          done();
        });
    });
  });
  describe('Create Group validation POST: /api/v1/groups', () => {
    it('should return a 422 error if group name is invalid', (done) => {
      const name = 'my';
      request
        .post('/api/v1/groups')
        .set({ authorization: token })
        .send({ ...group, name: 'ty' })
        .expect(422)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message[0].msg).to.equal('Name must be at 4-64 chars long');
          done();
        });
    });
  });

  describe('Update Group PUT: /api/v1/groups/:goupId', () => {
    it('should successfully update a group', (done) => {
      const name = 'group new name';
      request
        .put('/api/v1/groups/1')
        .set({ authorization: token })
        .send({ ...group, name })
        .expect(200)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.name).to.equal(name);
          done();
        });
    });
  });
  describe('Update Group Validation PUT: /api/v1/groups/:goupId', () => {
    it('should return a 422 error if provide with invalid group name', (done) => {
      const name = 'gro';
      request
        .put('/api/v1/groups/1')
        .set({ authorization: token })
        .send({ ...group, name })
        .expect(422)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message[0].msg).to.equal(
            'Name must be at 4-64 chars long'
          );
          done();
        });
    });
  });

  describe('Update Group Validation PUT: /api/v1/groups/:goupId', () => {
    it('should return a 404 if a group with provided id does not exist', (done) => {
      const name = 'group 1';
      request
        .put('/api/v1/groups/132')
        .set({ authorization: token })
        .send({ ...group, name })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Group not found');
          done();
        });
    });
  });
  describe('Token POST: /api/v1/groups', () => {
    it('should return a 401 error if token is empty', (done) => {
      request
        .post('/api/v1/groups')
        .set({ authorization: '' })
        .send(group)
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('Unauthorized Access');
          done();
        });
    });
    it('should return a 401 error token is invalid', (done) => {
      request
        .put('/api/v1/groups/1')
        .set({ authorization: invalidToken })
        .send(group)
        .expect(500)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('invalid token');
          done();
        });
    });
  });
});
