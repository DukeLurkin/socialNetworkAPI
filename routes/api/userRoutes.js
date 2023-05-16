const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users All users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId get Single user
router.route('/:userId').get(getSingleUser);

// /api/students/:studentId/assignments
router.route('/:userId/').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
