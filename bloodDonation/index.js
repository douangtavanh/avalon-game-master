'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

//Intent

const action = {
  welcome: 'welcome',
  age: 'age',
  weight: 'weight',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  q10: 'q10',
  q11: 'q11',
  q12: 'q12',
  q13: 'q13',
  q14: 'q14',
  q15: 'q15',
  q16: 'q16',
  q17: 'q17',
  q18: 'q18'
}

//Entities

const entities = {
  yes: 'Yes',
  no: 'No',
  number: 'number',
  weight: 'unit-weight'
}


exports.bloodDonation = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  //Create functions to handle request here
  const welcome = (app) => {
    console.log('welcome');
    app.ask(app.buildRichResponse().addSimpleResponse('Welcome to Blood Donation Assisstant, I here to help you to prepare for your blood donation. Are you ready?').addSuggestions(['Yes', 'No']));
  }

  const age = (app) => {
    console.log('age');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask('How old are you?');
    } else {
      app.tell('See you next time');
    }
  }

  const weight = (app) => {
    console.log(weight);
    let age = app.getArgument(entities.number);
    if (age < 17) {
      app.tell('You do not allow to donate blood because ');
    }
    else {
      app.ask('and how about your weight?');
    }
  }

  const q1 = (app) => {
    console.log('q1');
    let weight = app.getArgument(entities.weight);
    if (weight.amount < 45) {
      app.tell('You are not allow to donate blood');
    } else {
      app.ask(app.buildRichResponse().addSimpleResponse('Do you feel fit to donate blood today?').addSuggestions(['Yes', 'No']));
    }
  }

  const q2 = (app) {
    console.log('q2');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Did you get sleep more than six hours last night?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q3 = (app) {
    console.log('q3');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Did you have enough meal before this donation?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q4 = (app) {
    console.log('q4');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Have you taken aspirin, joint pain relief medicine during the last three days?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q5 = (app) {
    console.log('q5');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Did you have antibodies or on medication?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q6 = (app) {
    console.log('q6');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Do you have Asthma, Collapse, Epilepsy, Chronic cough, Tuberculosis, Allergies, Diabetes, Kidney/Heart diseases, Cancer? High blood pressure, Abnormal bleeding?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q7 = (app) {
    console.log('q7');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Did you get any vaccination during the last 14 days or serum during the last 1 year?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q8 = (app) {
    console.log('q8');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Have you or anyone in your family ever had Jaundice/Hepatitis?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q9 = (app) {
    console.log('q9');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Have you or your partner been at risk or treated for sexual transmitted disease especially HIV during the last 1 year?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

  const q10 = (app) {
    console.log('q10');
    let yes = app.getArgument(entities.yes);
    if (yes) {
      app.ask(app.buildRichResponse().addSimpleResponse('Did you have your ear / body piercing, tattoos, made/removed or acupuncture during the last 1 year?').addSuggestions(['Yes', 'No']));
    } else {
      app.tell('You are not allow to donate blood');
    }
  }

let actionMap = new Map();
actionMap.set(action.welcome, welcome);
actionMap.set(action.age, age);
actionMap.set(action.weight, weight);
actionMap.set(action.q1, q1);

app.handleRequest(actionMap);
});
