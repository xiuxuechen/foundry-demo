const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    let provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD).connect(provider);
    console.log("当前链地址：", process.env.RPC_URL, "钱包地址：", wallet.address);

    const abi = fs.readFileSync("./HelloWorld_sol_HelloWorld.abi", "utf8");
    const binary = fs.readFileSync("./HelloWorld_sol_HelloWorld.bin", "utf8");


    const factory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("部署合约中，请等待...");
    const contract = await factory.deploy(1, "xxc", { gasLimit: 3000000 });
    const deploymentReceipt = await contract.waitForDeployment(1);
    console.log("合约部署成功，合约地址：", await contract.getAddress());
    const currentCount = await contract.count();
    const currentName = await contract.name();

    console.log(`当前 count: ${currentCount}`);
    console.log(`当前 name: ${currentName}`);

    // 调用合约函数
    console.log("\n🔄 调用 incrCount 函数...");
    const nonce = await wallet.getNonce();
    const txResponse = await contract.incrCount(12, { gasLimit: 300000, nonce: nonce });
    await txResponse.wait(); // 等待交易确认

    console.log("✅ 函数调用成功！");

    // 再次读取状态查看变化
    const updatedCount = await contract.count();
    console.log(`更新后的 count: ${updatedCount}`);

    console.log("\n🎉 所有操作完成！");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });