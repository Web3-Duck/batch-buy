多账号批量购买代币

本项目支持 eth 买 token
token 买 token
token 买 eth

## 使用

首先请确保您的设备已经安装[NodeJS](http://nodejs.cn/)环境，执行如下方法表示环境配置成功。

```bash
node -v
v16.13.1 // 出现版本号即表示node配置成功！
npm -v
8.3.2    // 出现版本号即表示npm配置成功！
```

本项目需要 node 环境，批量购买并不是一步到位的流程。
场景需求:用户需要多个账号，批量购买同一代币。批量购买代币涉及到多个流程。
假如用户需要在 bsc-test 链用 usdt 购买 busd。

#### 则简单的流程如下

1. 用户获取 bnb 作为 gas 费用
2. 用户获取 usdt 作为买的币
3. 用户授权 usdt 给 router 合约
4. 用户调用 router 购买函数

1.进入项目目录，安装依赖

```bash
npm install // 安装第三方库
```

2.运行项目,具体操作流程

1. 调用 node ./createAccount.js 生成 1000 个账号
2. 将 accounts 目录下的 privateKeyAndAccountArr 按需黏贴至 privateKeys.json
3. 向 1000 个账号转账 适量的 bnb
4. 向 1000 个账号转账 适量的 usdt
5. 将要使用的账号导入 privateKeys.json
6. 修改 approve 文件中的 token 信息，填入要授权的代币，然后命令行调用 node ./approve.js ,
7. index 文件中总共有三个函数,tokenBuyToken，ethBuyToken tokenBuyEth,请注释其中两个函数，选择另一个调用
8. 修改 index 文件中要调用函数的 path 路径,path 路径是填写币种合约，如用 busd 购买 usdt,则 path[0]是 busd 合约地址
   path[1]是 usdt 合约地址
9. 然后命令行调用 node ./index.js

```bash
node ./createAccount.js // 创建账号
node ./approve.js // 授权合约
node ./index.js  //购买
```

可使用批量转账工具向小号转账 https://www.ducks.life/
