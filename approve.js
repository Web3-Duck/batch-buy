const Tx = require("ethereumjs-tx");
const PAIR_ABI = require("./abis/pair.json");
const { MaxUint256 } = require("@ethersproject/constants");
const { defaultChainId, web3, privateKeyList, addresses } = require("./config");

const pancakeRouter = addresses.router; //pancakeRouter

async function approve(token, fromAddr, privateKey) {
  return new Promise(async (resolve, reject) => {
    const usdtContract = new web3.eth.Contract(PAIR_ABI, token);
    const approveCode = usdtContract.methods
      .approve(pancakeRouter, MaxUint256.toString())
      .encodeABI();
    try {
      const nonce = await web3.eth.getTransactionCount(fromAddr);
      const rawTx = {
        from: fromAddr,
        to: token,
        nonce: nonce,
        gasPrice: 5100000000,
        gasLimit: 300000,
        chainId: defaultChainId,
        value: 0,
        data: approveCode,
      };
      let tx = new Tx(rawTx);
      tx.sign(privateKey);
      let serializedTx = tx.serialize();
      web3.eth
        .sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .on("transactionHash", (hash) => {
          console.log("授权hash", hash);
          resolve(hash);
        })
        .on("error", (err) => {
          console.log("授权出错", err);
          reject(err + "");
        });
    } catch (e) {
      reject(e + "");
    }
  });
}

const app = (token) => {
  for (let i = 0; i < privateKeyList.length; i++) {
    const fromAddr = privateKeyList[i].account;
    const privateKey = Buffer.from(privateKeyList[i].privateKey, "hex");
    approve(token, fromAddr, privateKey);
  }
};

app(addresses.busd);
