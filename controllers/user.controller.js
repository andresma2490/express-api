const { User } = require('../models');
const bcrypt = require('bcrypt');
const { UniqueConstraintError } = require('sequelize');
const jwt = require('jsonwebtoken');

class UserController {
    constructor() {
    }

    // returns a list of users
    getUsers(req, res){
        User.findAll()
        .then(users =>{
            res.json({
                data: users,
            });
        })
        .catch(error =>{
            res.status(500).json({
                message: "algo salio mal, vuelve a intentar",
                data: {}
            });
        });
    }

    // create a new user
    createUser(req, res){
        const { email, password, username } = req.body;
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, (error, hash) =>{
            User.create({
                id: email,
                password: hash,
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
            .catch(error =>{
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
        }); 
    }

    // returns an user
    getUser(req, res){
        const { email } = req.params;
        User.findOne({
            where: {
                id: email
            }
        })
        .then(user =>{
            res.json(user);
        })
        .catch(error =>{
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
            }
        })
        .then(rowCount => {
            res.json({
                message: "usuario actualizado",
            });
        })
        .catch(error =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

    // delete an user
    deleteUser(req, res){
        const { email } = req.params;
        User.destroy({
            where: {
                id: email
            }
        })
        .then(rowCount => {
            res.json({
                message: "usuario eliminado",
                count: rowCount
            });
        })
        .catch(error =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

    // 
    login(req, res){
        const { email, password } = req.body;
        User.findOne({
            where: {
                id: email
            }
        })
        .then(user =>{
            if(!user){
                res.json({
                    message: 'Por favor revisa tu email'
                });
            }else{
                bcrypt.compare(password, user.password, (error, result) =>{
                    if(result == true){
                        // create the token
                        const token = jwt.sign({
                                id: user.id,
                                username: user.username
                            }, 'secretTokenHere', {
                                expiresIn: 86400
                            })
                        res.json({
                            token: token
                        });
                    }else{
                        res.json({
                            message: 'Contraseña incorrecta'
                        });
                    }
                });
            }
        })
        .catch(error =>{
            res.status(500).json({
                message: 'Algo salio mal, vuelve a intentar',
                data: {}
            });
        });
    }

}

module.exports = UserController;