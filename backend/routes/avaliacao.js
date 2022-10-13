const router = require("express").Router();
const Avaliacao = require("../model/avaliacao");

// criar avaliação

router.post("/", async (req,res) =>{
    const novaAvaliacao = new Avaliacao(req.body);
    try {
      const avaliacaoSalva = await novaAvaliacao.save();
      res.status(200).json(avaliacaoSalva);
    }catch(err){
        res.status(500).json(err)
    }
})

//ver todas avaliações

router.get("/", async (req,res)=>{
  try{
    const avaliacoes = await Avaliacao.find();
    res.status(200).json(avaliacoes);
  }catch(err){
    res.status(500).json(err)
  }
})


module.exports = router