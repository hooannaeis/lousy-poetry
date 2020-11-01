// the netlify build process needs an env file to exist in order for the variables in it to be
// useable elsewhere
// this is some stupid workaround
// https://community.netlify.com/t/support-guide-using-environment-variables-on-netlify-correctly/267/5
const fs = require('fs')
fs.writeFileSync('./.env', `AFIREBASE_API_KEY=${process.env.FIREBASE_API_KEY}\n FIREBASE_AUTH_DOMAIN=${process.env.FIREBASE_AUTH_DOMAIN}\n FIREBASE_DATABASE_URL=${process.env.FIREBASE_DATABASE_URL}\n FIREBASE_PROJECT_ID=${process.env.FIREBASE_PROJECT_ID}\n FIREBASE_STORAGE_BUCKET=${process.env.FIREBASE_STORAGE_BUCKET}\n FIREBASE_MESSAGING_SENDER_ID=${process.env.FIREBASE_MESSAGING_SENDER_ID}\n FIREBASE_APP_ID=${process.env.FIREBASE_APP_ID}\n `)