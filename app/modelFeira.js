//Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Feira = new Schema({
    nomefeira:      {type: String},
    diasemana:      {type: Number, required: true},
    horarioinicio:  {type: Date, default: "2016-01-01T07:00:00.000Z" },
    horariotermino: {type: Date, default: "2016-01-01T12:30:00.000Z"},
    location:       {type: [Number], required: true}, // [Long, Lat]
    endereco:{
      logradouro: {type: String},
      numero:     {type: String},
      bairro:     {type: String },
      cidade:     {type: String },
      estado:     {type: String },
      pais:       {type: String },
      cep:        {type: String },
    },
    naoexiste:  {type: Number}, //Avaliação de uma feira fake
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
Feira.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if(!this.created_at){
    this.created_at = now
  }
  next();
});

//Indexes this schema in 2dsphere format (critical dor running proximity searches)
Feira.index({location: '2dsphere'});

// Exports the UseSchema for use elsewhere. Sets the MongoDB collection to be used as: "foodtrucks"
module.exports = mongoose.model('feira', Feira);
