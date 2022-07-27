// 创建账号脚本
const Web3 = require("web3");
var web3 = new Web3();
const fs = require("fs");

const privateKeyAndAccountArr = [];
const accountsArr = [];
const privateKeyArr = [];
let accountsStr = "";
let privateKeyStr = "";

for (let i = 0; i < 1000; i++) {
  const account = web3.eth.accounts.create();
  privateKeyAndAccountArr.push({
    privateKey: account.privateKey.substring(2),
    account: account.address,
  });
  accountsArr.push(privateKeyAndAccountArr[i].account);
  privateKeyArr.push(privateKeyAndAccountArr[i].privateKey);
  accountsStr += privateKeyAndAccountArr[i].account + "\n";
  privateKeyStr += privateKeyAndAccountArr[i].privateKey + "\n";
}
fs.writeFile(
  "./accounts/privateKeyAndAccountArr.json",
  JSON.stringify(privateKeyAndAccountArr),
  (err) => {
    if (err) {
      create;
      console.error(err);
      return;
    }
  }
);

fs.writeFile(
  "./accounts/privateKeyArr.json",
  JSON.stringify(privateKeyArr),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);
fs.writeFile("./accounts/privateKeyStr.txt", privateKeyStr, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
fs.writeFile(
  "./accounts/accountsArr.json",
  JSON.stringify(accountsArr),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);
fs.writeFile("./accounts/accountsStr.txt", accountsStr, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
