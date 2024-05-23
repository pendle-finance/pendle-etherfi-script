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
  const block = 38961933;
  const res = (await fetchUserBalanceSnapshotBatch([block]))[0];
  const normalizedRes = {};

  let sum = BigNumber.from(0);
  for (const user in res) {

    console.log(user, res[user].toString());

    normalizedRes[user] = res[user].toString();
    let multiplier = BigNumber.from('0x' + user[user.length - 1]).add(1);
    sum = sum.add(res[user].mul(multiplier));
  }
}

main()
  .catch((err) => console.error(err))
  .then(() => process.exit(0));
