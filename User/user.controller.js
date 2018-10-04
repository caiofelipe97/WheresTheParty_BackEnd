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
            return res.status(400).json({message:"Falha na operação", status:400});
        } else {
            if (user == null) {
                return res.status(404).json({message:"Usuário não encontrado", status: 404});
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
    userSaved = await newUser.save();
    res.status(200).json({message: "Registro realizado com sucesso"})
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
            let token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: 86400});
            let data = {
                message: 'User althentication Sucessfull',
                token: token,
                id: user._id
            };
            return res.status(200).json(data);
        }
    }).catch(function (e) {
        callback({result: e.message, status: 500});
    })
}
