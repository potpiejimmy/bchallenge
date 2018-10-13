let G = require('generatorics');

let k =    "L30275849F";
let rest = "CK0D1F6ED49A";
let z =    "Z465/";

//let ordered = "511B2033232841053022B0FE".split("");
let ordered = "L503K7DF64C120E8A9D9F4Z465/".split("");
let key     = "20181002";
//ordered     = "Z465/4F9D9A8E021C46FD7K305L";

for (let i=0; i<ordered.length; i++) {
    ordered[i] = ((16 + parseInt(ordered[i],16) - parseInt(key[i%key.length]))%16).toString(16);
}

console.log(ordered.join(""));

//console.log(Buffer.from(ordered,'base64').toString());
//console.log(Buffer.from(ordered,'base64').toString('hex'));
