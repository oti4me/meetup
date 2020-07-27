import chai from 'chai';
import supertest from 'supertest';
import App from '../../src/app';
import { Group } from '../../src/models/index';
import { validUser } from '../data';
import { encode } from '../../src/helpers/jwt';

const expect = chai.expect;

const request = supertest(new App().getApp());
let token: any;

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

  done();
});

describe('Group Controller', () => {
  describe('Create Group POST: /api/v1/groups/create', () => {
    it('should successfully create a new group', (done) => {
      const name = 'my group';
      request
        .post('/api/v1/groups/create')
        .set({ authorization: token })
        .send({ name })
        .expect(201)
        .end((err, res) => {
          const { body } = res.body;
          if (err) return done(err);
          expect(body.name).to.equal(name);
          done();
        });
    });
  });
  describe('Create Group validation POST: /api/v1/groups/create', () => {
    it('should return a 422 error if group name is invalid', (done) => {
      const name = 'my';
      request
        .post('/api/v1/groups/create')
        .set({ authorization: token })
        .send({ name })
        .expect(422)
        .end((err, res) => {
          const { message } = res.body;
          if (err) return done(err);
          expect(message[0].msg).to.equal('Name must be at 4-20 chars long');
          done();
        });
    });
  });
});
