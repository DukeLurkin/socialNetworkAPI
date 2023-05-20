const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createThought,
  
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts);
router.route('/:userId').post(createThought);
  
  router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);




module.exports = router;