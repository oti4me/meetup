import faker from 'faker';

export const validUser = {
  username: 'james',
  firstName: 'James',
  lastName: 'Gosling',
  email: 'faker@internet.com',
  phone: '07000000000',
  password: 'faker.name',
};

export const invalidEmail = {
  username: 'james',
  firstName: 'James',
  lastName: 'Gosling',
  email: 'fanternet.com',
  phone: '07000000000',
  password: 'faker.name',
};
