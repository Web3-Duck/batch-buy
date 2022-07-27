//  bsc测试网 环境
const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const ROUTER_ABI = require("./abis/router.json");
const PAIR_ABI = require("./abis/pair.json");
const chainId = 97;
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://54.215.124.49:8575"));
const pancakeRouter = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; //pancakeRouter
const privateKeyList = require("./privateKeys.json");
const USDT = {
  contract: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
  decimal: 18,
  symbol: "USDT",
};
const BUSD = {
  contract: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
  decimal: 18,
  symbol: "BUSD",
};

async function swapExactTokensForTokens(
  amountIn,
  amountOutMin,
  path,
  fromAddr,
  privateKey
) {
  const myContract = new web3.eth.Contract(ROUTER_ABI, pancakeRouter);
  const code = myContract.methods
    .swapExactTokensForTokens(
      amountIn.toString(),
      amountOutMin.toString(),
      path,
      fromAddr,
      2950523336 //时间戳 随便填个大的时间
    )
    .encodeABI();
  const nonce = await web3.eth.getTransactionCount(fromAddr);
  const rawTx = {
    from: fromAddr,
    to: pancakeRouter,
    nonce: nonce,
    gasPrice: 5100000000,
    gasLimit: 300000,
    chainId: chainId,
    value: 0,
    data: code,
  };
  let tx = new Tx(rawTx);
  tx.sign(privateKey);
  let serializedTx = tx.serialize();
  web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("transactionHash", (hash) => {
      console.log(hash);
    })
    .on("error", (err) => {
      console.log(err);
    });
}

// 将账号剩余USDT余额 买BUSD币
const buyTokenNormal = () => {
  const inToken = USDT;
  const outToken = BUSD;
  const path = [inToken.contract, outToken.contract];
  const tokenContract = new web3.eth.Contract(PAIR_ABI, path[0]);
  for (let i = 0; i < privateKeyList.length; i++) {
    const fromAddr = privateKeyList[i].account;
    const privateKey = Buffer.from(privateKeyList[i].privateKey, "hex");
    tokenContract.methods
      .balanceOf(fromAddr)
      .call()
      .then((balance) => {
        swapExactTokensForTokens(balance, 0, path, fromAddr, privateKey);
      });
  }
};

// 将账号剩余USDT余额 买BUSD币
buyTokenNormal();
