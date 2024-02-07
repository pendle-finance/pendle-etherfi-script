const MulticallABI = require("../abis/Multicall.json");
const ethers = require("ethers");
const { MARKET_IFACE, YIELD_TOKEN_IFACE } = require("./consts");

const MULTICALL_ADDRESS = "0x842ec2c7d803033edf55e478f461fc547bc54eb2";
const PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/arbitrum"
);
const MULTICALL_CONTRACT = new ethers.Contract(
  MULTICALL_ADDRESS,
  MulticallABI,
  PROVIDER
);
const MULTICALL_BATCH_SIZE = 2000;

async function aggregateMulticall(callDatas, blockNumber) {
  if (!blockNumber) {
    throw new Error("blockNumber is required");
  }
  const allCalls = [];
  for (let start = 0; start < callDatas.length; start += MULTICALL_BATCH_SIZE) {
    allCalls.push(
      MULTICALL_CONTRACT.callStatic.aggregate(
        callDatas
          .slice(start, start + MULTICALL_BATCH_SIZE)
          .map((c) => [c.target, c.callData]),
        {
          blockTag: blockNumber,
        }
      )
    );
  }

  const result = await Promise.all(allCalls);
  return result.map((d) => d.returnData).flat();
}

async function getAllERC20Balances(token, addresses, blockNumber) {
  const callDatas = addresses.map((address) => ({
    target: token,
    callData: MARKET_IFACE.encodeFunctionData("balanceOf", [address]),
  }));

  const balances = await aggregateMulticall(callDatas, blockNumber);
  return balances.map(
    (b) => ethers.utils.defaultAbiCoder.decode(["uint256"], b)[0]
  );
}

async function getAllMarketActiveBalances(market, addresses, blockNumber) {
  const callDatas = addresses.map((address) => ({
    target: market,
    callData: MARKET_IFACE.encodeFunctionData("activeBalance", [address]),
  }));
  const balances = await aggregateMulticall(callDatas, blockNumber);
  return balances.map(
    (b) => ethers.utils.defaultAbiCoder.decode(["uint256"], b)[0]
  );
}

async function getAllYTInterestData(yt, addresses, blockNumber) {
  const callDatas = addresses.map((address) => ({
    target: yt,
    callData: YIELD_TOKEN_IFACE.encodeFunctionData("userInterest", [address]),
  }));
  const interests = await aggregateMulticall(callDatas, blockNumber);
  return interests.map((b) => {
    const rawData = ethers.utils.defaultAbiCoder.decode(
      ["uint128", "uint128"],
      b
    );
    return {
      index: rawData[0],
      accrue: rawData[1],
    };
  });
}

module.exports = {
  aggregateMulticall,
  getAllERC20Balances,
  getAllMarketActiveBalances,
  getAllYTInterestData,
};
