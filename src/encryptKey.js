const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    const wallet = new ethers.Wallet("6edf75826d21c4e68c976f9b9efcf6391daa0e3152099a000a691d790ee28d3a");
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD);

    console.log(encryptedJsonKey);
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })