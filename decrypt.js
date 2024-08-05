const fs = require('fs');
const crypto = require('crypto');

module.exports = async function decrypt(flags) {
    const { input, output } = flags;
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16);

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    const inputFile = fs.createReadStream(input);
    const outputFile = fs.createWriteStream(output);

    inputFile.pipe(decipher).pipe(outputFile);
    outputFile.on('finish', () => {
        console.log('Decryption complete.');
    });
};
