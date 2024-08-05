const fs = require('fs');
const crypto = require('crypto');

module.exports = async function encrypt(flags) {
    const { input, output } = flags;
    const algorithm = 'aes-256-cbc'; 
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16); 

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const inputFile = fs.createReadStream(input);
    const outputFile = fs.createWriteStream(output);

    inputFile.pipe(cipher).pipe(outputFile);
    outputFile.on('finish', () => {
        console.log('Encryption complete.');
    });
};
