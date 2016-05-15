//Dependencies
var mongoose = require('mongoose');
var User     = require('./model.js');
var Feira    = require('./modelFeira.js');

// Opens App Routes
module.exports = function(app) {

  // GET Routes
  // ===========================
  // Retrieve records for all users in the db
  app.get('/users', function(req, res){
    console.log('get');
    // Uses Mongoose schema to run the search (empty conditions)
    var query = User.find({'age': {$gt: 27}});
    query.exec(function(err, users){
      if(err)
        res.send(err);

      // if no errors are found, it responds with a JSON of all users
      res.json(users);
    });
  });

  // POST Routes
  // =============================
  // Provides methods for saving new users in the db
  app.post('/users', function(req, res){
    // Creates a new User based on the Mongoose schema and the post bo.dy
    var newuser = new User(req.body);

    //New User is saved in the db.
    newuser.save(function(err){
      if(err)
        res.send(err);
      // If no errors are found, it responds with a JSON of the new user
      res.json(req.body);
    });
  });

  // GET Routes
  // ===========================
  // Retrieve records for all users in the db
  app.get('/feira', function(req, res){
    console.log('get');
    // Uses Mongoose schema to run the search (empty conditions)
    var query = Feira.find();
    query.exec(function(err, feiras){
      if(err)
        res.send(err);

      // if no errors are found, it responds with a JSON of all users
      res.json(feiras);
    });
  });

  // POST Routes
  // =============================
  // Provides methods for saving new users in the db
  app.post('/feira', function(req, res){
    console.log(req.body.horarioinicio);
    req.body.horarioinicio = new Date('2016-01-01T' + req.body.horarioinicio + ':00.000Z');
    console.log(req.body.horarioinicio);
    // Creates a new User based on the Mongoose schema and the post bo.dy
    var newfeira = new Feira(req.body);
    //New User is saved in the db.
    newfeira.save(function(err){
      if(err)
        res.send(err);
      // If no errors are found, it responds with a JSON of the new user
      res.json(req.body);
    });
  });

};
