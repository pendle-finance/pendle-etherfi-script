const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x782d9d67feaa4d1cdf8222d9053c8cba1c3b7982",
    receiptToken: "0xb0f7776983ee446c7d689bc726c8b966da837e24",
    lpToken: "0x27255f9aff1868a8efb1182471f4de2121946fd0",
    deployedBlock: 38768028
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0x524be708c4731af532dfed1ae3f0c599733d5c01",
    lpToken: "0x27255f9aff1868a8efb1182471f4de2121946fd0",
    deployedBlock: 38883841
  },
  // {  
  //   // stakedao
  //   address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
  //   receiptToken: "0x738a5c929ce8af03641776d6681c11c8bab54992",
  //   lpToken: "0xf9F9779d8fF604732EBA9AD345E6A27EF5c2a9d6",
  //   deployedBlock: 19027272
  // },
];

const SY = "0x56b70ac3a6ae850f6aee67591d1bb86895ba211e";
const YT = "0xbf1e6e67ce2bd8da1ea7342354126b59b46d4000";
const LP = "0x27255f9aff1868a8efb1182471f4de2121946fd0";

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
