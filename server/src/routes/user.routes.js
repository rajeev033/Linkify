const {
    loginUser,
    registerUser,
    logoutUser,
    updateEmail,
    updatePassword,
    updateUserName,
} = require('../controllers/user.controller');
const { isUserAuthenticated } = require('../middlewares/auth.middleware');
const { getUrls, deleteUrls } = require('../controllers/url.controller');
const { Router } = require('express');
const router = Router();
router.route('/isLoggedIn').get(isUserAuthenticated, (req, res) => {
    res.status(200).json({ message: "User is logged in" });
});
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').get(logoutUser);
router.route('/updateEmail').post(isUserAuthenticated, updateEmail);
router.route('/updatePassword').post(isUserAuthenticated, updatePassword);
router.route('/updateUserName').post(isUserAuthenticated, updateUserName);
//router.route('/updateName').post(isUserAuthenticated, updateName);


router.route('/urls').get(isUserAuthenticated, getUrls);
router.route('/deleteUrl').delete(isUserAuthenticated, deleteUrls);

module.exports = router;