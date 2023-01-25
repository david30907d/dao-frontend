import React from "react";
import { useEffect, useState } from "react";
import { getCurrentWalletConnected } from "./util/interact.js";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY);
const BN = web3.utils.BN;
const DECIMALS = 1000000000000000000;
const ApproveDecimals = new BN("1000000000000000000");
const addrOfTicketContract = "0x8f1e1903E4D7D5B5eE3a5c67e2Cbf373121bf922";
const ticketContract = new web3.eth.Contract(require("./Ticket.json").abi, addrOfTicketContract);
const inPersonTicketNFT = new web3.eth.Contract(
  require("./InPersonTicketNFT.json").abi,
  "0xA0C18fAd7e7951497Aef46c5559F84Dbad4b9E50"
);
const GOHM = new web3.eth.Contract(require("./IERC20.json").abi, "0xEe8C4781139286c248B9E81C8ca5C850d6c2c9A7");
const FRAX = new web3.eth.Contract(require("./IERC20.json").abi, "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F");
const DAI = new web3.eth.Contract(require("./IERC20.json").abi, "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1");
export default function ListDescription() {
  const contributors = ["Akira", "Wade", "YaCheng", "Pierce", "David Jr.", "Shawn", "Red", "Jacker"];
  const specialSupport = ["Aaron"];
  const [usdTicketPrice, setUsdTicketPrice] = useState("");
  const [usdContributorTicketPrice, setUsdContributorTicketPrice] = useState("");
  const [gohmTicketPrice, setGohmTicketPrice] = useState("");
  const [gohmContributorTicketPrice, setGohmContributorTicketPrice] = useState("");
  const [inPersonTicketNFTs, setInPersonTicketNFTs] = useState("");
  const [address, setAddress] = useState("");
  const [totalTicketSold, setTotalTicketSold] = useState("");

  async function requestTicketPrice() {
    setUsdTicketPrice((await ticketContract.methods.usdTicketPrices("2022-in-person").call()) / DECIMALS);
    setUsdContributorTicketPrice((await ticketContract.methods.usdTicketPrices("2022-in-person-contributor").call()) / DECIMALS);
    setGohmTicketPrice((await ticketContract.methods.gohmTicketPrices("2022-in-person").call()) / DECIMALS);
    setGohmContributorTicketPrice(
      (await ticketContract.methods.gohmTicketPrices("2022-in-person-contributor").call()) / DECIMALS
    );
  }
  async function requestUserInPersonTicketNFT() {
    const { address } = await getCurrentWalletConnected();
    setAddress(address);
    // TODO: why there's no Transfer event emitted from NFT contract?
    setTotalTicketSold(await inPersonTicketNFT.methods.tokenIds().call());
    setInPersonTicketNFTs(await inPersonTicketNFT.methods.balanceOf(address).call());
  }
  useEffect(requestTicketPrice, []);
  useEffect(requestUserInPersonTicketNFT, []);
  async function buyTicket(tokenName, ticketName) {
    const transactionParameters = {
      to: addrOfTicketContract, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: ticketContract.methods.buyTicket(tokenName, ticketName, ((tokenName === 'gohm') ? false : true)).encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log({
        success: true,
        status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
      });
    } catch (error) {
      console.log({
        success: false,
        status: "😥 Something went wrong: " + error.message,
      });
    }
  }

  const approve = async (tokenName) => {
    let tokenContract;
    if (tokenName == "gohm") {
      tokenContract = GOHM;
    } else if (tokenName == "frax") {
      tokenContract = FRAX;
    } else if (tokenName == "dai") {
      tokenContract = DAI;
    } else {
      throw `Invalid token ${tokenName}`;
    }
    const transactionParameters = {
      to: tokenContract._address, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: tokenContract.methods.approve(addrOfTicketContract, ApproveDecimals.mul(new BN(100))).encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log({
        success: true,
        status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
      });
    } catch (error) {
      console.log({
        success: false,
        status: "😥 Something went wrong: " + error.message,
      });
    }
  };
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Consensus Conf 2022 (Remember to switch to Arbitrum!)</h1>
      <h2>使命與願景 - Mission Statement</h2>
      <div style={{ display: "inline", marginRight: "50px" }}>
        <h3 style={{ color: "red" }}>
          我們將在 2030 年，做到「台灣區塊鏈的龍頭社群」，因為「現代社會對區塊鏈有很多誤解，我們希望這個 conf/DAO
          能不分職業、種族、性別等等，平等地去普及各類區塊鏈知識」。
        </h3>
        <ol type="lower-roman" style={{ listStyleType: "lower-roman" }}>
          <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view">Check Details!</a>
        </ol>
        <a href="https://gnosis-safe.io/app/arb1:0xFBEb8FCcaDB61D4219864E80F95dc9E7DC0a1596/balances">
          <img
            src="https://pbs.twimg.com/profile_images/1566775952620900353/vRyTLmek_400x400.jpg"
            alt="BigCo Inc. logo"
            width="20"
            height="20"
          />
          Multi-sig of this conference
        </a>
        <a href="https://github.com/orgs/consensus-dao/repositories">
          <img
            src="https://visualpharm.com/assets/624/Github-595b40b85ba036ed117dc155.svg"
            alt="BigCo Inc. logo"
            width="20"
            height="20"
          />
          source code
        </a>
        <h2>活動時間與地點 - When and Where</h2>
        <ol style={{ listStyleType: "upper-alpha" }}>
          <li>&#9200; 時間 - 12/10 9:00 ~ 17:00</li>
          <li>
            &#127758; 地點 - AppWorks 4F{" "}
            <a href="https://goo.gl/maps/gNvPm7LuzScsxQEh8">110台北市信義區基隆路一段178號4樓</a>
          </li>
          <li>&#127836; 餐點 - 供午晚餐 (free lunch & supper)</li>
        </ol>
        <h2>徵稿 - Call for Papers</h2>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe9-BdV8BL1bG0G6uoopi_ftoFj55jL5OFRj5ZfIkXVjObGiw/viewform">
          Google Form: Call for Papers
        </a>
        <h2>議程 - Program</h2>
        <ol style={{ listStyleType: "upper-alpha" }}>
          <li>8:30 開放報到 (AppWorks 4F)</li>
          <li>09:00~09:30 「DAO - 新時代的 conference 形式」by David</li>
          <li>09:40~10:10 「區塊鏈 Layer 2 解決方案簡介」 by Vincent</li>
          <li>10:20~10:50 「ERC721RugGripper」by Justa</li>
          <li>11:00~11:30 「Applied Zero-Knowledge Proofs for software engineers: case study」by Alex Kuzmin - </li>
          <li>11:40~12:10 「不需要透過網站且不用透過function即可以執行mint NFT」by Aaron</li>
          <li>12:10~13:10  lunch break (大會供餐）</li>
          <li>13:10~13:40 「現今支付方式比較與加密貨幣的支付解決方案」by Akira</li>
          <li>13:50~14:20 「Aptos 上的 Vesting Wallet」by Justa</li>
          <li>14:30~15:00  tea break</li>
          <li>15:00~15:20  Lightning Talk</li>
          <li>15:30~16:00 「ZK 多重宇宙」by Ray</li>
          <li>16:10~16:40 Job Fairs</li>
          <li>16:40~17:10 「Teleport module on Aptos」by Rick</li>
          <li>17:10~17:15 閉幕</li>
          <li>17:30~      講者跟贊助商晚宴</li>
        </ol>
        <h2>售票 - Ticket Office：</h2>
        <p>總共還剩下{40 - totalTicketSold}張票！</p>
        <h5 style={{ color: "red" }}>
          <img
            src="https://assets.coingecko.com/coins/images/21129/small/token_wsOHM_logo.png?1638764900"
            alt="BigCo Inc. logo"
            width="20"
            height="20"
          />{" "}
          GOHM
        </h5>
        <ol style={{ listStyleType: "upper-latin" }}>
          <li>
            <button onClick={() => approve("gohm")}>Approve</button>
          </li>
          <li>
            <button onClick={() => buyTicket("gohm", "2022-in-person")}>
              一般票（請確保您在 Arbitrum 發起交易！）：GOHM {gohmTicketPrice}
            </button>
          </li>
          <li>
            <button onClick={() => buyTicket("gohm", "2022-in-person-contributor")}>
              貢獻票（請確保您在 Arbitrum 發起交易！）：GOHM {gohmContributorTicketPrice}
            </button>
          </li>
        </ol>
        <h5 style={{ color: "red" }}>
          <img
            src="https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506"
            alt="BigCo Inc. logo"
            width="20"
            height="20"
          />{" "}
          FRAX
        </h5>
        <ol style={{ listStyleType: "upper-latin" }}>
          <li>
            <button onClick={() => approve("frax")}>Approve</button>
          </li>
          <li>
            <button onClick={() => buyTicket("frax", "2022-in-person")}>
              一般票（請確保您在 Arbitrum 發起交易！）：$ {usdTicketPrice}
            </button>
          </li>
          <li>
            <button onClick={() => buyTicket("frax", "2022-in-person-contributor")}>
              貢獻票（請確保您在 Arbitrum 發起交易！）：$ {usdContributorTicketPrice}
            </button>
          </li>
        </ol>
        <h5 style={{ color: "red" }}>
          <img
            src="https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734"
            alt="BigCo Inc. logo"
            width="20"
            height="20"
          />{" "}
          DAI
        </h5>
        <ol style={{ listStyleType: "upper-latin" }}>
          <li>
            <button onClick={() => approve("dai")}>Approve</button>
          </li>
          <li>
            <button onClick={() => buyTicket("dai", "2022-in-person")}>
              一般票（請確保您在 Arbitrum 發起交易！）：$ {usdTicketPrice}
            </button>
          </li>
          <li>
            <button onClick={() => buyTicket("dai", "2022-in-person-contributor")}>
              貢獻票（請確保您在 Arbitrum 發起交易！）：$ {usdContributorTicketPrice}
            </button>
          </li>
        </ol>
        <h2>Join DAO!</h2>
        <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view#%E5%8A%A0%E5%85%A5-DAO-%E4%B9%8B%E5%89%8D%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%95%8F%E8%87%AA%E5%B7%B1-4-%E5%80%8B%E5%95%8F%E9%A1%8C">
          Click Here to Join DAO!
        </a>
        <h2>我的票券 - Your Tickets</h2>
        <p>
          {address} 買了 {inPersonTicketNFTs} 張票！
        </p>
        <h2>工作人員 - Staff</h2>
        <h5>contributors: {contributors.sort(() => Math.random() - 0.5).toString()}</h5>
        <h5>special support: {specialSupport.sort(() => Math.random() - 0.5).toString()}</h5>
      </div>
    </div>
  );
}
