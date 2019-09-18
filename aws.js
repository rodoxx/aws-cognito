'use strict';

const Amplify = require('aws-amplify');
global.fetch = require('node-fetch');
const args = require('yargs').argv;
const dotenv = require('dotenv');
dotenv.config();

Amplify.default.configure({
    Auth: {
        identityPoolId: process.env.IDENTITY_POOL_ID,
        region: process.env.AWS_REGION, 
        userPoolId: process.env.AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.AWS_USER_POOL_WEB_CLIENT_ID, 
    }
});

function createCognitoUser() {
    if (!args.email) {
        console.log('E-mail address missing.');
        return false;
    }

    if (!args.pass) {
        console.log('Password missing.');
        return false;
    }

    if (!args.name) {
        console.log('Name missing.');
        return false;
    }

    Amplify.Auth.signUp({
        username: args.email,
        password: args.pass,
        attributes: {
          email: args.email,
          name: args.name,
          //'custom:providerId': '12345'
        }
    }).then(resp => {
        console.log(resp);
    }).catch(err => {
        console.log(err);
    })
}

createCognitoUser();
