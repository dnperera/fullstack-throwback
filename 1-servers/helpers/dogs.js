var fs = require('fs'); // NOTE: You may NOT use any of the SYNC versions of fs.s
var readline = require('readline');
var shortid = require('shortid');
var dogDataFile = __dirname + '/../data/dogs.txt';

var dogsDataArray = [];

//Read the data file and format the data into an array with objects
var formatData = () => {
  dogsDataArray = [];
  var input = fs.createReadStream(dogDataFile);
  var rl = readline.createInterface({
    input: input,
    terminal: false,
  });

  rl.on('line', line => {
    //add each line of dog reacord to the final array
    console.log(line);
    dogsDataArray.push(generateDogObject(line.split(',')));
  });
};

var generateDogObject = record => {
  return {
    name: record[0],
    breed: record[1],
    id: record[2],
  };
};

formatData(); // this function execute to load data and format

var getAll = function(callback) {
  // Your code here! This function should get all
  // dogs in the data file as an array of objects.
  // The objects should have the keys: name, breed,
  // id with values from the dog data file
  callback(dogsDataArray);
};

var getOneById = function(id, callback) {
  // Your code here! This function should get the one
  // dog object with the matching id from the dog file.
  // The object should have the keys: name, breed, id
  // with appropriate values from the dog data file.
  //
  var incomingID = id.trim();
  var matchingRecord = dogsDataArray.filter(record => {
    recordId = record['id'].trim();
    return incomingID === recordId;
  });
  callback(matchingRecord[0]);
};

var addOne = function(name, breed, callback) {
  // Your code here! This function should add a
  // dog with name, breed, and id (use the shortid module)
  // to the dog data file
  let id = shortid.generate();
  let newEntry = `${name}, ${breed}, ${id}\n`;
  fs.appendFile(dogDataFile, newEntry, function(err) {
    if (err) throw err;
    formatData(getAll(callback));
  });
};

module.exports.getAll = getAll;
module.exports.getOneById = getOneById;
module.exports.addOne = addOne;
