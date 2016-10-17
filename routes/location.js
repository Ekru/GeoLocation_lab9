var express = require('express');
var router = express.Router();
var dao = require('../data.js');
//var query =require('querystring');
var qs = require('querystring');
var url = require('url');
var data;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET add location page. */
router.get('/addLocation', function(req, res, next) {
  res.render('addLocations', { title: 'Add Location' });
});

/* POST location page. */
router.post('/addLocation', function(req, res, next) {
  //var longitude =Number(req.body.longitude);
 // var 
  data ={name:req.body.name, catagory:req.body.catagory, location:[Number(req.body.longitude), Number(req.body.latitude)]};
  dao.setData(data);
  res.render('addLocations', { title: 'Location added successfuly, add more location' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {  
  //locations = null;
  res.render('search', { title: 'Search Locations nearby'});
});

router.get('/locations', function(req, res, next) {
  var locations;
 var qdata=url.parse(req.url).query
 var button =qs.parse(qdata)['btnLocations'];
 if(button =='Search by name'){
   var name =qs.parse(qdata)['name'];
   dao.getByName(name).then(function(dt){
     // console.log("result read: "+dao.result);
      locations=dt;
      
      console.log("data read: "+locations);
      
      res.render('locations', {locations:locations,title:'Nearby Locations'});
  });
 }
 else {
  var longitude =qs.parse(qdata)['longitude'];  
  var latitude =qs.parse(qdata)['latitude'];
  var catagory =qs.parse(qdata)['catagory'];
  //var locations=[{name:'A',catagory:'C',location:[3.4,4.66]}];
  
  dao.getData(catagory,longitude,latitude).then(function(dt){
     // console.log("result read: "+dao.result);
      locations=dt;
      
      console.log("data read: "+locations);
      
      res.render('locations', {locations:locations,title:'Nearby Locations'});
  });
 }
});


module.exports = router;