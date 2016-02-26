document.getElementById("loginButton").onclick = function () { 
    window.location = ('https://api.put.io/v2/oauth2/authenticate?client_id=2332&response_type=code&redirect_uri=http://localhost:3000/put_oauth');
}

document.getElementById("clickMe").onclick = function () { 
  params = "q=" + document.getElementById("filename").value;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('success');
      var str = '<ul>';
            
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
        str += '<li><a href="http://localhost:3000/add_to_put?q=' + el.torrentLink + '"> Title: ' + el.title + ' Seeds: ' + el.seeds + '</a></li>';
      })
      str += '</ul>'; 
      console.log(str);
      document.getElementById("links").innerHTML = str;       
    }
  }; 
  xmlhttp.open("POST", "/add_file?" + params, true);
  xmlhttp.send(null); 
}
    
