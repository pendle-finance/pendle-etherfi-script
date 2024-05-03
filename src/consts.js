const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
    receiptToken: "0xf0fbe0001e12795ed62d085829271c10d24519c4",
    lpToken: "0x7d372819240d14fb477f17b964f95f33beb4c704",
    deployedBlock: 19680970
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0xd2539f03427dbd70c7cc42b779fa41f994cc4bfa",
    lpToken: "0x7d372819240d14fb477f17b964f95f33beb4c704",
    deployedBlock: 19754611    
  },
  // {  
  //   // stakedao
  //   address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
  //   receiptToken: "0xc6bb9d3d4c980b53c31f6ffb998bea7e74029954",
  //   lpToken: "0x7d372819240D14fB477f17b964f95F33BeB4c704",
  //   deployedBlock: 19027272
  // },
];

const SY = "0xac0047886a985071476a1186be89222659970d65";
const YT = "0x129e6b5dbc0ecc12f9e486c5bc9cdf1a6a80bc6a";
const LP = "0x7d372819240d14fb477f17b964f95f33beb4c704";

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
