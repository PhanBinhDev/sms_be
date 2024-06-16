const uuidv1 = require('uuid/v1')

module.exports = function ({ config, collections }) {
  const usersCollection = collections.usersCollection
  const rolesCollection = collections.rolesCollection

  return {
    createUser: async function (data) {
      try {
        data.createdAt = new Date()
        data.updatedAt = new Date()
        const { insertedCount } = await usersCollection.insertOne(data)

        if (insertedCount === 0) {
          return [null, 'Failed to insert user']
        }

        return [, data]
      } catch (e) {
        console.error(e)
      }
    },
    retrieveAll: async function () {
      try {
        const users = await usersCollection
          .find({
            role: 'student'
          })
          .toArray()

        if (!users) {
          return [null, 'Something went wrong, fail to retrieve all users']
        }
        return [, users]
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
    },
    createRole: async function (roles) {
      try {
        const { insertedCount } = await rolesCollection.insertMany(roles)
        console.log(insertedCount)
        return [, roles]
      } catch (e) {
        console.error(e)
      }
    }
  }
}
