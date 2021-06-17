const router = require('express').Router();
const experienceController = require('../controllers/experience.controller');

router.route('/experience').get(experienceController.getExperiences);

router
  .route('/experience/:id')
  .delete(experienceController.deleteExperience)
  .put(experienceController.updateExperience)
  .get(experienceController.getSingleExperience);

router.route('/experience').post(experienceController.createExperience);
// router.route("/upload").post(experienceController.uploadImage);
// router.route("/images").get(experienceController.getUploadImage);
router.route('/session').post(experienceController.addSession);
router.route('/session').get(experienceController.getSingleSession);
router.route('/session').put(experienceController.updateSession);

module.exports = router;
