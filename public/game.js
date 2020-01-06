//var server = require('http').Server(app);
//var io = require('socket.io')(server);
//'use strict'
var finish=true;
var count=0;
var arrTic = document.getElementsByClassName("box");

//for(var i=0;i<arrTic.length;i++)
//{
//  arrTic[i].onclick = function(){
//    if(this.getAttribute("checked")!="true" && finish)
//    {
//      this.setAttribute("checked","true");
////      console.log("Inside");
//      //this.style.backgroundColor="#4CAF50";
//      
//      ++count;
//      if(count%2==0)
//        this.innerHTML = "O";
//      else
//        this.innerHTML = "X";
//    }
//    Check(arrTic)
//  }
//}
function TurnCheck()
{
    
    
    if(count == 0 || count %2 == 0)
  {
     
      document.getElementById("player_name").setAttribute("style","background-color:var(--select-color)");
        document.getElementById("opp_name").setAttribute("style","background-color:transparent"); 
      
  }
  else if(count % 2 !=0 )
  {
    document.getElementById("player_name").setAttribute("style","background-color:transparent");
      document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
  }
}
function Check(arrTic)
{
  TurnCheck()
    
  if(count>4 && finish)
  {
    if(checkValue(0,1,2))
    {
      finish = false ;
	  
    }
    else if(checkValue(3,4,5))
    {
      finish=false;
    }
    else if(checkValue(6,7,8))
    {
      finish=false;
    }
    else if(checkValue(0,3,6))
    {
      finish=false;
    }
    else if(checkValue(1,4,7))
    {
      finish=false;
    }
    else if(checkValue(2,5,8))
    {
      finish=false;
	}
    else if(checkValue(0,4,8))
    {
      finish=false;
    }
    else if(checkValue(2,4,6))
    {
      finish=false;
    }
    else if(count==9)
    {
        show();
    }
  }
}

function show()
{
    if(count != 9)
    {
        $(document).ready(function() { 
            $("#Winmsg").modal("show"); });
    }
    else
        {
            document.getElementById("Winmsgbody").innerHTML = "<p align='center'>Draw</p>";
            $(document).ready(function() { 
            $("#Winmsg").modal("show"); });
        }
    
}
function checkValue(x,y,z)
{
  if(arrTic[x].innerHTML == "O" && arrTic[y].innerHTML == "O" && arrTic[z].innerHTML == "O" || arrTic[x].innerHTML == "X" && arrTic[y].innerHTML == "X" && arrTic[z].innerHTML == "X" )
    {
//      arrTic[x].style.backgroundColor="#4CAF50";
//      arrTic[y].style.backgroundColor="#4CAF50";
//      arrTic[z].style.backgroundColor="#4CAF50";
      changeother(x,y,z);
      show();
      var opp_name = document.getElementById("opp_name").innerHTML;
      var player_name = document.getElementById("player_name").innerHTML;
      if(arrTic[x].innerHTML == "O")
      {
          document.getElementById("Winmsgbody").innerHTML = "<p align='center'>"+opp_name+" wins</p>";
          document.getElementById("oppscore").innerHTML++ 
          document.getElementById("secondoppscore").innerHTML++ 
      }
      else
      {
          document.getElementById("Winmsgbody").innerHTML = "<p align='center'>"+player_name+" wins</p>";
          document.getElementById("playerscore").innerHTML++
          document.getElementById("secondplayerscore").innerHTML++
      }
        
    return true;
    }
  else
    return false;
}
function changeother(a,b,c)
{
  for(var i=0;i<arrTic.length;i++)
  {
    if(i!=a && i!=b && i!=c)
    {
//      arrTic[i].style.backgroundColor = "#FF132A";
      
      arrTic[i].innerHTML ="";
    }
  }
}

function Reset()
{
  count = 0;
  TurnCheck();
  finish = true;
  
  
  for(var i=0;i<arrTic.length;i++)
  {
    arrTic[i].setAttribute("checked","false");
    arrTic[i].innerHTML ="";
//    if(document.documentElement.getAttribute('data-theme') == "light")
//      arrTic[i].style.backgroundColor = "bisque";
//    else
//      arrTic[i].style.backgroundColor = "dark";
  }
    
}

document.documentElement.addEventListener("click", function(){
  if(finish == false)
      {
          show();
      }
});

