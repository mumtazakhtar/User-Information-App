const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require("body-parser");

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended:true}));

const jsonReaderModule = require('../jsonReaderModule.js');
var filename = '../users.json';


app.get('/', function(reqAll,resAll){
	jsonReaderModule.jsonFileReader(filename, function(usersJson){
		resAll.render('index',{
			userData: usersJson
		});
	});
});

//search bar

app.get('/search', function(reqSearch, resSearch){

	resSearch.render('search.pug')
})

app.post('/searchName', function(reqPost, resPost, next){
	
	let name = reqPost.body.name;
	let input = name.toLowerCase();
	console.log(input);

	jsonReaderModule.jsonFileReader(filename, function(usersJson){
		
        
		for(let i = 0; i < usersJson.length; i++){


			if(usersJson[i].firstname.toLowerCase() === input || usersJson[i].lastname.toLowerCase() === name){
				
				let userDetails = ` Firstname: ${usersJson[i].firstname}  Lastname: ${usersJson[i].lastname}  Email: ${usersJson[i].email}` ;
				resPost.render('search.pug', {
					usersJson: userDetails
				})
				return next();
			}
		}
		resPost.render('search.pug', {
			usersJson: `${name} not found. please check!`
		})
	})
})

//login page
app.get('/login', function(reqLogin,resLogin){
	 resLogin.render('login.pug')
})

app.post('/register', function(reqRegister,resRegister){
	
	let details = {
		firstname: reqRegister.body.firstName,
		lastname: reqRegister.body.lastName,
		email: reqRegister.body.eMail
	}

	jsonReaderModule.jsonFileReader(filename, function(usersJson){
		usersJson.push(details)


		let userData = JSON.stringify(usersJson);  
		fs.writeFile('../users.json', userData); 

	})

	let successMessage = `Hi ${reqRegister.body.firstName}! Thank you registering with us :)`
		resRegister.render('login.pug', {

		userDetails: successMessage

	}) 
})



app.listen(4000,function(){
	console.log("user app is listening at port 4000");
})


