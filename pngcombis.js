let fs = require('fs');
let PNG = require('pngjs').PNG;
let G = require('generatorics');

let resultAlpha = "";
let resultRed = "";
let resultRedRaw = "";
let resultGray = "";
let resultGrayI = "";
let specialHash = Buffer.from("Z465/", "ascii");
//let resultGray = [];
let count = 0;

// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r&1) ^ (r310&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1) ^ (a310&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r&1) ^ (x&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r&1) ^ (y&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (x&1) ^ (y&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1) ^ (x&1) ^ (y&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1) ^ (a310&1) ^ (x&1) ^ (y&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1) ^ (y&1);
// });
// doIt((r, g, b, a, x, y, a310, r310) => {
//     return (r310&1) ^ (a310&1) ^ (y&1);
// });

doIt((r, g, b, a, x, y, a310, r310) => {
    return (r&1) ^ parseInt(resultAlpha[x]) ^ parseInt(resultRed[y]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return (r&1) ^ parseInt(resultAlpha[x]) ^ parseInt(resultRedRaw[y]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return (r&1) ^ parseInt(resultAlpha[y]) ^ parseInt(resultRed[x]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return (r&1) ^ parseInt(resultAlpha[y]) ^ parseInt(resultRedRaw[x]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return parseInt(resultAlpha[x]) ^ parseInt(resultRed[y]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return parseInt(resultAlpha[x]) ^ parseInt(resultRedRaw[y]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return parseInt(resultAlpha[y]) ^ parseInt(resultRed[x]);
});
doIt((r, g, b, a, x, y, a310, r310) => {
    return parseInt(resultAlpha[y]) ^ parseInt(resultRedRaw[x]);
});


function doIt(dataCollector) {

fs.createReadStream('./challenge.png')
     .pipe(new PNG({
         filterType: 4
     }))
    .on('parsed', function() {
        //resultGray = new Array(this.width).fill(0);

        resultAlpha = "";
        resultRed = "";
        resultRedRaw = "";
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];

                if (y == 310) {
                    if (alpha != 255) {
                        resultAlpha += alpha & 1;
                        resultRed += (red & 1) ^ (alpha & 1) ^ 1;
                        resultRedRaw += (red & 1);
                    }
                }
            }
        }

        resultGray = "";
        resultGrayI = "";
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var y = 0; y < this.height; y++) {
            for (var x = this.width - 1; x >= 0 ; x--) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var y = this.height - 1; y >= 0 ; y--) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var y = this.height - 1; y >= 0 ; y--) {
            for (var x = this.width - 1; x >= 0 ; x--) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var x = this.width - 1; x >= 0 ; x--) {
            for (var y = 0; y < this.height; y++) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var x = 0; x < this.width; x++) {
            for (var y = this.height - 1; y >= 0 ; y--) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        resultGray = "";
        resultGrayI = "";
        for (var x = this.width - 1; x >= 0 ; x--) {
            for (var y = this.height - 1; y >= 0 ; y--) {
                let idx = (this.width * y + x) << 2;
                let idx310 = (this.width * 310 + x) << 2;
 
                let red   = this.data[idx];
                let green = this.data[idx+1];
                let blue  = this.data[idx+2];
                let alpha = this.data[idx+3];
                let a310  = this.data[idx310+3];
                let r310  = this.data[idx310];

                if (y != 310) {
                    if (red != green) {
                        resultGray += dataCollector(red, green, blue, alpha, x, y, a310, r310);
                        resultGrayI += dataCollector(red, green, blue, alpha, x, y, a310, r310) ^ 1;
                    }
                }
            }
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGray, i).toString());
            console.log(bitsToBuf(resultGray, i).toString('hex'));
        }
        for (let i=0; i< 8; i++) {
            console.log(bitsToBuf(resultGrayI, i).toString());
            console.log(bitsToBuf(resultGrayI, i).toString('hex'));
        }
         
        // console.log("ALPHA DATA:")
        // //console.log(resultAlpha);
        // console.log(bitsToBuf(resultAlpha).toString());

        // console.log("RED DATA:")
        // //console.log(resultRed);
        // console.log(bitsToBuf(resultRed).toString('hex'));

//        for (let i=0; i< 256; i++) {
            console.log("GRAY DATA:")
//            resultGray = resultGray.split("").reverse().join("");
//            console.log(resultGray);
//            resultGray = bitsToBuf(resultGray); // Buffer.from(resultGray);
//            for (let j=0; j<resultGray.length; j++) resultGray[j] ^= specialHash[j%specialHash.length];
//            console.log(resultGray.toString("hex"));
//            console.log(resultGray.toString());
//            fs.appendFileSync("out.txt", Buffer.from([...resultGray, 0x0a]));
//        }
//        console.log(count);
//        for (let i=0; i< 8; i++) {
//            console.log(bitsToBuf(resultGray, i).toString());
// //           console.log(bitsToBuf(resultGray, i).toString('hex'));
//        }
//        for (let i=0; i< 8; i++) {
//            console.log(bitsToBuf(resultGrayI, i).toString());
// //           console.log(bitsToBuf(resultGrayI, i).toString('hex'));
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
}

function bitsToBuf(bits, offset = 0) {
    bits = bits.substr(offset);
    let data = [];
    while (bits.length > 7) {
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
