const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const userController = new UserController();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;