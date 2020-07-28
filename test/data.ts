import faker from 'faker';

export const validUser = {
  id: 2,
  username: 'james',
  firstName: 'James',
  lastName: 'Gosling',
  email: 'faker@internet.com',
  phone: '07000000000',
  password: 'faker.name',
};

export const validUser1 = {
  id: 3,
  username: 'adamsmith',
  firstName: 'Adams',
  lastName: 'Smith',
  email: 'faker@internet.com',
  phone: '07000000000',
  password: 'faker.name',
};

export const invalidEmail = {
  id: 4,
  username: 'james',
  firstName: 'James',
  lastName: 'Gosling',
  email: 'fanternet.com',
  phone: '07000000000',
  password: 'faker.name',
};

export const invalidToken =
  'eyJhbWciOiJIUzI1KiIsInR5cCI9IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiSGVucnkiLCJsYXN0TmFtZSI6Ik90aWdoZSIsImVtYWlsIjoib3RpNG1lMTJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJvdGk0bWUiLCJwaG9uZSI6IjA3MDY3MTQzMTYxIiwiaWF0IjoxNTk1ODE0OTc4fQ.eVGZpmFbWpD4e5gAsKi5Vtsj2BrluIih1kJqhd8OoYo';
