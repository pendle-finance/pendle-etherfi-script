const { SY, LP, YT, LIQUID_LOCKERS, PENDLE_TREASURY } = require("./consts");
const { BigNumber } = require("ethers");
const {
  getAllERC20Balances,
  getAllYTInterestData,
  getAllMarketActiveBalances,
} = require("./multicall");

// in domination of yield token (WEETH)

const _1E18 = BigNumber.from(10).pow(18);

function increaseUserAmount(result, user, amount) {
  if (!result[user]) {
    result[user] = BigNumber.from(0);
  }
  result[user] = result[user].add(amount);
}

async function applyYtHolderShares(result, allUsers, blockNumber) {
  const balances = (await getAllERC20Balances(YT, allUsers, blockNumber)).map((v, i) => {
    return {
      user: allUsers[i],
      balance: v,
    };
  });

  const allInterests = (await getAllYTInterestData(YT, allUsers, blockNumber)).map(
    (v, i) => {
      return {
        user: allUsers[i],
        userIndex: v.index,
        amount: v.accrue,
      };
    }
  );

  // using max index (not current index) won't affect the result
  const YTIndex = allInterests
    .map((v) => v.userIndex)
    .reduce((a, b) => (a.gt(b) ? a : b), BigNumber.from(0));

  const YTBalances = {};
  // 1 YT is receiving interest from
  for (const b of balances) {
    // result[b.user] = BigNumber.from(b.balance);
    const impliedBalance = BigNumber.from(b.balance).mul(_1E18).div(YTIndex);

    const feeShare = impliedBalance.mul(3).div(100);
    const remainingBalance = impliedBalance.sub(feeShare);

    increaseUserAmount(result, b.user, remainingBalance);
    increaseUserAmount(result, PENDLE_TREASURY, feeShare);

    YTBalances[b.user] = BigNumber.from(b.balance);
  }

  for (const i of allInterests) {
    if (i.user == YT) {
      continue;
    }
    if (i.userIndex == "0") {
      if (YTBalances[i.user].gt(0)) {
        throw new Error(
          `Pendle Fetcher: User ${i.user} has YT balance but no index`
        );
      }
      continue;
    }
    const pendingInterest = YTBalances[i.user]
      .mul(YTIndex.sub(i.userIndex))
      .mul(_1E18)
      .div(YTIndex.mul(i.userIndex));
    const totalInterest = pendingInterest.add(i.amount);
    increaseUserAmount(result, i.user, totalInterest);
  }
}

async function applyLpHolderShares(result, lpToken, allUsers, blockNumber) {
  const totalSy = (await getAllERC20Balances(SY, [LP], blockNumber))[0];
  const allActiveBalances = await getAllMarketActiveBalances(
    lpToken,
    allUsers,
    blockNumber
  );
  const totalActiveSupply = allActiveBalances.reduce(
    (a, b) => a.add(b),
    BigNumber.from(0)
  );

  async function processLiquidLocker(liquidLocker, totalBoostedSy) {
    const validLockers = LIQUID_LOCKERS.filter(
      (l) => l.address == liquidLocker && l.lpToken == lpToken
    );

    if (
      validLockers.length == 0 ||
      validLockers[0].deployedBlock > blockNumber
    ) {
      return;
    }

    const receiptToken = validLockers[0].receiptToken;
    const allReceiptTokenBalances = await getAllERC20Balances(
      receiptToken,
      allUsers,
      blockNumber
    );
    const totalLiquidLockerShares = allReceiptTokenBalances.reduce(
      (a, b) => a.add(b),
      BigNumber.from(0)
    );

    // console.log(validLockers, totalBoostedSy.toString(), totalLiquidLockerShares.toString());

    if (totalLiquidLockerShares.eq(0)) {
      return;
    }

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      const receiptTokenBalance = allReceiptTokenBalances[i];
      const boostedSyBalance = totalBoostedSy
        .mul(receiptTokenBalance)
        .div(totalLiquidLockerShares);
      increaseUserAmount(result, user, boostedSyBalance);
    }
  }

  for (let i = 0; i < allUsers.length; i++) {
    const holder = allUsers[i];
    const boostedSyBalance = allActiveBalances[i]
      .mul(totalSy)
      .div(totalActiveSupply);

    if (isLiquidLocker(holder)) {
      await processLiquidLocker(holder, boostedSyBalance);
    } else {
      increaseUserAmount(result, holder, boostedSyBalance);
    }
  }
}

function isLiquidLocker(a) {
  return LIQUID_LOCKERS.some((l) => l.address == a);
}

module.exports = {
  applyYtHolderShares,
  applyLpHolderShares,
};
