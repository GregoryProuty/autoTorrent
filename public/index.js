//login button behavior
//directs to the put.io login page

document.getElementById("loginButton").onclick = function () { 
    window.location = ('https://api.put.io/v2/oauth2/authenticate?client_id=2332&response_type=code&redirect_uri=http://autotorrent.herokuapp.com/put_oauth');
}


function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 

function protectedDisplay(){
  var session = getCookie("session"); 
  if(session === null){
    alert("Please log in first")
  } else {
    e.preventDefault();
    listTorrents();
  }
}

//lists ten torrent links on the page
function listTorrents() { 
  params = "q=" + document.getElementById("filename").value;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('success');
      var str = '<ol>';
            
      Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == deleteValue) {         
            this.splice(i, 1);
            i--;
          }
        }
        return this;
      };
            
      JSON.parse(xmlhttp.responseText).clean(null).forEach(function(el){
        console.log('building');
            str += '<li><a href="http://autotorrent.herokuapp.com/add_to_put?q=' + el.torrentLink + '"> Title: ' + el.title + ' Seeds: ' + el.seeds + '</a></li>';
      })
      str += '</ol>'; 
      console.log(str);
      document.getElementById("links").innerHTML = str;       
    }
  }; 
  xmlhttp.open("POST", "/add_file?" + params, true);
  xmlhttp.send(null); 
}

//"SEARCH" button behavior, calls listTorrents()
document.getElementById("clickMe").onclick = function(){
  
  console.log("displaying");
  protectedDisplay()
        // listTorrents();

}

//calls listTorrents on keypress enter
document.getElementById("filename").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        
        console.log("displaying");
        protectedDisplay()
        // e.preventDefault();
        // listTorrents();
        
        
    }
});

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 

function protectedDisplay(){
  var session = getCookie("session"); 
  if(session === null){
    alert("Please log in first")
  } else {
    e.preventDefault();
    listTorrents();
  }
}
