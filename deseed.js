let bip39 = require('bip39');
let bip32 = require('bip32');
var bitcoin = require('bitcoinjs-lib')
let G = require('generatorics');

let k1 = Buffer.from("f1f7127935ef860eca7962f7e29eba32915a9217e01bb3352ae28881679b9ba05cac9bf7b3b0dd3a5d450a048b2e33bbb7821a9254213aa385c19dac55f25f8d", "hex");
let k2 = Buffer.from("d4c93e56de8111a070fe91e3d838e3462e3736297c16664593251c972a5eae5f978765e38f0844e6b93a1cdcea8e04ef03bb75f730269f2e7f733c0e53f7d5a1", "hex");;
//let data = "1100111110101001100011111101100110011111100100011000111100100010110000011001101011111010101110010011111100011001010110010111101001000010010001000100101000010001100010010100000001000011111110001101100111001101010000111101100000000001101101101110010111111100011011010100011111110000011011010101100111111000001101101111001000101100000110011101011011101010111001001111110010100001001011111001101000101100111000001011010000010101100000000011001001101111010010000100101101000101100000110111001011011000101100010110110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010110110010";
//let data = "10011010100110111100100110101010111110111101011011011001010010011001100110101011110000111110100000001100010100000111011001010101000101000000011100000010001000011101110001110011001000001010111010101101100001000001011110000010001100101101010110001110101101010010000100001101100111100011100000111010100111000110011010101010000111110101111010100101110111111001010110010110110001010110100110101011011110011000101011101110001001101110110101110011000010010011110000001100001011001111010100000110100111101110100000101000";
let data = "10000101000100001100000110100010111001001001110101101010000100101001100110101000100001111010100101011000000100010111011001010000110101011100111001100000011001011110110001110011001000000111111000010110110110110110011010101010001001110101100100101101101011111001000011011000100011000101001111001110101010100000010111100010000011000000101011101100000100100001000100111001001010100001001001111110010000100110111011100001100010011111001111000010001000110000101101010101001100000101011110100110001101100000001011000010";
let specialHash = Buffer.from("273e2b95648fd3cbad0d7fe3ed820e783c0b12fdbe29b57bfb2d1f243d92b1a5", "hex");

let phrase = "cry buyer grain save vault sign lyrics rhythm music fury horror mansion debris slim immune lock actual tide gas vapor fringe pole flat glance";
let rest = "30754FK69A";

let pw = [
 ['LD','CE','2D','D89','1F'],
 ['LD','CE','2D','D89','F1'],
 ['LD','CE','2D','98D','1F'],
 ['LD','CE','2D','98D','F1'],
 ['LD','CE','D2','D89','1F'],
 ['LD','CE','D2','D89','F1'],
 ['LD','CE','D2','98D','1F'],
 ['LD','CE','D2','98D','F1'],
 ['LD','EC','2D','D89','1F'],
 ['LD','EC','2D','D89','F1'],
 ['LD','EC','2D','98D','1F'],
 ['LD','EC','2D','98D','F1'],
 ['LD','EC','D2','D89','1F'],
 ['LD','EC','D2','D89','F1'],
 ['LD','EC','D2','98D','1F'],
 ['LD','EC','D2','98D','F1'],
 ['DL','CE','2D','D89','1F'],
 ['DL','CE','2D','D89','F1'],
 ['DL','CE','2D','98D','1F'],
 ['DL','CE','2D','98D','F1'],
 ['DL','CE','D2','D89','1F'],
 ['DL','CE','D2','D89','F1'],
 ['DL','CE','D2','98D','1F'],
 ['DL','CE','D2','98D','F1'],
 ['DL','EC','2D','D89','1F'],
 ['DL','EC','2D','D89','F1'],
 ['DL','EC','2D','98D','1F'],
 ['DL','EC','2D','98D','F1'],
 ['DL','EC','D2','D89','1F'],
 ['DL','EC','D2','D89','F1'],
 ['DL','EC','D2','98D','1F'],
 ['DL','EC','D2','98D','F1'],
]

let count = 0;

for (let r=0; r<rest.length; r++) {
    for (let i=0; i<pw.length; i++) {
        var extended = pw[i].slice(0);
        extended.push(rest[r]);
        for (let password of G.permutation(extended)) {
            let seed = bip39.mnemonicToSeed(phrase, password.join(""));
            let hdMaster = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
            let key = hdMaster.derivePath("m/0");
            let address = bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh({ pubkey: key.publicKey })
            });
            count++;
            if (!(count%1000)) {
                console.log(count+":"+password.join(""));
            }
            if (address.address.startsWith("3NPZ") || address.address.startsWith("39uA")) {
                console.log(address.address);
            }
        }
    }
}
console.log(count);

//     var seed = bitsToBuf(mdata.substr(0,512));
// //        for (let i=0; i<seed.length; i++) seed[i] ^= k2[seed.length-1-i];

//         var hdMaster = bip32.fromSeed(seed, bitcoin.networks.bitcoin);

//         for (let d=0; d<1; d++) {

//             //let address = bitcoin.payments.p2pkh({ pubkey: key.publicKey })
//             let key = hdMaster.derivePath("m/" + d);
//             let address = bitcoin.payments.p2sh({
//                 redeem: bitcoin.payments.p2wpkh({ pubkey: key.publicKey })
//             });
//             console.log(address.address);

//             key = hdMaster.derivePath("m/0/" + d);
//             address = bitcoin.payments.p2sh({
//                 redeem: bitcoin.payments.p2wpkh({ pubkey: key.publicKey })
//             });
//             console.log(address.address);
//         }
//    }
//}

function bitsToBuf(bits) {
    let data = [];
    while (bits.length) {
        data.push(parseInt(bits.substr(0,8), 2) ^ 0xff);
        bits = bits.substr(8);
    }
    return Buffer.from(data);
}
