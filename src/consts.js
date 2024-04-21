const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
    receiptToken: "0xeb808b323d8b9f2e2424b83e8a08c5f2633c9254",
    lpToken: "0xe26d7f9409581f606242300fbfe63f56789f2169",
    deployedBlock: 19531959
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0xb68bba67c943665343d388302aa4c82754d4bd34",
    lpToken: "0xe26d7f9409581f606242300fbfe63f56789f2169",
    deployedBlock: 19536683    
  },
];

const SY = "0xd7df7e085214743530aff339afc420c7c720bfa7";
const YT = "0x7c2d26182adeef96976035986cf56474fec03bda";
const LP = "0xe26d7f9409581f606242300fbfe63f56789f2169";

const PENDLE_TREASURY = "0x8270400d528c34e1596ef367eedec99080a1b592";

const MARKET_IFACE = new ethers.utils.Interface(PendleMarketABI);
const YIELD_TOKEN_IFACE = new ethers.utils.Interface(PendleYieldTokenABI);

module.exports = {
  LIQUID_LOCKERS,
  SY,
  YT,
  LP,
  MARKET_IFACE,
  YIELD_TOKEN_IFACE,
  PENDLE_TREASURY
};
