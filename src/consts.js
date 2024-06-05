const PendleMarketABI = require("../abis/PendleMarket.json");
const PendleYieldTokenABI = require("../abis/PendleYieldToken.json");

const ethers = require("ethers");
const LIQUID_LOCKERS = [
  {
    // penpie
    address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
    receiptToken: "0xc683e9a72a2cc87b2110cf680705a21a637fe04e",
    lpToken: "0x18bafcabf2d5898956ae6ac31543d9657a604165",
    deployedBlock: 20019723
  },
  {
    // equilibira
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    receiptToken: "0xb55a1785a2edaddad3d373b4ecf5916b9d066733",
    lpToken: "0x18bafcabf2d5898956ae6ac31543d9657a604165",
    deployedBlock: 19975459    
  },
  {  
    // stakedao
    address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
    receiptToken: "0x0b493988b2425218068767f18dd1ecf2f0084c3d",
    lpToken: "0x18bafcabf2d5898956ae6ac31543d9657a604165",
    deployedBlock: 19982914
  },
];

const SY = "0x8db42af6b2de9e8aee47f3423570d8e9c3873796";
const YT = "0x5439c3ef0072e4a19c44478cdf947f5d957e66c7";
const LP = "0x18bafcabf2d5898956ae6ac31543d9657a604165";

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
