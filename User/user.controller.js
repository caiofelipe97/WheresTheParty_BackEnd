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
    console.log(userId);
    User.findOne({_id:userId}).populate('house').exec( function(err, user) {
        if (err) {
            return res.status(400).json({message:err});
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

exports.updateUser = async function (req, res) {
    let userId = req.userId;
    let houseId = req.houseId;
    let houseUpdated = req.body.house;
    let userUpdated = req.body;
    User.findByIdAndUpdate(userId,userUpdated, (err,user) => {
        if (err) {
            return res.status(400).json({message: "Usuario não encontrado"});
        }
        console.log(user);
        House.findByIdAndUpdate(houseId, houseUpdated, (err, house) => {
            if (err) {
                return res.status(400).json({message: "Casa de show não encontrada"});
            }
            return res.status(201).json({data: house.name, message: "Perfil atualizado com sucesso"});
        });
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
    console.log("chegou aqui");
    console.log(req.body);
    User.findOne({'email': req.body.email}).then( async(user) => {
        console.log(user);
        bcrypt.compare(req.body.password,
            user.password,
            function(err, valid) {
                console.log(err);
                console.log(valid);
            });
        if(!user){
            return res.status(404).json({ error: "Usuário não existe*"});
        }else{
            // test a matching password
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); // -> Password123: true
                if(!isMatch){
                    console.log("erro de senha");
                    return res.status(400).json( {
                            error: 'Email ou senha incorreta*'
                    })
                }else{
                    let token = jwt.sign({id: user._id, house: user.house}, process.env.JWT_SECRET_KEY, {expiresIn: 86400});
                    console.log(token);
                    let data = {
                        message: 'Usuário autenticado com sucesso',
                        token: token,
                        userId: user._id,
                        houseId: user.house
                    };
                    return res.status(200).json(data);
                }
            });
        }
        });
}

