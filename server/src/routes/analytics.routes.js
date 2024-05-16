const {Router}=require('express');
const { isUserAuthenticated } = require('../middlewares/auth.middleware');
const {getAnalytics}=require('../controllers/analytics.controller');
const router=Router();
router.route('/getAnalytics').get(isUserAuthenticated,getAnalytics);
module.exports=router;
