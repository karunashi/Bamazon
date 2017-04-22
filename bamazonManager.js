var mysql = require("mysql");
var inquirer = require("inquirer");
var opt = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
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

function promptManager(){
inquirer.prompt([{
	name: "promptManager",
	type: "list",
	message: "Please pick from the following options to proceed.",
	choices: opt
}]).then(function(manager) {
	console.log('\x1b[33m'+"You've chosen "+'\x1b[0m'+manager.promptManager)
	if (manager.promptManager == opt[0]) {
console.log("Test")
connection.query('SELECT * FROM products', function(err, res){
 if(err) throw err;
 console.log('\x1b[1m \x1b[31m'+"ID"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ "Product"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[33m'+"Department"+'\x1b[0m'+ '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"Price (USD)"+'\x1b[0m'+ '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[34m'+"Quantity"+'\x1b[0m')
 for (var i = 0; i < res.length; i++) {
	console.log('\x1b[1m \x1b[31m'+ res[i].id+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ res[i].product_name+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[33m'+res[i].department_name+'\x1b[0m'+'\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"$"+res[i].price+'\x1b[0m'+'\x1b[5m'+"||"+'\x1b[0m' + '\x1b[34m'+res[i].stock_quantity+'\x1b[0m');
 }
});

	}
	else if (manager.promptManager == opt[1]) {
		connection.query("SELECT * FROM products", function(err, res) {
			if(err) throw err;
			console.log("Items in Low Stock (Less than Five Items) will be listed below:")
				console.log('\x1b[1m \x1b[31m'+"ID"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ "Product"+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[33m'+"Department"+'\x1b[0m'+ '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"Price (USD)"+'\x1b[0m'+ '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[34m'+"Quantity"+'\x1b[0m')
			for (var i = 0; i < res.length; i++) {	
				if (res[i].stock_quantity < 5) {
					console.log('\x1b[1m \x1b[31m'+ res[i].id+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[36m'+ res[i].product_name+'\x1b[0m' + '\x1b[5m'+"||"+'\x1b[0m' + '\x1b[33m'+res[i].department_name+'\x1b[0m'+'\x1b[5m'+"||"+'\x1b[0m' + '\x1b[35m'+"$"+res[i].price+'\x1b[0m'+'\x1b[5m'+"||"+'\x1b[0m' + '\x1b[34m'+res[i].stock_quantity+'\x1b[0m');
				}
			}
		})
	}
	// else if (manager.promptManager == opt[2]) {
 		// Add inquirer x 2, make sure it validates so it doesn't give any issues (type: input), use said values to UPDATE similar to bamazonCustomer.js's calculateStock() function.
	// }
	// else if (manager.promptManager == opt[3]) {
		// Inquirer with Insert to add new content into the table.
	// }
});
}
promptManager();