var mysql = require("mysql");
var inquirer = require("inquirer")
var idList = [];
var prodList = [];
var initialList = false;
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "281081325",
	database: "Bamazon"

});
connection.connect(function(err){
	if (err) throw err;
	// console.log(connection);
	console.log("connected as id " + connection.threadID);
});
connection.query('SELECT * FROM products', function(err, res){
 if(err) throw err;
 console.log('\x1b[1m \x1b[31m'+"ID"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ "Product"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"Price (USD)"+'\x1b[0m')
 for (var i = 0; i < res.length; i++) {
	console.log('\x1b[1m \x1b[31m'+ res[i].id+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ res[i].product_name+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"$"+res[i].price+'\x1b[0m');
	var temp = res[i].id
	var tempString = temp.toString()
	idList.push(tempString);
	prodList.push(res[i].product_name);
	// console.log(idList);
 } initialList = true;
 promptCustomer();
});

function promptCustomer(){
inquirer.prompt([{
	name: "promptConsumer",
	type: "list",
	choices: idList,
	message: "Please pick what item you would like to buy based on the product's designated identification number."
}]).then(function(test12) {
	console.log('\x1b[33m'+"You've chosen ID# "+'\x1b[0m'+test12.promptConsumer)
	promptCount()
});
}
function promptCount(){
	inquirer.prompt([{
		name: "countItem",
		type: "input",
		message: "How many would you like for that item?",
		validate: function(value) {
			if (isNaN(value) === false && parseInt(value) > 0) {
				return true
			} return false;
		}
	}]).then(function(amountBuy) {
		console.log("You've selected "+amountBuy.countItem+" in quantity for purchase.")
	});
;}

function checkStock() {
	
}
