import wallet from "../handle.js";

export const kuruLite = async (px) => {
  const walletData = await wallet(px);
  const data = `0xffa5210a00000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084c63058385ebab2db81e1e323b1191c40bf15e3000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000013d3980e2d76a385000000000000000000000000000000000000000000000000000000000000000010000000000000000000000009888f5735274f132041caca42adec8b4518a12070000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001`;
  const gasEstimate = await walletData.wallet.eth.estimateGas({
    from: walletData.account.address,
    to: "0xc816865f172d640d93712C68a7E1F83F3fA63235",
    data: data,
    value: walletData.wallet.utils.toWei("0.1", "ether"),
  });
  const transaction = {
    from: walletData.account.address,
    to: "0xc816865f172d640d93712C68a7E1F83F3fA63235",
    data: data,
    value: walletData.wallet.utils.toWei("0.1", "ether"),
    gas: gasEstimate,
    gasPrice: await walletData.wallet.eth.getGasPrice(),
  };
  const signedTransaction = await walletData.account.signTransaction(
    transaction,
    walletData.privateKey
  );
  const receipt = await walletData.wallet.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  return `Successfully Swap Monad to HOCHi on Kuru.io: https://testnet.monadexplorer.com/tx/${receipt.logs[0].transactionHash}`;
};
