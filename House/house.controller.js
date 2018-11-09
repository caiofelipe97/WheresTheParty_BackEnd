const House = require('./house.model');

exports.getAll =  function (req, res) {
    House.find({}, function(error, houses) {
        if (error) {
            return res.status(400).json({message:"Falha na operação"});
        } else {
            return res.status(200).json({ data: houses, message: "Operação realizada com sucesso" });
        }
    });
};

exports.getUserHouse = function(req,res){
    House.findById((req.houseId),function(error, house){
        if(error){
            return res.status(400).json({message:"Falha na operação"});
        }else{
            if(!house){
                return res.status(404).json({message:"Casa de show não cadastrada"})
            }else{
                return res.status(200).json({data:house, message:"Operação realizada com sucesso"})
            }
        }
    })
}

exports.getHouseById = function(req,res){
    console.log("Chamou geral")

    House.findById((req.params.houseId),function(error, house){
        if(error){
            console.log("error")
            return res.status(400).json({message:"Falha na operação"});
        }else{
            if(!house){
                console.log("error 2")
                return res.status(404).json({message:"Casa de show não cadastrada"})
            }else{
                console.log("deu bom")
                return res.status(200).json({data:house, message:"Operação realizada com sucesso"})
            }
        }
    })
}

exports.updateHouse = function(req,res){
    let houseUpdated = req.body;
    House.findByIdAndUpdate(req.houseId, houseUpdated, (err, house) => {
        if (err) {
            return res.status(400).json({message: "Casa de show não encontrada"});
        }
        return res.status(201).json({data: house.name, message: "Casa de show editaao com sucesso"});
    });
}