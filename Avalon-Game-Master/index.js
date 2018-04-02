// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';

const {DialogflowApp} = require('actions-on-google');
const functions = require('firebase-functions');
const main = require('./main');

//Action
const WELCOME_ACTION = 'welcome';
const WELCOMEYES_ACTION = 'welcomeYes';
const WELCOMENO_ACTION = 'welcomeNo';
const ASKMORDRED_ACTION = 'askMordred';
const ASKMORGANA_ACTION = 'askMorgana';
const ASKOBERON_ACTION = 'askOberon';
const OPTIONALCHARACTER_ACTION = 'optionalCharacter';
const VOICECHOOSECHARACTER_ACTION = 'voiceChooseCharacter';

//Fallback Action
const WELCOMEYESFALLBACK_ACTION = 'welcomeYesFallback';

//Argument
const PERCIVAL_ARGUMENT = 'Percival';
const MORDRED_ARGUMENT = 'Mordred';
const MORGANA_ARGUMENT = 'Morgana';
const OBERON_ARGUMENT = 'Oberon';
const YES_ARGUMENT = 'Yes';
const NO_ARGUMENT = 'No';

//Context

//List and carousel

//Intent Fallback
const GENERAL_FALLBACK = ['Sorry, what was that?', 'One more time', 'Sorry, I missed that'];
const VOICEPROBLEM_FALLBACK = ['Do you have problem with voice input?'];


exports.AvalonBoardgame = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    //Adjust for audio ouput and screen supprted
    let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

    //Create functions to handle requests here
    function welcome (app) {
        console.log('welcome');
        app.ask(app.buildRichResponse().addSimpleResponse('Welcome to Avalon game master. A game of hidden royalty. Do you have optional character except Merlin and Assassin?').addSuggestions(['Yes', 'No']));
    }

    function welcomeYes (app) {
        console.log('welcomeYes');
        app.ask(app.buildRichResponse().addSimpleResponse('Which one do yo want to play with? Percival, Mordred, Morgana or Oberon').addSuggestions(['Percival', 'Mordred', 'Morgana', 'Oberon']));
    }
    
    function welcomeNo (app) {
        console.log('welcomeNo');
        app.tell(main.normal);
    }

    function optionalCharacter(app) {
        console.log('optionalCharacter');
        let percivalArg = app.getArgument(PERCIVAL_ARGUMENT);
        let mordredArg = app.getArgument(MORDRED_ARGUMENT);
        let morganaArg = app.getArgument(MORGANA_ARGUMENT);
        let oberonArg = app.getArgument(OBERON_ARGUMENT);
        var check = {
            percival: null,
            mordred: null,
            morgana: null,
            oberon: null,
        };
        if (percivalArg === null) {
            check.percival = 0;
            app.data.checkPercival = check.percival;
        } else if (percivalArg === 'Percival') {
            check.percival = 1;
            app.data.checkPercival = check.percival;
        } else {
            return check.percival;
        }
        if (mordredArg === null) {
            check.mordred = 0;
            app.data.checkMordred = check.mordred;
        } else if (mordredArg === 'Mordred') {
            check.mordred = 1;
            app.data.checkMordred = check.mordred;
        } else {
            return check.mordred;
        }
        if (morganaArg === null) {
            check.morgana = 0;
            app.data.checkMorgana = check.morgana;
        } else if (morganaArg === 'Morgana') {
            check.morgana = 1;
            app.data.checkMorgana = check.morgana;
        } else {
            return check.morgana;
        }
        if (oberonArg === null) {
            check.oberon = 0;
            app.data.checkOberon = check.oberon;
        } else if (oberonArg === 'Oberon') {
            check.oberon = 1;
            app.data.checkOberon = check.oberon;
        } else {
            return check.oberon;
        }
        let percival = app.data.checkPercival;
        let mordred = app.data.checkMordred;
        let morgana = app.data.checkMorgana;
        let oberon = app.data.checkOberon;
        speak(app, percival, mordred, morgana, oberon);
    }
    
    function welcomeYesFallback (app) {
        console.log('welcomeYesFallback');
            app.ask(app.buildRichResponse().addSimpleResponse('Let\'s try again. Do you have Percival?').addSuggestions(['Yes', 'No']));
    }
    
    function askMordred (app) {
        console.log('askMordred');
        let percivalArg = app.getArgument(YES_ARGUMENT);
        var checkPercival;
        if (percivalArg === 'Yes') {
            checkPercival = 1;
            app.data.percival = checkPercival;
        } else {
            checkPercival = 0;
            app.data.percival = checkPercival;
        }
        app.ask(app.buildRichResponse().addSimpleResponse('Do you have Mordred?').addSuggestions(['Yes', 'No']));
    }
    
    function askMorgana (app) {
        console.log('askMorgana');
        let mordredArg = app.getArgument(YES_ARGUMENT);
        var checkMordred;
        if (mordredArg === 'Yes') {
            checkMordred = 1;
            app.data.mordred = checkMordred;
        } else {
            checkMordred = 0;
            app.data.mordred = checkMordred;
        }
        app.ask(app.buildRichResponse().addSimpleResponse('Do you have Morgana?').addSuggestions(['Yes', 'No']));
    }
    
    function askOberon (app) {
        console.log('askOberon');
        let morganaArg = app.getArgument(YES_ARGUMENT);
        var checkMorgana;
        if (morganaArg === 'Yes') {
            checkMorgana = 1;
            app.data.morgana = checkMorgana;
        } else {
            checkMorgana = 0;
            app.data.morgana = checkMorgana;
        }
        app.ask(app.buildRichResponse().addSimpleResponse('Do you have Oberon?').addSuggestions(['Yes', 'No']));
    }

    function voiceChooseCharacter(app) {
        console.log('voiceChooseCharacter');
        let oberonArg = app.getArgument(YES_ARGUMENT);
        var checkOberon;
        if (oberonArg === 'Yes') {
            checkOberon = 1;
            app.data.oberon = checkOberon;
        } else {
            checkOberon = 0;
            app.data.oberon = checkOberon;
        }
        let percival = app.data.percival;
        let mordred = app.data.mordred;
        let morgana = app.data.morgana;
        let oberon = app.data.oberon;
        speak(app, percival, mordred, morgana, oberon);
    }

    let actionMap = new Map();
    actionMap.set(WELCOME_ACTION, welcome);
    actionMap.set(WELCOMEYES_ACTION, welcomeYes);
    actionMap.set(WELCOMENO_ACTION, welcomeNo);
    actionMap.set(WELCOMEYESFALLBACK_ACTION, welcomeYesFallback);
    actionMap.set(ASKMORDRED_ACTION, askMordred);
    actionMap.set(ASKMORGANA_ACTION, askMorgana);
    actionMap.set(ASKOBERON_ACTION, askOberon);
    actionMap.set(OPTIONALCHARACTER_ACTION, optionalCharacter);
    actionMap.set(VOICECHOOSECHARACTER_ACTION, voiceChooseCharacter);
    app.handleRequest(actionMap);
});

