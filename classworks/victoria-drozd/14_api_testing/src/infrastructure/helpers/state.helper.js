const usersService = require('resources/staff/staff.service').read

exports.getStateData = (user) => ({
  user: {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin
  }
})

exports.getState = async (userId) => {
  const user = await usersService.findOne({ _id: userId })

  return exports.getStateData(user)
}
