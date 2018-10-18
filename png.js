let fs = require('fs');
let PNG = require('pngjs').PNG;

let resultAlpha = "";
let resultRed = "";
let resultGray = "";
let specialHash = Buffer.from("Z465/", "ascii");
//let resultGray = [];
let count = 0;

fs.createReadStream('./challenge.png')
     .pipe(new PNG({
         filterType: 4
     }))
    .on('parsed', function() {
        //resultGray = new Array(this.width).fill(0);

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];

                if (y == 310) {
                    if (alpha != 255) {
                        resultAlpha += (alpha - 253) ^ 1;
                        resultRed += (red & 0x1) ^ (alpha - 253);
                    }
                }
            }
        }
        
        for (var y = this.height - 1; y >= 0; y--) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];

                if (y != 310) {
                    if (red != green) {
                        //console.log("[" + red + "," + green + "," + blue.toString(2) + "]");
                        //console.log("[" + x + "," + y + "]");
                        resultGray += (red & 0x1) ^ parseInt(resultAlpha[y]) ^ (parseInt(resultRed[x]));
                        count++;
                        //resultGray[x] ^= 1;
                        //resultGray.push(red);
                    }
                }
            }
        }
        
        console.log("ALPHA DATA:")
        console.log(resultAlpha);
        console.log(bitsToBuf(resultAlpha).toString());

        console.log("RED DATA:")
        //console.log(resultRed);
        console.log(bitsToBuf(resultRed).toString('hex'));

//        for (let i=0; i< 256; i++) {
            console.log("GRAY DATA:")
//            resultGray = resultGray.split("").reverse().join("");
            console.log(resultGray);
            resultGray = bitsToBuf(resultGray); // Buffer.from(resultGray);
//            for (let j=0; j<resultGray.length; j++) resultGray[j] ^= specialHash[j%specialHash.length];
            console.log(resultGray.toString("hex"));
            console.log(resultGray.toString());
//            fs.appendFileSync("out.txt", Buffer.from([...resultGray, 0x0a]));
//        }
//        console.log(count);
//        for (let i=0; i< 8; i++) {
//            console.log(bitsToBuf(resultGray, 0).toString());
//            console.log(bitsToBuf(resultGray, 0).toString('hex'));
//        }
//        console.log(Buffer.from(resultGray).toString());
//        console.log(Buffer.from(resultGray).toString('hex'));

//        resultGray = resultGray.substr(0,512);
//        console.log(resultGray);
//        let ts = bitsToBuf(resultGray, 0);
//        console.log(ts.toString("hex"));

//        let tt = Buffer.from("secret + here you go", "base64");
        //for (let i=0; i<tt.length; i++) tt[i] ^= 0xff;
        
//        console.log(tt.toString());
//        console.log(tt.toString("hex"));
    });


function bitsToBuf(bits, offset = 0) {
    bits = bits.substr(offset);
    let data = [];
    while (bits.length) {
        data.push(parseInt(bits.substr(0,8), 2));
        bits = bits.substr(8);
    }
    return Buffer.from(data);
}

function invertBits(byte) {
    let s = (0x100 + byte).toString(2).substr(1).split("");
    let r = [];
    for (let i=0; i<8; i++) {
        r.push(s[7-i]);
    }
    return parseInt(r.join(""), 2);
}
