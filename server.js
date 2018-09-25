var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost/geo',{ useNewUrlParser: true });
app.use(bodyParser.json()); //tells system to use json objects
app.use(bodyParser.urlencoded({extended:false}));

var NodeGeocoder = require('node-geocoder'); //Node library for geocoding

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyANCPW9JemtW-WHc8vD0pSaptRA9c1d330',
  formatter: null
};

var geocoder = NodeGeocoder(options);




//Bring in Model
var Item=require('./models/item');
var db=mongoose.connection;
//check connection with db
db.once('open', function(){
  console.log('Connected to db');
});

//check errors on db
db.on('error', function(error){
  console.log(error);
});


//Load View Engine Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set Public Folder for static files
app.use(express.static(path.join(__dirname,'public')));


// Main Route
app.get('/', function(req, res){
  Item.find({},function(error,items){
    if (error){
      console.log(error);
    }
    else {

      res.render('list', {
        title:'Cached Items',
        items: items,
        itemsMap:JSON.stringify(items),
      });
      // res.send("Congratulations!");
    }

  });
});

// Add items GET Request
app.get('/items/add', function(req,res){
  res.render('add_items',{
    title:'Add Item'
  });
});

//Add items POST request
app.post('/items/add', function(req,res){
  var item=new Item();
  item.name=req.body.name;
  item.location=req.body.location;

  item.des=req.body.des;

  // Using callback
  geocoder.geocode(item.location, function(err, resp) {
    console.log(resp[0].latitude);
    item.long=resp[0].longitude;
    item.lat=resp[0].latitude;
    item.save(function(error,saveditem){
      if (error){
        console.log(error);
      }
      else {
        console.log("Item Added Successfully!");
        res.redirect('/');
      }
    });
  });
});

//Get Details about single Item
app.get('/item/:id',function(req,res){
  Item.findById(req.params.id, function(error,item){
    res.render('single_item',{
      item:item
    });
  });
});

//Update an Item GET request
app.get('/item/edit/:id',function(req,res){
  Item.findById(req.params.id,function(error,item){
    res.render('update_item',{title:'Edit Item',item:item});
  });
});


//Delete an Item GET Request
app.delete('/item/:id', function(req, res){
  var id={_id:req.params.id};
  Item.deleteOne(id, function(error){
    if (error){console.log(error);}

    res.send('Item successfully removed');

  });
});

//UPdate POST request
app.post('/items/edit/:id', function(req, res){
  var newItem={};
  newItem.name=req.body.name;
  newItem.location=req.body.location;
  newItem.des=req.body.des;

  geocoder.geocode(newItem.location, function(err, resp) {
    // console.log(res[0].latitude);
    newItem.long=resp[0].longitude;
    newItem.lat=resp[0].latitude;
    //Update item by // ID
    var id={_id:req.params.id};

    Item.updateOne(id, newItem, function(error){
      if (error){
        console.log(error);
      }
      else {
        res.redirect('/');
      }
    });

  });




});

app.listen(3008, function(){
  console.log("Server Started on port 3008!");
});



// Add items GET Request
// app.get('/locations/add', function(req,res){
//   res.render('add_location',{
//     title:'New Item'
//   });
// });

//Add items POST request
// app.post('/locations/add', function(req,res){
//
//   var item=new Item();
//   item.name=req.body.name;
//   item.location=req.body.location;
//
//   item.des=req.body.des;
//
//   var NodeGeocoder = require('node-geocoder');
//
//   var options = {
//     provider: 'google',
//
//     // Optional depending on the providers
//     httpAdapter: 'https', // Default
//     apiKey: 'AIzaSyDC8yd_UmU9sEdfNuKGA-rfSP0TPFL4X-g', // for Mapquest, OpenCage, Google Premier
//     formatter: null         // 'gpx', 'string', ...
//   };
//
//   var geocoder = NodeGeocoder(options);
//
//   // Using callback
//   geocoder.geocode(item.location, function(err, resp) {
//     console.log(resp[0].latitude);
//     item.long=resp[0].longitude;
//     item.lat=resp[0].latitude;
//     item.save(function(error,saveditem){
//       if (error){
//         console.log(error);
//       }
//       else {
//         console.log("Location Added Successfully!");
//         res.redirect('/');
//       }
//     });
//   });
//
//
// });
