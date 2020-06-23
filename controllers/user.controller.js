const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize');

class UserController {
    
    constructor() {
    }

    // returns a list of users
    getUsers(req, res){
        User.findAll()
        .then(users =>{
            res.json({
                data: users
            });
        })
        .catch((error) =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

    // create a new user
    createUser(req, res){
        const { email, password, username } = req.body;
        User.create({
            id: email,
            password,
            username
        }, {
            fields: ['id', 'password', 'username']
        })
        .then(newUser =>{            
            res.json({
                message: 'Usuario creado',
                data: newUser
            });
        })
        .catch((error) =>{
            if (error instanceof UniqueConstraintError){
                res.status(500).json({
                    message: 'El email ingresado ya se encuentra registrado',
                    data: {}
                });
            } else{
                res.status(500).json({
                    message: 'Algo salio mal, vuelve a intentar',
                    data: {}
                });
            }
        });  
    }

    // returns an user
    getUser(req, res){
        const { id } = req.params;
        User.findOne({
            where: {
                id
            }
        })
        .then(user =>{
            res.json(user);
        })
        .catch((error) =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

    // update an user
    updateUser(req, res){
        const { email, password, username } = req.body;
        User.update({password, username},
            { where: {
                id: email
            }}
        )
        .then(rowCount => {
            res.json({
                message: "usuario actualizado",
            });
        })
        .catch((error) =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

    // delete an user
    deleteUser(req, res){
        const { id } = req.params;
        User.destroy({
            where: {
                id
            }
        })
        .then(rowCount => {
            res.json({
                message: "usuario eliminado",
                count: rowCount
            });
        })
        .catch((error) =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

}

module.exports = UserController;