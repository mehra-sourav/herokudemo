function Toggletheme()
{
    var checkbox = document.getElementById("switch");
    
    //When toggle is present
    checkbox.addEventListener("change",function(){
        if(this.checked)
        {
            transition();
            document.documentElement.setAttribute('data-theme','dark')
        }
        else
        {
             transition();
             document.documentElement.setAttribute('data-theme','light')
        }
                  
        })
    
    //When button is present
    checkbox.onclick=function(){
        if(document.documentElement.getAttribute('data-theme') == "light")
            {
                 
                transition();
                Changebutton("light")
                document.documentElement.setAttribute('data-theme','dark')  
            }
        else
            {
            
                transition();
                Changebutton("dark")
                 document.documentElement.setAttribute('data-theme','light')
                
                 
            }
    }
    
}

let transition = () =>{
    document.documentElement.classList.add('transition');
    window.setTimeout(()=>{
        document.documentElement.classList.remove('transition');
    },3000)
}

function Changebutton(theme)
{
    if(theme == "light")
        {
            var button = document.getElementsByClassName("btn")
             button[0].classList.replace("btn-outline-dark","btn-outline-light")
            document.getElementById("starwars").src="https://m.media-amazon.com/images/M/MV5BNDhlNWFiZTItMjFhZi00NGRmLWI2ZmUtNzdjYjUzM2VmNDIxXkEyXkFqcGdeQW1yb3NzZXI@._V1_UX477_CR0,0,477,268_AL_.jpg";
            button['newgame'].classList.replace("btn-outline-dark","btn-outline-light")
            button['joingame'].classList.replace("btn-outline-dark","btn-outline-light")
            
        }
    else
        {
            var button = document.getElementsByClassName("btn")
             button[0].classList.replace("btn-outline-light","btn-outline-dark")
            document.getElementById("starwars").src="https://cdn.hitc-s.com/i/1232/star_wars_battlefront_darth_vader_2_1026058.jpg";
            button['newgame'].classList.replace("btn-outline-light","btn-outline-dark")
            button['joingame'].classList.replace("btn-outline-light","btn-outline-dark")
        }
}








