export default {
  firebase: {
    options: {
      apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
      projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
      messagingSenderId:
        process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
      appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID',
      measurementId:
        process.env.FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'YOUR_DATABASE_URL',
    },
    cert: {
      type: process.env.FIRESTORE_TYPE || 'YOUR_FIRESTORE_TYPE',
      project_id:
        process.env.FIRESTORE_PROJECT_ID || 'YOUR_FIRESTORE_PROJECT_ID',
      private_key_id:
        process.env.FIRESTORE_PRIVATE_KEY_ID || 'YOUR_FIRESTORE_PRIVATE_KEY_ID',
      private_key:
        process.env.FIRESTORE_PRIVATE_KEY || 'YOUR_FIRESTORE_PRIVATE_KEY',
      client_email:
        process.env.FIRESTORE_CLIENT_EMAIL || 'YOUR_FIRESTORE_CLIENT_EMAIL',
      client_id: process.env.FIRESTORE_CLIENT_ID || 'YOUR_FIRESTORE_CLIENT_ID',
      auth_uri: process.env.FIRESTORE_AUTH_URI || 'YOUR_FIRESTORE_AUTH_URI',
      token_uri: process.env.FIRESTORE_TOKEN_URI || 'YOUR_FIRESTORE_TOKEN_URI',
      auth_provider_x509_cert_url:
        process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL ||
        'YOUR_FIRESTORE_AUTH_PROVIDER_X509_CERT_URL',
      client_x509_cert_url:
        process.env.FIRESTORE_CLIENT_X509_CERT_URL ||
        'YOUR_FIRESTORE_CLIENT_X509_CERT_URL',
      universe_domain:
        process.env.FIRESTORE_UNIVERSE_DOMAIN ||
        'YOUR_FIRESTORE_UNIVERSE_DOMAIN',
    },
  },
  plaid: {
    client_id: process.env.PLAID_CLIENT_ID,
    client_secret: (process.env.PRODUCTION = true
      ? process.env.PLAID_CLIENT_SECRET_DEVELOPMENT
      : process.env.PLAID_CLIENT_SECRET_SANDBOX),
  },
};
