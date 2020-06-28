const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/user.controller');
const userController = new UserController();

// curl -H "Authorization: Bearer <token>" http://localhost:8000/api/users/isauth
router.get('/isauth', passport.authenticate('jwt', { session: false }),
    function(req, res){
        res.send('is auth');
    }
);
'CRUD'
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;