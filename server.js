var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');


//console.log("sdfsdf")
var rooms = 0;

//var gamestart=false;

//var ff = __dirname
//console.log(ff)

//Decoding middleware
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded())
app.use(express.static('public'));

//app.use(express.static(path.join(__dirname,'./../styles')))//For statically loading styles folder
//app.use(express.static(__dirname)) //For statically loading scripts folder



app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname+"/index.html"))
    
//    console.log(req.body.name)
})


io.on('connection',function(socket){
//    app.use(express.static(path.join(__dirname,'./../game')));
    var first_player_name
    
    //Creating a new room and notifying the creator of room. 
    socket.on('createNewGame',function(data){
        console.log("Increatenewgame on server side")
        socket.join('Room-'+ ++rooms);
//        first_player_name=data.name;
        socket.emit('newGame',{
            name:data.name,
            room:'Room-'+rooms
            })
        });
    
    //Connecting second player to room.
    
    socket.on('joinGame',function(data){
        console.log("in joingame")
//        console.log("Player1name"+first_player_name)
        console.log(data)
        var room = io.nsps['/'].adapter.rooms[data.room];
        if(room && room.length == 1)
            {
                socket.join(data.room);
//                console.log("data.room")
                
                
//                console.log(io.sockets.clients(data.room))
                io.in(data.room).clients((err,clients)=>{
                    console.log(clients)
                })
               
//                function (room, _nsp) {
//                        var roomMembers = [];
//                        var nsp = (typeof _nsp !== 'string') ? '/' : _nsp;
//
//                        for( var member in io.nsps[nsp].adapter.rooms[room] ) {
//                            roomMembers.push(member);
//                        }
//
//                        return roomMembers;
//                    }
//                
                
                socket.broadcast.to(data.room).emit('Player1',data);
                
                    socket.emit('Player2',{
                    name:data.name,
                    room:data.room,
                    oppname:first_player_name
                    })
                
            }
            else
            {
                socket.emit('err',{
                    message:'Sorry, The room is full!!'
                });
            }
        });
    
   socket.on('player-1name',function(player1data){
        first_player_name=player1data.name  
   })
                         
    
    //Handling turn
    socket.on('turnPlayed',function(data){
        socket.broadcast.to(data.room).emit('playTurn',{
            position:data.position,
            room:data.room,
            oppmark:data.oppmark
        });
    });
    
    //Notifying the result of match
    socket.on('gameEnd',function(data){
        socket.broadcast.to(data.room).emit('End',data);
    });
        
   
})



//server.listen(3000);
http.listen(3000,function(){
    console.log("Server running at port 3000")
})