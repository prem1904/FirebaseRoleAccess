import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';

var serviceAccount = require("/home/prem/Downloads/myapplication-4c621-firebase-adminsdk-rzzhq-d8ca2b13cc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myapplication-4c621.firebaseio.com"
});


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
routesConfig(app)



export const api = functions.https.onRequest(app);
