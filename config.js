'use strict';


var path=require('path');
var nconf=module.exports=require('nconf');

nconf

.argv()
.env([
  "MONGO_URL"
])
.file({ file: path.join(__dirname, 'config.json') })
.defaults({
  MONGO_URL:""
});

checkConfig('MONGO_URL');

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
