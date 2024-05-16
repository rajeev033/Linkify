
const {shortenURL, redirectToOriginal} = require('../controllers/url.controller');
const {Router}=require('express');
const { isUserAuthenticated } = require('../middlewares/auth.middleware');
const router=Router();
router.route('/:shortID').get(redirectToOriginal);
router.route('/public/shortenURL').post(shortenURL);
router.route('/private/shortenURL').post(isUserAuthenticated,shortenURL);

module.exports=router;
