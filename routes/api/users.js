const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/user.controller');
const SocialUserController = require('../../controllers/socialuser.controller');
const userController = new UserController();
const socialUserController = new SocialUserController()

router.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/auth/google' }),
socialUserController.getToken);

router.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/auth/facebook' }),
socialUserController.getToken);

// curl -H "Authorization: Bearer <token>" http://localhost:8000/api/users/isauth
router.get('/isauth', passport.authenticate(['jwt', 'socialJWT'], { session: false }),
function(req, res){
    res.send('is auth');
});

'CRUD'
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;