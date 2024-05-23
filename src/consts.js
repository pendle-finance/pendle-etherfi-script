const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6db96bbeb081d2a85e0954c252f2c1dc108b3f81",
    receiptToken: "0xa7d760926f3098e9fb5a93018155578fcdad75c0",
    lpToken: "0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6",
    deployedBlock: 211800842
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0x198ddb596a080215f0e15caeabca7eab6b2d7a8f",
    lpToken: "0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6",
    deployedBlock: 213150189
  },
  // {  
  //   // stakedao
  //   address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
  //   receiptToken: "0x738a5c929ce8af03641776d6681c11c8bab54992",
  //   lpToken: "0xf9F9779d8fF604732EBA9AD345E6A27EF5c2a9d6",
  //   deployedBlock: 19027272
  // },
];

const SY = "0xa6c895eb332e91c5b3d00b7baeeaae478cc502da";
const YT = "0xfb2a7ac0372c2425c273932f8d438518402a873e";
const LP = "0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6";

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
