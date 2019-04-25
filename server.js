const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//socket imports below
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// var Chat = require('../models/Chat.js');


app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist/public' ));



mongoose.connect('mongodb://localhost/delta2', { useNewUrlParser: true });

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!!!'],
        minlength: [3, "Project name needs to be at least 3 characters!!!"]
    },
    description: {
        type: String,
        required: [true, 'Description is required!!!'],
        minlength: [5, "Project name needs to be at least 10 characters!!!"],
        // maxlength: [150,"You exceed the max amount of decsription length!!1"]
    },
    gallery1:{
        type: String
    },
    gallery2:{
        type: String
    },
    gallery3:{
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
 });
 
 const Project = mongoose.model('Project', ProjectSchema);

///////////////////////////////////////////////////////

//code for socket chat which is upcoming in future, for making app more comprehensive

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/delta2')
//   .then(() =>  console.log('connection successful'))
//   .catch((err) => console.error(err));
// var ChatSchema = new mongoose.Schema({
//     room: String,
//     nickname: String,
//     message: String,
//     updated_at: { type: Date, default: Date.now },
//   });
  
//   module.exports = mongoose.model('Chat', ChatSchema);


  
//   var router = express.Router();
  
//   router.get('/', function(req, res, next) {
//     res.send('Express REST API');
//   });
  
//   module.exports = router;
  

 // #########################################



// io.on = ('connection', (socket) =>{
//     console.log('New user connected')

//     socket.username = "Anonymous"

//     socket.on('change_username', (data) => {
//         socket.username = data.username
//     })

//     socket.on('new_message', (data) => {
//         io.sockets.emit('new_message', {message: data.message, username: socket.username});
//     })
// })

// $(function(){

//     var socket = io.connect()
// });


     
//  io.on('connection', function (socket) { 
   
//    socket.on('alpha', function (data) { 
//      // socket.emit will respond back to the socket client that triggered this 'alpha' listener
//      socket.emit('updateClient', { data: 5 });
//    });
//    socket.on('beta', function (data) { 
//      // io.emit will message all socket clients 
//      io.emit('updateAllClients', { data: 5 });
//    });
// });
//socket for chat ends





// GET: Retrieve all Projects
app.get('/projects', function(req, res){
    Project.find({}, function(err, projects){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Projects:', data: projects})
        }
     });
 });
 
 // GET: Retrieve a Project by ID
 app.get('/projects/:id', function(req, res){
    Project.findOne({ _id: req.params.id }, function(err, project){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            // res.json({message: 'Project:', daddy: project})
            res.json({message: 'Project:', data: project})
        }
    });
 });
 
 // POST: Create a Project
 app.post('/projects', function(req, res){
    var newProject = new Project();
    newProject.id = req.body.id;
    newProject.name = req.body.name;
    newProject.description = req.body.description;
    newProject.gallery1 = req.body.gallery1;
    newProject.gallery2 = req.body.gallery2;
    newProject.gallery3 = req.body.gallery3;
    
    newProject.save(function(err, project){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'New Project:', data: project})
        }
    });
 });


 
//  // PUT: Update a Project by ID
//  app.put('/projects/:id', function(req, res){
//     Project.findOneAndUpdate({ _id: req.params.id }, { 
//         name: req.body.name, 
//         quantity: req.body.quantity,
//         price: req.body.price,
// 
//     }, function (err, project) {
//         if (err) {
//             console.log('*********************');
//             console.log('Returned Error: ', err);
//             res.json({message: 'Error', error: err})
//         }
//         else {
//             res.json({message: 'Updated Project:', data: project})
//         }
//     });
//  });




 // PUT: Update a Project by ID with validations
 app.put('/projects/:id', function(req, res){
    Project.findOne({ _id: req.params.id }, function (err, project) {
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        project.name = req.body.name;
        project.description = req.body.description;
        project.gallery1 = req.body.gallery1;
        project.gallery2 = req.body.gallery2;
        project.gallery3 = req.body.gallery3;
        project.save(function(err, updatedProject){
            if (err) {
                console.log('*********************');
                console.log('Returned Error: ', err);
                res.json({message: 'Error', error: err})
            }
            else {
                res.json({message: 'Updated Project:', data: project})
            }
        })
    });
 });


 
 // DELETE: Delete a Project by ID
 app.delete('/projects/:id/', function(req, res){
    Project.remove({ _id: req.params.id }, function(err){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Project.find({}, function(err, projects){
                if(err){
                    console.log('*********************');
                    console.log('Returned Error: ', err);
                    res.json({message: 'Error', error: err})
                }
                else {
                   res.json({message: 'Deletion Successful:', data: projects})
                }
            });
        }
    });
 });



 app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
 });


 
 app.listen(2020, function () {
    console.log('listening on port 2020');
 });