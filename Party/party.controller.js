const Party = require("./party.model");
const House = require("../House/house.model");

exports.getAll =  function (req, res) {
    console.log("entrou") ;
    Party.find({}, function(error, shows) {
        if (error) {
            res.status(400).json({message:"Falha na operação"});
        } else {
            res.status(200).json({ data: shows, message: "Operação realizada com sucesso" });
        }
    });
};

exports.getMyHouseShows = function(req,res){
    Party.find({house: req.houseId}, function(error, shows) {
        if (error) {
            return res.status(400).json({message:"Falha na operação"});
        } else {
            return res.status(200).json({ data: shows, message: "Operação realizada com sucesso" });
        }
    });
}

exports.getHouseShows = function(req,res){
    let houseId = req.params.houseId;
    Party.find({house: houseId}, function(error, shows) {
        if (error) {
            return res.status(400).json({message:"Falha na operação"});
        } else {
            return res.status(200).json({ data: shows, message: "Operação realizada com sucesso" });
        }
    });
}

exports.createHouseParty = function(req,res){
    console.log("criando nova festa");
    let newParty = new Party(req.body);
    newParty.house = req.houseId;
    newParty.save().then((party)=>{
        if(!party){
            res.status(400).json({message: "Erro"})
        }else{
            res.status(200).json({message: "Festa criada com sucesso"})
        }
    })
}