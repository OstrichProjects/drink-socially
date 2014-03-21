'use strict';

module.exports = {
    db: 'mongodb://heroku:op4JHJHdUrktwoe7qJYA-1t8q0hMSn4ND4Ez_brBP0-SRs0Y5Uup6b9ybGT-fIyy5gVcawRtJlv-aWJoSNzWEw@oceanic.mongohq.com:10017/app23236793',
    app: {
        name: 'Drink Socially'
    },
    facebook: {
        clientID: '250982388421083',
        clientSecret: '212f6a5faa67601025e311d7bcec4753',
        callbackURL: 'http://drink-socially.herokuapp.com/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
