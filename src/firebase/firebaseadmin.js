import admin from 'firebase-admin';
import serviceAccount from './firebaseeserviceaccount.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hotel-buddha-avenue-default-rtdb.firebaseio.com'
});

const db = admin.database();

export { admin, db };
