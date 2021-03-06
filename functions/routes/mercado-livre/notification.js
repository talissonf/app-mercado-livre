const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'

const NOTIFICATION_COLLECTION = 'ml_notifications'

const { handleMLNotification } = require('../../services/tasks')

exports.post = async ({ admin }, req, res) => {
  const notification = req.body
  try {
    const docRef = admin
      .firestore()
      .collection(NOTIFICATION_COLLECTION)
      .doc(notification.resource.replace(/\//g, ''))

    await docRef.set(notification, { merge: true })
    const snap = await docRef.get()

    await handleMLNotification(snap)

    return res.status(200).send('Ok')

  } catch (error) {
    if (error.name === SKIP_TRIGGER_NAME) {
      res.send(ECHO_SKIP)
    } else {
      res.status(500)
      const { message } = error
      res.send({
        error: ECHO_API_ERROR,
        message
      })
    }
  }
}
