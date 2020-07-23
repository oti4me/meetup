# Meeptup NG

## Introduction

**`Meetup NG`** is a social network platform with the intention to build stronger relation with loved ones by send text, images, videos, and voice call. Expected features;

- User Signup.
- User Signin.
- Create channel.
- Add users to channel.
- Group chat.
- Private chat.
- Send data {images, videos, file}.
- Make vioce call.
- Hopefully Video calls.

## Installation and Setup

- Install NodeJs
- Install Postgres
- Navigate to a directory of choice on `terminal`.
- Clone this repository on that directory.

  > git clone https://github.com/oti4me/meetup.git

- Navigate to the repo's folder on your computer
- `cd meetup/`
- Install the application's dependencies using `npm install`

  #### Note

  - In order to begin using, you need to have [NodeJs](https://nodejs.org) and **npm** installed on your system.
  - For database you need to install **PostGres** locally or setup with an online client eg. **ElephantSql**
  - Setup Database according to setting in server/config/config.js and the env.example file.
  - Migrate the database sequelize db:migrate
  - Create two (2) databases one for **development** and the other for **testing**
  - Change database config variables in the src/config/dbConfig.ts and .env file, based on your own db set-up
  - In other to interact effectively with the endpoints, install and use [Postman](https://www.getpostman.com/)

- Run the app
  - `npm run dev`
  - Running the command above will run the app at `localhost://3001` or the port provided in .env file.

## Dependencies

- See Package.json for reference

## Tests

- The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
- To run the tests, navigate to the project's folder and open
- Issue the following command on terminal.
- `npm test`
- If the tests are successful, they will complete without failures or errors.

## Technologies

- [ECMAScript 7](http://es7-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
- [Tyscript:](https://www.typescriptlang.org/) A superset of javascript with runtime type checking capability

# Coding Style

- Airbnb

# Language

- Tyscript

## Api Documentation

\*[Coming soom]()

## Limitations

\*[Coming soom]()

## Contributions

Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:

- Fork the project to your repository then clone it to your local machine.
- Create a new branch and make features that will enhance it.
- If the you wish to update an existing enhancement submit a pull request.
- If you find bugs in the application, create a `New Issue` and let me know about it.
- If you need clarification on what is not clear, contact me via mail [h.otighe@gmail.com](mailto:h.otighe@gmail.com)
- Convention used in this project is found in this [Wiki](https://github.com/oti4me/meetup/wiki)

## Author

    Henry Otighe

## License & Copyright

[Coming soon]()
