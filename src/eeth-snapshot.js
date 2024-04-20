const { LP, YT, LIQUID_LOCKERS } = require("./consts");
const { applyLpHolderShares, applyYtHolderShares } = require("./logic");
const { BigNumber } = require("ethers");
const { getAllPendleUsers } = require("./pendle-api");
const fs = require("fs");

async function fetchUserBalanceSnapshot(allYTUsers, allLPUsers, blockNumber) {
  const result = {};
  await applyYtHolderShares(
    result,
    allYTUsers,
    blockNumber
  );
  await applyLpHolderShares(result, LP, allLPUsers, blockNumber);
  return result;
}

async function fetchUserBalanceSnapshotBatch(blockNumbers) {
  const allLiquidLockerTokens = LIQUID_LOCKERS.map((locker) => locker.receiptToken);
  let allYTUsers = await getAllPendleUsers([YT]);
  let allLPUsers = await getAllPendleUsers([LP, ...allLiquidLockerTokens]);
  return await Promise.all(
    blockNumbers.map((b) => fetchUserBalanceSnapshot(allYTUsers, allLPUsers, b))
  );
}

async function main() {
  const block = 203064141;
  const res = (await fetchUserBalanceSnapshotBatch([block]))[0];
  const normalizedRes = {};

  for (const user in res) {
    normalizedRes[user] = res[user].toString();
  }

  fs.writeFileSync(`snapshots/${block}.json`, JSON.stringify(normalizedRes, null, 2))
}

main()
  .catch((err) => console.error(err))
  .then(() => process.exit(0));
