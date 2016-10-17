var mc = require('mongodb').MongoClient;
var result;
function setData(data){
    
        mc.connect('mongodb://localhost:27017/GeoLocationsDb', function(err, db){
        if(err) throw err;
        
        db.collection('locations').insert(data);
        db.collection
        console.log('document inserted');
         
        db.close();  
    });       
}

function getByName(name){
    return new Promise(function(resolve,reject) {
        mc.connect('mongodb://localhost:27017/GeoLocationsDb', function(err, db){       
        if(err) throw err;
        db.collection('locations').find({name:{'$regex':name,'$options':'i'}}).toArray(function(err, doc){
            if(err) {
                throw err; 
                reject(err);               
            }            
            console.log('x:'+doc);            
            resolve(doc);
            db.close();
        });   
    }); 
  });
}
function getData(catagory,currentLong,currentLat){
  return new Promise(function(resolve,reject) {
        mc.connect('mongodb://localhost:27017/GeoLocationsDb', function(err, db){
        console.log("long from route:"+currentLong);
        if(err) throw err;
        db.collection('locations').find({catagory:{'$regex':catagory,'$options':'i'}, location: {'$near':[ Number(currentLong), Number(currentLat)],'$maxDistance':0.1}})
                .toArray(function(err, doc){
            if(err) {
                throw err; 
                reject(err);               
            }            
            console.log('x:'+doc);
            //result = doc;
            //console.log('res x:'+result);
            resolve(doc);
            db.close();
        });   
    }); 
  });
}

module.exports ={
    getData:getData,
    setData:setData,
};