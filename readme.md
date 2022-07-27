多账号批量购买代币

本项目仅支持 erc20token 购买 erc20token

## 使用

首先请确保您的设备已经安装[NodeJS](http://nodejs.cn/)环境，执行如下方法表示环境配置成功。

1.进入项目目录，安装依赖

```bash
node -v
v16.13.1 // 出现版本号即表示node配置成功！
npm -v
8.3.2    // 出现版本号即表示npm配置成功！
```

2.运行项目

```bash
1. 调用 node ./createAccount.js 生成 1000 个账号
2. 将 accounts 目录下的 privateKeyAndAccountArr 按需黏贴至 privateKeys.json
3. 向 1000 个账号转账 适量的 bnb
4. 向 1000 个账号转账 适量的 usdt
5. 将要使用的账号导入 privateKeys.json
6. 修改 approve 文件中的 token 信息，填入要授权的代币，然后命令行调用 node ./approve.js ,
7. 修改 index 文件中 path 路径, 然后命令行调用 node ./index.js
```

可使用批量转账工具向小号转账 https://www.ducks.life/
