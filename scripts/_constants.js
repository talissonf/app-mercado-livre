const {
  FIREBASE_PROJECT_ID,
  SERVER_BASE_URI,
  ML_CLIENT_ID
} = process.env

let project = FIREBASE_PROJECT_ID
if (!project) {
  try {
    const firebaserc = require('../.firebaserc')
    project = firebaserc.projects.default
  } catch (e) {
    project = 'ecom-app'
  }
}

exports.project = project

exports.baseUri = SERVER_BASE_URI || `https://us-central1-${project}.cloudfunctions.net/app/`

exports.mlRedirecUri = 'https://us-central1-ecom-mercado-livre.cloudfunctions.net/app/mercado-livre/auth'
exports.mlAuthorizeUri = `http://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${ML_CLIENT_ID}`