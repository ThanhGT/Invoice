function process_form(){
	// Made by Thanh Tran and Ryan Henry
	// March 13th 2019
	var errors = "";
	var output = "";

	var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
	var phoneNumRegex = /^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/;
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var phoneNum = document.getElementById('phoneNum').value;
	var address = document.getElementById('address').value;
	var city = document.getElementById('city').value;
	var postcode = document.getElementById('postcode').value;

	//get the province
	var province = document.getElementById("province").value;

	//dictionary of the province sales taxes
	salesTax = {"AB":0.05,"BC":0.05,"MB":0.05,"NB":0.15,"NL":0.15,"NT":0.05,"NS":0.15,"NU":0.05,"ON":0.13,"QC":0.05,"PE":0.15,"SK":0.05,"YT":0.05};
	
	
	// validate name
	if(name.trim() == ""){
		errors += "You need to enter a name!<br/>";
		document.getElementById('name').focus();
	}
	else{
		output += "<tr><td>Name: </td><td>" + name + "</td></tr>";
	}

	
	// validate email
	if(email.trim() == ""){
		errors += 'You need to enter an email!<br/>';
		document.getElementById("email").focus();
	} else if (!(emailRegex.test(email))){
		errors += 'Email is not in the correct format!<br/>';
		document.getElementById('email').focus();
	} else {
		output += "<tr><td>Email: </td><td>" + email + "</td></tr>";
	}
	
	// validate phone
	if(phoneNum.trim() == ""){
		errors += 'You need to enter a phone number!<br/>';
		} else if(!(phoneNumRegex.test(phoneNum))){
			errors += 'Phone Number is not in the correct format<br/>';
			document.getElementById('phoneNum').focus();
	} else{
		output += "<tr><td>Phone Number: </td><td>" + phoneNum + "</td></tr>";
	}

	// validate address
	if (address.trim() == ""){
		errors += "You need to enter an address!<br/>";
		document.getElementById('address').focus();
	} else {
		output += "<tr><td>Delivery Address:</td><td>"+address + ",<br>" + city +", " + province + ",<br>" + postcode + "</td></tr>";
		
	}
	
	// validate city
	if(city.trim() == ""){
		errors += 'You need to enter a city<br/>';
		document.getElementById('city').focus();
	}
	else{
		//output += "City: " + city + "<br/>";
	}

	// validate postal code
	if(!(postcodeRegex.test(postcode))){
		errors += 'Postal Code not in correct format!<br/>';
		document.getElementById('postcode').focus();
	}
	else{
		//output += "Postal Code: " + postcode + "<br/>";
	}
	
	var subtotal = 0;
	
	// validate products
	var products = document.getElementsByClassName("prod");
	
	var counter = 0;
	for (let i = 0; i < products.length; i++){
		if (products[i].value.trim() == ""){
			counter++;
		//check if any of the product boxes have invalid inputs
		} else if (isNaN(products[i].value)) {
			errors += "Product needs to be a number.<br/>";
			products[i].focus();
			break;
		} else {
			//output += "" + products[i].value + "<br/>";
			subtotal += parseFloat(products[i].value)*(i+1)*10;
		}
	}
	
	//check if the product boxes are empty
	if (counter == products.length) {
		errors += "Please purchase a product.<br/>"
	}
	
	var dTimes = parseFloat(document.getElementById("dTimes").value);

	subtotal += parseFloat(dTimes);
	var tax = (salesTax[province]*subtotal);
	var total = ((1+salesTax[province])*subtotal);

	
	calcInvoice = `
	<tr>
		<td>${products[0].value} Product 1 @ $10.00:</td>
		<td>$${(products[0].value * 10).toFixed(2)}</td>
	</tr>
	<tr>
		<td>${products[1].value} Product 2 @ $20.00:</td>
		<td>$${(products[1].value * 20).toFixed(2)}</td>
	</tr>
	<tr>
		<td>${products[2].value} Product 3 @ $30.00:</td>
		<td>$${(products[2].value * 30).toFixed(2)}</td>
	</tr>
	<tr>
		<td>Shipping Charges:</td>
		<td>$${dTimes.toFixed(2)}</td>
	</tr>	
	<tr>
		<td>Subtotal:</td>
		<td>$${subtotal.toFixed(2)}</td>
	</tr>
	<tr>
		<td>Taxes @ ${salesTax[province]*100}%:</td>
		<td>$${tax.toFixed(2)}</td>
	</tr>
	<tr>
		<td>Total:</td>
		<td>$${total.toFixed(2)}</td>
	</tr>
	`;
	
	
	if(errors != ""){
		document.getElementById('output').innerHTML = "";
		document.getElementById('errors').innerHTML = errors;
	}
	else{
		document.getElementById('errors').innerHTML = "";
		document.getElementById('receipt').innerHTML = output + calcInvoice;
	}
	
	
}