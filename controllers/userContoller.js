
const user = require('../models/user');
const User = require('../models/user') ;

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken') ;

exports.signin = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            nom: req.body.nom,
            prenom : req.body.prenom,
            email : req.body.email,
            password: hash
        });

        user.save()
        .then(() => {
            return res.status(201).json({
                status: true,
                message : "Enrigistrement reuissi avec succes",
                data : user
            })
        })
        .catch(error => {
            return res.status(500).json({
                status: false,
                message : "Une erreur s'est produite lors des l'enrigistrement",
                error
            })
        }) ;
    })
    .catch(error => {
        return res.status(500).json({
            status: false,
            message : "Une erreur s'est produite lors de l'encryptage",
            error
        })
    });
}

exports.login = (req, res, next) => {
    user.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            console.log("le user se trouve pas ddans notre bdd");
            return res.status(400).json({
                status: false,
                message: "Le paire email/password n'est pas valide "
            }) ;
        }

        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                console.log("les deux password ne correspondent pas ");
                return res.status(400).json({
                    status: false,
                    message: "Le couple email/pasword n'est pas valide"
                })
            }

            console.log("le couple email/password est valide");
            const token = jwt.sign({userId : user._id},  process.env.ENCODE_TOKEN, { expiresIn: '2h' });

            return res.status(201).json({
                status : true,
                message: "connexion reuissie",
                data: {
                    UserId: user._id,
                    token
                }
            })
        })
        .catch(error => {
            return res.status(500).json({
                status: false,
                message: "Une erreur s'est produite lors de la compairaison des password",
                data: error
            })
        });

    })
    .catch(error => {
        return res.status(500).json({
            status: false,
            message : "Une erreur s'est produit",
            data: error
        })
    });
}