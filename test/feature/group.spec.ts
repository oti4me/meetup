import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';
import { validUser, validUser1, invalidEmail, invalidToken } from '../data';
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
  });
  encode(invalidEmail).then((result) => {
    const [tkn, err] = result;
    if (err) return done(err);
    token1 = tkn;
  });

  done();
});

describe('Group Controller', () => {
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
        .send({ ...group, name })
        .expect(422)
        .end((err, res) => {
          const { message, body } = res.body;
          if (err) return done(err);
          expect(message).to.equal('Request validation failed');
          expect(body[0].msg).to.equal('Name must be at 4-64 chars long');
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
          const { message, body } = res.body;
          expect(message).to.equal('Request validation failed');
          expect(body[0].msg).to.equal('Name must be at 4-64 chars long');
          done();
        });
    });
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
    it('should return a 401 if group does not belong to current user', (done) => {
      const name = 'group 1';
      request
        .put('/api/v1/groups/2')
        .set({ authorization: token })
        .send({ ...group, name })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            'Not authorised to update this group'
          );
          done();
        });
    });
  });
  describe('Add User to Group POST: api/v1/groups/groupId/add-user/:id', () => {
    it('should successfully add a user to a group', (done) => {
      request
        .post('/api/v1/groups/1/user/2')
        .set({ authorization: token })
        .expect(201)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.message).to.equal('User added to group');
          done();
        });
    });
    it('should return 409 if user already a member if the group', (done) => {
      request
        .post('/api/v1/groups/1/user/2')
        .set({ authorization: token })
        .expect(409)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('User alread in this group');
          done();
        });
    });
    it('should return 401 if current user is not the owner of the group', (done) => {
      request
        .post('/api/v1/groups/2/user/1')
        .set({ authorization: token })
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('Not authorised');
          done();
        });
    });
    it('should return 404 if user already a member if the group', (done) => {
      request
        .post('/api/v1/groups/1/user/187')
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('User not found');
          done();
        });
    });
    it('should return 409 if user tries to add self', (done) => {
      request
        .post('/api/v1/groups/1/user/1')
        .set({ authorization: token })
        .expect(409)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('User alread in this group');
          done();
        });
    });
    it('should return 404 if group not found', (done) => {
      request
        .post('/api/v1/groups/1564/user/2')
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('Group not found');
          done();
        });
    });
  });

  describe('Gets User from Group GET: /api/v1/groups', () => {
    it("should successfully gets a user's group", (done) => {
      request
        .get('/api/v1/groups')
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.length).to.gt(0);
          done();
        });
    });
    it('should return 404 if current user not no group nor added to one', (done) => {
      request
        .get('/api/v1/groups')
        .set({ authorization: token1 })
        .expect(404)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message).to.equal(
            'User has not created or added to to a group!!'
          );
          done();
        });
    });
  });

  describe('Remove User from Group DELETE: /api/v1/groups/:goupId/user/:id', () => {
    it('should successfully remove a user from a group', (done) => {
      request
        .delete('/api/v1/groups/1/user/2')
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.message).to.equal('User removed from group');
          done();
        });
    });
    it('should return 401 if current user is not the owner of the group', (done) => {
      request
        .delete('/api/v1/groups/2/user/2')
        .set({ authorization: token })
        .expect(401)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message).to.equal('Not authorised');
          done();
        });
    });
    it('should return 404 if user is a member of the group', (done) => {
      request
        .delete('/api/v1/groups/1/user/254')
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message).to.equal('User not a member of this this group');
          done();
        });
    });
    it('should return 401 if group does not exist', (done) => {
      request
        .delete('/api/v1/groups/154/user/2')
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message).to.equal('Group not found');
          done();
        });
    });
  });
  describe('Delete Group PUT: /api/v1/groups/:goupId', () => {
    it('should successfully delete a group', (done) => {
      request
        .delete('/api/v1/groups/1')
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.message).to.equal('Group deleted');
          done();
        });
    });
    it('should return 401 if group does not belong to current user', (done) => {
      request
        .delete('/api/v1/groups/2')
        .set({ authorization: token })
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('Not authorised to delete this group');
          done();
        });
    });
    it('should return 404 if group does not exist', (done) => {
      request
        .delete('/api/v1/groups/2987')
        .set({ authorization: token })
        .expect(404)
        .end((err, res) => {
          const { body } = res;
          if (err) return done(err);
          expect(body.message).to.equal('Group not found');
          done();
        });
    });
  });
});
