let fs = require('fs');
let PNG = require('pngjs').PNG;

let resultAlpha = "";
let resultRed = "";
let resultGray = "";
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
                } else {
                    if (red != green) {
                        //console.log("[" + red + "," + green + "," + blue.toString(2) + "]");
                        console.log("[" + x + "," + y + "]");
                        count++;
                        resultGray += (((idx/4) & 0x1)) ^ 1;
                        //resultGray[x] ^= 1;
                        //resultGray.push(green & 0xee);
                    }
                }
            }
        }
        
        console.log("ALPHA DATA:")
        //console.log(resultAlpha);
        console.log(bitsToBuf(resultAlpha).toString());

        console.log("RED DATA:")
        //console.log(resultRed);
        console.log(bitsToBuf(resultRed).toString('hex'));

        console.log("GRAY DATA:")
//        resultGray = resultGray.join("");
//        console.log(count);
        console.log(resultGray);
//        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, 0).toString());
            console.log(bitsToBuf(resultGray, 0).toString('hex'));
//        }
//        console.log(Buffer.from(resultGray).toString());
//        console.log(Buffer.from(resultGray).toString('hex'));
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
