//  bsc测试网 环境
const Tx = require("ethereumjs-tx");

const ROUTER_ABI = require("./abis/router.json");
const PAIR_ABI = require("./abis/pair.json");
const { parseAmount } = require("./format");
const { defaultChainId, addresses, web3, privateKeyList } = require("./config");
const pancakeRouter = addresses.router; //pancakeRouter

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
    chainId: defaultChainId,
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
async function swapExactETHForTokens(
  amountIn,
  amountOutMin,
  path,
  fromAddr,
  privateKey
) {
  const myContract = new web3.eth.Contract(ROUTER_ABI, pancakeRouter);
  const code = myContract.methods
    .swapExactETHForTokens(
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
    chainId: defaultChainId,
    value: web3.utils.numberToHex(amountIn),
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
async function swapExactTokensForETH(
  amountIn,
  amountOutMin,
  path,
  fromAddr,
  privateKey
) {
  const myContract = new web3.eth.Contract(ROUTER_ABI, pancakeRouter);
  const code = myContract.methods
    .swapExactTokensForETH(
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
    chainId: defaultChainId,
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

// 用busd 买usdt
const tokenBuyToken = async () => {
  const inToken = addresses.busd;
  const outToken = addresses.usdt;
  const path = [inToken, outToken];
  const tokenContract = new web3.eth.Contract(PAIR_ABI, path[0]);
  const decimal = await tokenContract.methods.decimals().call();
  const _amount = "0.1"; //花费的数量
  const amount = parseAmount(_amount, decimal); //
  for (let i = 0; i < privateKeyList.length; i++) {
    const fromAddr = privateKeyList[i].account;
    const privateKey = Buffer.from(privateKeyList[i].privateKey, "hex");
    swapExactTokensForTokens(amount, 0, path, fromAddr, privateKey);
  }
};

// eth买token
const ethBuyToken = async () => {
  const inToken = addresses.weth;
  const outToken = addresses.usdt;
  const path = [inToken, outToken];
  const tokenContract = new web3.eth.Contract(PAIR_ABI, path[0]);
  const decimal = await tokenContract.methods.decimals().call();
  const _amount = "0.1"; //花费的数量
  const amount = parseAmount(_amount, decimal); //
  for (let i = 0; i < privateKeyList.length; i++) {
    const fromAddr = privateKeyList[i].account;
    const privateKey = Buffer.from(privateKeyList[i].privateKey, "hex");
    swapExactETHForTokens(amount, 0, path, fromAddr, privateKey);
  }
};

// token买eth
const tokenBuyEth = async () => {
  const inToken = addresses.usdt;
  const outToken = addresses.weth;
  const path = [inToken, outToken];
  const tokenContract = new web3.eth.Contract(PAIR_ABI, path[0]);
  const decimal = await tokenContract.methods.decimals().call();
  const _amount = "0.1"; //花费的数量
  const amount = parseAmount(_amount, decimal); //
  for (let i = 0; i < privateKeyList.length; i++) {
    const fromAddr = privateKeyList[i].account;
    const privateKey = Buffer.from(privateKeyList[i].privateKey, "hex");
    swapExactTokensForETH(amount, 0, path, fromAddr, privateKey);
  }
};
tokenBuyToken();
// ethBuyToken();
// tokenBuyEth();
