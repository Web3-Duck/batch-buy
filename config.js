const Web3 = require("web3");
const privateKeyList = require("./privateKeys.json");

const defaultChainId = 97;
const rpc = {
  97: "http://54.215.124.49:8575", //bsc测试网
  56: "https://rpc.ankr.com/bsc", //bsc主网
};

const addresses = {
  56: {
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    usdt: "0x55d398326f99059fF775485246999027B3197955",
    busd: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
  97: {
    router: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    usdt: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    busd: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
  },
};

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(rpc[defaultChainId]));

module.exports = {
  defaultChainId,
  web3,
  addresses: addresses[defaultChainId],
  privateKeyList,
};
