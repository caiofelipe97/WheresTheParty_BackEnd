const User = require('./user.model');
const House = require('../House/house.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * resourcePath: /user
 * description: All about user path
 */

 /**
 * @swagger
 * path: /me
 * operations:
 *   -  httpMethod: GET
 *      summary: Return user logged
 *      responseClass: User
 *      nickname: getUser
 *      consumes: 
 *        - text/html
 */
exports.getUser = function (req, res) {
    const userId = req.userId;
    User.findById(userId, function(err, user) {
        if (err) {
            return res.status(400).json({message:"Falha na operação"});
        } else {
            if (user == null) {
                return res.status(404).json({message:"Usuário não encontrado"});
            } else {
                return res.status(200).json(user);
            }

        }
    });
};

/**
 * @swagger
 * path: /
 * operations:
 *   -  httpMethod: POST
 *      summary: Register 
 *      notes: Returns a user registered
 *      responseClass: User
 *      nickname: register
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: user
 *          description: User object
 *          paramType: query
 *          required: true
 *          dataType: User
 */
exports.register = async function (req, res) {
    let newUser = new User(req.body);
    let newHouse = new House(req.body.house);
    houseSaved = await newHouse.save();
    newUser.house = houseSaved;
    newUser.save().then((user)=>{
        if(!user){
            res.status(400).json({message: "Erro"})
        }else{
            res.status(200).json({message: "Registro realizado com sucesso"})

        }
    })
};

/**
 * @swagger
 * path: /
 * operations:
 *   -  httpMethod: POST
 *      summary: Login 
 *      notes: Returns a data with token and username
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: email
 *          description: User email
 *          paramType: query
 *          required: true
 *          dataType: String
 *        - name: password
 *          description: User password
 *          paramType: query
 *          required: true
 *          dataType: String
 */
exports.login = async function(req,res){
    User.findOne({'email': req.body.email}).select("+password").then((user) => {
        if(!user){
            return res.status(404).json( {
                data: {
                    message: 'Email não registrado'
                }
            })
        } if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json( {
                data: {
                    message: 'Email ou senha incorreta'
                }
            })
        } else {
            let token = jwt.sign({id: user._id, house: user.house}, process.env.JWT_SECRET_KEY, {expiresIn: 86400});
            let data = {
                message: 'Usuário autenticado com sucesso',
                token: token,
                id: user._id
            };
            return res.status(200).json(data);
        }
    }).catch(function (e) {
        callback({result: e.message, status: 500});
    })
}
