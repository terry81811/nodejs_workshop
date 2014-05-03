var http = require("http");
var port = Number(process.env.PORT || 1337);
var request = require("request");

var fs = require('fs');

var url = "http://graph.facebook.com/2014METEORmeethere/photos?type=uploaded"

var template = '';

/*
fs.readFile("./index.html","utf8", function (err,result){
	template = result;
})
*/
template = fs.readFileSync("./index.html", "utf8");


http.createServer(function (req,res){

	var data = "";
	request.get(url, function(err, body, result){
		result = JSON.parse(result);
		result.data.forEach(function (val, idx){
			data += "<img src='"+val.images[2].source+"'>";
		})
		data = template.replace("{{content}}",data);
//		res.end(result);
		
		res.end(data);
	})

//console.log( "server hi");
//res.end(data);

}).listen(port);

console.log("server create :" + port);