(function()
{
    console.log("IN game..js")
    var socket = io.connect('http://localhost:3000'),player,game;
    
    //Creating a new game
//    socket.on("player1",function(data){
//       
//       console.log("In game.js "+data.name) 
//        document.getElementById('player_name').innerHTML = data.name
//         socket.emit('createNewGame',{
//                name:name});
//            player = new Player(name,"X")
//    })
//    
    document.getElementById("newgame").onclick = function(event){
            event.preventDefault();
            console.log("here")
            var name = document.getElementById("newname").value;

            if(!name)
            {
                alert("Please enter your name")
            }
            else
            {
                socket.emit('createNewGame',{
                    name:name});
//                console
                    player = new Player(name,'X');
            }
        
        }
    
    //Joining an existing game
    document.getElementById("joingame").onclick = function(event){
        event.preventDefault();
        var name = document.getElementById("joinname").value;
        var roomID = document.getElementById("roomID").value;
        
        if(!name || !roomID)
        {
            alert("Please enter your name and/or the room ID");
        }
        else
        {
            socket.emit("joinGame",{
                name:name,
                room:roomID
            });
            player = new Player(name,"O");
        }
        
    }
    class Player
    {
        constructor(name,markname)
        {
            this.name = name;
            this.mark = markname;
            this.oppmark = markname == "O"?"X":"O";
            this.currentTurn = true;
            this.movesPlayed = 0;
        }

        updatemovesnum()
        {
            this.movesPlayed++//=val
        }
        getmovesnum()
        {
            return this.movesPlayed
        }

        setturn(turn)
        {
            this.currentTurn=turn;
            if(turn)
            {
                //Change turn color here
                 document.getElementById("player_name").setAttribute("style","background-color:var(--select-color)");
                document.getElementById("opp_name").setAttribute("style","background-color:transparent");
                
            }
            else
            {
                //Change turn color here
                
                 document.getElementById("player_name").setAttribute("style","background-color:transparent");
                document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
            }
        }
        getPlayerName()
        {
            return this.name;
        }
        getPlayerMark()
        {
            return this.markname;
        }
        
        getOpponentMark()
        {
            return this.oppmark;
        }

        getcurrentTurn()
        {
            return this.currentTurn;
        }
    }
    
    class Game
    {
        constructor(roomID)
        {
            this.roomID = roomID;
//            this.moves = 0;
            var finish = true
            var count = 0;
        }

        getRoomID()
        {
            return this.roomID;
        }
        
        updatecount()
        {
            this.count++
        }
        
//        var finish = true
//        var count = 0;
        
        game()
        {
            
            var arrTic = document.getElementsByClassName("box");

            for(var i=0;i<arrTic.length;i++)
            {
              arrTic[i].onclick = function(){
                if(this.getAttribute("checked")=="true" && !player.getcurrentTurn())
                    alert("This tile is already selected and it's not your turn")
                else if(this.getAttribute("checked")=="true")
                    alert("This tile is already selected")
                else if(!player.getcurrentTurn())
                    alert("It's not your turn")
                  
                if(this.getAttribute("checked")!="true" && player.getcurrentTurn())
                {
                  this.setAttribute("checked","true");
//                  console.log
                  
                  this.innerHTML = player.getPlayerMark();
                  
                  player.setturn(false);
                  game.turnPlayed(i)
                }
//                Check(arrTic)
              }
            }
            
            
        }
        
        turnPlayed(tile)
        {
            socket.emit("turnPlayed",{
                position:tile,
                room:this.getRoomID(),
                oppmark:player.getOpponentMark                      
           })
           game.TurnCheck()
        }
        
        TurnCheck()
        {
            if(this.count == 0 || player.getcurrentTurn())
          {

              document.getElementById("player_name").setAttribute("style","background-color:var(--select-color)");
                document.getElementById("opp_name").setAttribute("style","background-color:transparent"); 

          }
          else
          {
            document.getElementById("player_name").setAttribute("style","background-color:transparent");
              document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
          }
        }
        
        
        
        
        
    
    }
    
    
    function Changepage()
    {
       
        document.getElementById("landpage").setAttribute("style","display:none");
         document.getElementById("game").setAttribute("style","display:block");
         document.getElementById("h1").setAttribute("style","display:none");
        document.getElementById("h2").setAttribute("style","display:block");
        
    }
    
    socket.on('newGame',function(data){
        document.getElementById('h2').innerHTML="Room ID:"+data.room;
       
        //Setting player_name on player-1 side
       document.getElementById('player_name').innerHTML = data.name;   
        
        game = new Game(data.room);
        Changepage()
    })
    
    
    
    socket.on('Player1',function(data){
        player.setturn(true);
         
        //Seting opp_name on player-1 side
        document.getElementById('opp_name').innerHTML = data.name;
        console.log(data.name+" has joined")
        console.log("In P1 side. Turn is "+player.getcurrentTurn())
        console.log(player.getPlayerMark())
        game.game() 
       
//        socket.broadcast.to(data.room).emit('Player1',data);
        
//        socket.broadcast.to(data.room).emit('player-1name',{
//            name:document.getElementById('player_name').innerHTML}
//            );
        
    })
    
    socket.on('Player2',function(data){
        player.setturn(false);
        console.log(data.name+"in "+data.room)
        console.log("In P2 side. Turn is "+player.getcurrentTurn())
                
        document.getElementById('player_name').innerHTML = data.name
//        document.getElementById('opp_name').innerHTML = data.oppname

        
         document.getElementById('h2').innerHTML="Room ID:"+data.room;  
        
        game = new Game(data.room)
        game.game()
        Changepage();
    })
    
    socket.on('PlayTurn',function(data){
        
        console.log("P1 has played")
        var arrTic = document.getElementsByClassName("box");

        if(arrTic[i].innerHTML == "")
        {
            arrTic[i].innerHTML = data.oppmark
            game.updatecount()
        }
            player.setturn(true);
            game.TurnCheck();
            game.game();
        
        
    })
    
    
})();

