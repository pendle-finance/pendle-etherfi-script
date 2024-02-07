const MulticallABI = require("../abis/Multicall.json");
const ethers = require("ethers");

const MULTICALL_ADDRESS = "0x842ec2c7d803033edf55e478f461fc547bc54eb2";
const PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/arbitrum"
);
const MULTICALL_CONTRACT = new ethers.Contract(
  MULTICALL_ADDRESS,
  MulticallABI,
  PROVIDER
);
const MULTICALL_BATCH_SIZE = 1000;

async function aggregateMulticall(callDatas, blockNumber) {
  const result = [];
  for (let start = 0; start < callDatas.length; start += MULTICALL_BATCH_SIZE) {
    const resp = (
      await MULTICALL_CONTRACT.callStatic.aggregate(
        callDatas
          .slice(start, start + MULTICALL_BATCH_SIZE)
          .map((c) => [c.target, c.callData]),
        {
          blockTag: blockNumber,
        }
      )
    ).returnData;
    result.push(...resp);
  }
  return result;
}

module.exports = {
  aggregateMulticall,
};
