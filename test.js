// Node program to demonstrate the
// url.parse() method
	
// Importing the module 'url'
const url = require('url');

// URL address
const address = 'https://geeksforgeeks.org/projects?sort=newest&lang=nodejs';

// Call parse() method using url module
let urlObject = url.parse(address, true);

console.log('URL Object returned after parsing');

// Returns an URL Object
console.log(urlObject)
