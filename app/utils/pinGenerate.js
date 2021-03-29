let securePin = require("secure-pin");

function generatePin(n, type) {
    let genPin = "";
    if (type === 1) {
        var charSet = new securePin.CharSet();
        charSet.addNumeric().addLowerCaseAlpha().addUpperCaseAlpha().removeChar("aA").randomize();
        genPin = securePin.generateStringSync(n, charSet);
    }
    else if (type === 2) {
        genPin = securePin.generatePinSync(n);
    }
    return genPin;
}

module.exports = generatePin;