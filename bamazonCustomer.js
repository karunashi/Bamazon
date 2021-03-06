var mysql = require("mysql");
var inquirer = require("inquirer")
var idList = [];
var prodList = [];
var initialList = false;
var itemChoice = "";
var itemAmount = 0;
var newTotal = 0;
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
}]).then(function(Customer) {
	console.log('\x1b[33m'+"You've chosen ID# "+'\x1b[0m'+Customer.promptConsumer)
	itemChoice = Customer.promptConsumer
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
		itemAmount = amountBuy.countItem
		checkStock();
	});
;}
function checkStock() {
connection.query("SELECT * FROM products", function(err, res){
 if(err) throw err;
 for (var i = 0; i < res.length; i++) {
	if (itemChoice == res[i].id && res[i].stock_quantity > itemAmount) {
		newTotal = res[i].stock_quantity - itemAmount;
		var cost = itemAmount * res[i].price;
		console.log("The total transaction totals out to: $"+cost)
		console.log("There are over "+newTotal+" left in stock for today!")
		calculateStock()
	}
	else if (itemChoice == res[i].id && res[i].stock_quantity < itemAmount){
		console.log("We cannot meet the amount of "+res[itemChoice].product_name+" for today. Please come back tomorrow for an update.")
	}
 } 
});
}

function calculateStock() {
	connection.query("UPDATE products SET ? WHERE ?", 
		[{stock_quantity: newTotal}, {id: itemChoice}], function(err, res) {
			console.log("Item transaction complete!");
			console.log("===========================");
			console.log("Thank you and please come again!")
		});
}


