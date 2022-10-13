const mongoose = require("mongoose");

const AvaliacaoSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
        },
        titulo:{
            type:String,
            require:true,
            min:3
        },
        descr:{
            type:String,
            require:true,
            min:3,
        },
        avaliacao:{
            type:Number,
            require:true,
            min:1,
            max:5,
        },
        lat:{
            type:Number,
            require:true

        },
        lon:{
            type:Number,
            require:true

        },
    },
{timestamps: true}
);

module.exports = mongoose.model("Avaliacao", AvaliacaoSchema);