function speak (app, percival, mordred, morgana, oberon) {
    console.log('speak');
    if ((percival === 1) && (mordred === 0) && (morgana === 0) && (oberon === 0)) {
        app.tell(main.percival);
    } else if ((percival === 0) && (mordred === 1) && (morgana === 0) && (oberon === 0)) {
        app.tell(main.mordred);
    } else if ((percival === 1) && (mordred === 1) && (morgana === 0) && (oberon === 0)) {
        app.tell(main.percivalMordred);
    } else if ((percival === 1) && (mordred === 1) && (morgana === 1) && (oberon === 0)) {
        app.tell(main.morgana);
    } else if ((percival === 1) && (mordred === 1) && (morgana === 1) && (oberon === 1)) {
        app.tell(main.oberon);
    } else {
        let unsupport = unknownCharacter(app, percival, mordred, morgana, oberon);
        app.ask(app.buildRichResponse().addSimpleResponse('Sorry! I can\'t set-up with ' + unsupport + ' Please choose difference one.').addSuggestions(['Percival', 'Mordred', 'Percival + Mordred', 'Percival + Mordred + Morgana', 'Percival + Mordred + Morgana + Oberon']));
    }
}

function unknownCharacter (app, percival, mordred, morgana, oberon) {
    console.log('unknownCharacter');
    var tell;
    if ((percival === 1) && ((morgana === 1) || (oberon === 1))) {
        if ((morgana === 1) && (oberon === 0)) {
            tell = 'Percival and Morgana.';
        } else if ((morgana === 0) && (oberon === 1)) {
            tell = 'Percival and Oberon.';
        } else {
            tell = 'Percival, Morgana and Oberon.';
        }
    } else if ((percival === 0) && (mordred === 0) && (morgana === 1) && (oberon === 0)) {
        tell = 'only Morgana.';
    } else if ((percival === 0) && (mordred === 0) && (morgana === 0) && (oberon === 1)) {
        tell = 'only Oberon.';
    } else if ((mordred === 1) && ((morgana ===1) || (oberon ===1))) {
        if ((morgana === 1) && (oberon === 0)) {
            tell = 'Mordred and Morgana.';
        } else if ((morgana === 0) && (oberon === 1)) {
            tell = 'Mordred and Oberon.';
        } else {
            tell = 'Mordred, Morgana and Oberon.';
        }
    } else if ((morgana === 1) && (oberon === 1)) {
        tell = 'Morgana and Oberon.';
    } else {
        tell = 'your given character.';
    }
    return tell;
}