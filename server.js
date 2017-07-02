var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
const port = 5000;
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/products');
var mongoOp     =   require("./dbmodel/storedb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.route("/api/products")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {data};
            }
            res.json(response);
        });
    })  .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
    router.post("/addproduct",function(req,res){
            var db = new mongoOp();
            var response = {};

            db.category = req.body.category;
            db.description = req.body.description;
            db.name = req.body.name;
            db.price = req.body.price;


            db.save(function(err){

                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                } else {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
        });
    app.use(express.static(__dirname));
    app.use('/',router);

app.listen(5000);
// shoutout to the user
console.log('Magic happens on port ' + port+"****");
