(function() {  

  if (!navigator.geolocation){
    alert("<p>Geolocation is not supported by your browser</p>");
    return;
  } 
  else{
    navigator.geolocation.getCurrentPosition( 
        function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        document.querySelector("[name='latitude']").value= latitude;
        document.querySelector("[name='longitude']").value=longitude;
    
    },  
    function error() {
        alert("Unable to retrieve your location");
    }
    ); 
  }
  
})();