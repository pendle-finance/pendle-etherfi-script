const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6db96bbeb081d2a85e0954c252f2c1dc108b3f81",
    receiptToken: "0x11625278c86f87f1d6be5d911411ad22f00a77ef",
    lpToken: "0xe11f9786b06438456b044b3e21712228adcaa0d1",
    deployedBlock: 178682192
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0x968e4a4e4b80e7dd258e2d7e3be7467c2432b49b",
    lpToken: "0xe11f9786b06438456b044b3e21712228adcaa0d1",
    deployedBlock: 178567905
  },
  // {
  //   // stakedao
  //   address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
  //   receiptToken: "0xc6bb9d3d4c980b53c31f6ffb998bea7e74029954",
  // },
];

const SY = "0xa6c895eb332e91c5b3d00b7baeeaae478cc502da";
const YT = "0xf28db483773e3616da91fdfa7b5d4090ac40cc59";
const LP = "0xe11f9786b06438456b044b3e21712228adcaa0d1";

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
