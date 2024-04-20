const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6db96bbeb081d2a85e0954c252f2c1dc108b3f81",
    receiptToken: "0x264f4138161aae16b76dec7d4eeb756f25fa67cd",
    lpToken: "0x952083cde7aaa11ab8449057f7de23a970aa8472",
    deployedBlock: 198137402
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0x5017d294d5c354cf12d2a11f004aeed21d3f9003",
    lpToken: "0x952083cde7aaa11ab8449057f7de23a970aa8472",
    deployedBlock: 197510687    
  }
];

const SY = "0xa6c895eb332e91c5b3d00b7baeeaae478cc502da";
const YT = "0xdcdc1004d5c271adc048982d7eb900cc4f472333";
const LP = "0x952083cde7aaa11ab8449057f7de23a970aa8472";

const PENDLE_TREASURY = "0xcbcb48e22622a3778b6f14c2f5d258ba026b05e6";

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
