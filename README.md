# Loan Submission Form

A simple web service developed in NodeJS that handles basic loan submissions. This web service is secured by a self-signed certificate.

## Install

* [Install node.js](https://nodejs.org/en/)
* Update your npm: `sudo npm install npm -g`
* Install required project modules (make sure to run this command in the directory where package.json is located at): 
    * `npm install`
* Run the web service: `node index.js`
* Visit this URL: `https://localhost:8000/`
* Chrome will reject self-signed SSL certs by default when you visit the URL above. Just click on ADVANCED -> Proceed to localhost (unsafe)
* Done!

## Tests

* Install lab: `npm install -g lab`
* Run command `npm test`

## Notes:

* The loan submission rule is located in `models/loans.js`.
* The database variable is just a simple in-memory key-value object.
* Form validation is located in `routes/api/loans.js` in the Joi schema section
* All front-end assets are located in `static` and in `templates`.
* Note that the front-end app and the API are separated by their respective routes files.
* The `node_modules` folder can be ignored - this folder contains node libraries that this project uses.
