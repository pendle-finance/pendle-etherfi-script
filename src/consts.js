const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
    receiptToken: "0xd361ff93ad7112ddf3c3bded94bab4eb364e31cd",
    lpToken: "0xc8edd52d0502aa8b4d5c77361d4b3d300e8fc81c",
    deployedBlock: 19881498
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0x93462b02cf30f93e6635e3acacc867744a7078da",
    lpToken: "0xc8edd52d0502aa8b4d5c77361d4b3d300e8fc81c",
    deployedBlock: 19910313    
  },
  {  
    // stakedao
    address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
    receiptToken: "0x738a5c929ce8af03641776d6681c11c8bab54992",
    lpToken: "0xc8edd52d0502aa8b4d5c77361d4b3d300e8fc81c",
    deployedBlock: 19027272
  },
];

const SY = "0xac0047886a985071476a1186be89222659970d65";
const YT = "0xa54df645a042d24121a737daa89a57ebf8e0b71c";
const LP = "0xc8edd52d0502aa8b4d5c77361d4b3d300e8fc81c";

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
