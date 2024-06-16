const uuidv1 = require('uuid/v1')

module.exports = function ({ config, collections }) {
  const usersCollection = collections.usersCollection

  return {
    signIn: async function (data) {
      try {
      } catch (e) {
        console.error(e)
      }
    },
    signOut: async function () {
      try {
      } catch (e) {
        console.error(e)
      }
    },
    update: async function (sampleId, sample) {
      try {
      } catch (e) {
        console.error(e)
      }
    },
    delete: async function (sampleId) {
      try {
      } catch (e) {
        console.error(e)
      }
    }
  }
}
