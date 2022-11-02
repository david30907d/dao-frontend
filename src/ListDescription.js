import React from 'react';
import { useEffect, useState } from "react";
import { getCurrentWalletConnected } from "./util/interact.js";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://opt-goerli.g.alchemy.com/v2/9TWpT42dQ5U9KsjrptwNQ2g7pbQBSpQq");
const BN = web3.utils.BN;
const DECIMALS = new BN('1000000000000000000');
const addrOfTicketContract = '0xc559af4C9d97B397bd3329E081B2eb39C6bB401C';
const ticketContract = new web3.eth.Contract(
  require("./Ticket.json").abi,
  addrOfTicketContract
);
const inPersonTicketNFT = new web3.eth.Contract(
  require("./InPersonTicketNFT.json").abi,
  "0x2C3a0735A686cD8DB0c862B3dE13e61600201e5A"
);
const GOHM = new web3.eth.Contract(
  require("./IERC20.json").abi,
  "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
)
const FRAX = new web3.eth.Contract(
  require("./IERC20.json").abi,
  "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
)
const DAI = new web3.eth.Contract(
  require("./IERC20.json").abi,
  "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
)
const USDC = new web3.eth.Contract(
  require("./IERC20.json").abi,
  "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
)
export default function ListDescription() {
  const contributors = ["Akira", "Wade", "YaCheng", "Pierce", "David Jr.", "Shawn"]
  const specialSupport = ['Aaron']
  const [usdTicketPrice, setUsdTicketPrice] = useState("");
  const [usdContributorTicketPrice, setUsdContributorTicketPrice] = useState("");
  const [gohmTicketPrice, setGohmTicketPrice] = useState("");
  const [gohmContributorTicketPrice, setGohmContributorTicketPrice] = useState("");
  const [inPersonTicketNFTs, setInPersonTicketNFTs] = useState("");
  const [address, setAddress] = useState("");

  async function requestTicketPrice() {
    setUsdTicketPrice(await ticketContract.methods.usdTicketPrices("2022-in-person").call());
    setUsdContributorTicketPrice(await ticketContract.methods.usdTicketPrices("2022-in-person-contributor").call());
    setGohmTicketPrice(await ticketContract.methods.gohmTicketPrices("2022-in-person").call());
    setGohmContributorTicketPrice(await ticketContract.methods.gohmTicketPrices("2022-in-person-contributor").call());
  }
  async function requestUserInPersonTicketNFT() {
    const { address } = await getCurrentWalletConnected();
    setAddress(address);
    // TODO: why there's no Transfer event emitted from NFT contract?
    let events = await inPersonTicketNFT.getPastEvents("Transfer");
    setInPersonTicketNFTs(await inPersonTicketNFT.methods.balanceOf(address).call());
  }
  useEffect(requestTicketPrice, []);
  useEffect(requestUserInPersonTicketNFT, []);
  async function buyTicket(tokenName, ticketName){
    const transactionParameters = {
      to: addrOfTicketContract, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: ticketContract.methods
        .buyTicket(tokenName, ticketName, true)
        .encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log({
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
          txHash,
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
    if (tokenName == 'gohm') {
      tokenContract = GOHM;
    } else if (tokenName == 'frax') {
      tokenContract = FRAX;
    } else if (tokenName == 'dai') {
      tokenContract = DAI;
    } else if (tokenName == 'usdc') {
      tokenContract = USDC;
    } else {
      throw `Invalid token ${tokenName}`
    }
    const transactionParameters = {
      to: tokenContract._address, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: tokenContract.methods
        .approve(addrOfTicketContract, DECIMALS.mul(new BN(100)) )
        .encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log({
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
          txHash,
      });
    } catch (error) {
      console.log({
        success: false,
        status: "😥 Something went wrong: " + error.message,
      });
    }
  }
  return (
    <div className="App">
      <h1 style={{ color: 'green' }}>Consensus Conf 2022(WIP, 還在 testnet)</h1>
      <h2>使命與願景 - Mission Statement</h2>
      <div style={{ display: 'inline', marginRight: '50px' }}>
        <h3 style={{ color: 'red' }}>我們將在 2030 年，做到「台灣區塊鏈的龍頭社群」，因為「現代社會對區塊鏈有很多誤解，我們希望這個 conf/DAO 能不分職業、種族、性別等等，平等地去普及各類區塊鏈知識」。</h3>
        <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
          <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view">Check Details!</a>
        </ol>
        <h2>活動時間與地點 - When and Where</h2>
        <ol style={{ listStyleType: 'upper-alpha' }}>
          <li>&#9200; 時間 - 12/10 9:00 ~ 17:00</li>
          <li>&#127758; 地點 - AppWorks School 4F <a href='https://goo.gl/maps/gNvPm7LuzScsxQEh8'>100台北市中正區仁愛路二段99號 4F</a></li>
          <li>&#127836; 餐點 - 供午餐 (free lunch)</li>
        </ol>
        <h2>徵稿 - Call for Papers</h2>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSe9-BdV8BL1bG0G6uoopi_ftoFj55jL5OFRj5ZfIkXVjObGiw/viewform'>Google Form: Call for Papers</a>
        <h2>議程 - Program</h2>
        <ol style={{ listStyleType: 'upper-alpha' }}>
          <li>9:00-9:30 「主題」 by XXX</li>
          <li>9:45-10:15 「主題」 by XXX</li>
          <li>12:00-13:00 「午餐」 by conf</li>
          <li>13:15-14:45 「主題」 by XXX</li>
          <p>...</p>
          <p>...</p>
          <p>...</p>
        </ol>
        <h2>售票 - Ticket Office：</h2>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/21129/small/token_wsOHM_logo.png?1638764900" alt="BigCo Inc. logo" width="20" height="20" /> GOHM</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={() => approve("gohm")}>Approve</button></li>
          <li><button onClick={() => buyTicket("gohm", "2022-in-person")}>一般票：GOHM {gohmTicketPrice}</button></li>
          <li><button onClick={() => buyTicket("gohm", "2022-in-person-contributor")}>貢獻票：GOHM {gohmContributorTicketPrice}</button></li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506" alt="BigCo Inc. logo" width="20" height="20" /> FRAX</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={() => approve("frax")}>Approve</button></li>
          <li><button onClick={() => buyTicket("frax", "2022-in-person")}>一般票：$ {usdTicketPrice}</button></li>
          <li><button onClick={() => buyTicket("frax", "2022-in-person-contributor")}>貢獻票：$ {usdContributorTicketPrice}</button></li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734" alt="BigCo Inc. logo" width="20" height="20" /> DAI</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={() => approve("dai")} >Approve</button></li>
        <li><button onClick={() => buyTicket("dai", "2022-in-person")}>一般票：$ {usdTicketPrice}</button></li>
        <li><button onClick={() => buyTicket("dai", "2022-in-person-contributor")}>貢獻票：$ {usdContributorTicketPrice}</button></li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389" alt="BigCo Inc. logo" width="20" height="20" /> USDC</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={() => approve("usdc")} >Approve</button></li>
          <li><button onClick={() => buyTicket("usdc", "2022-in-person")}>一般票：$ {usdTicketPrice}</button></li>
          <li><button onClick={() => buyTicket("usdc", "2022-in-person-contributor")}>貢獻票：$ {usdContributorTicketPrice}</button></li>
        </ol>
        <h2>Join DAO!</h2>
        <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view#%E5%8A%A0%E5%85%A5-DAO-%E4%B9%8B%E5%89%8D%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%95%8F%E8%87%AA%E5%B7%B1-4-%E5%80%8B%E5%95%8F%E9%A1%8C">Click Here to Join DAO!</a>
        <h2>我的票券 - Your Tickets</h2>        
        <p>{address} 買了 {inPersonTicketNFTs} 張票！</p>
        <h2>工作人員 - Staff</h2>
        <h5>contributors: {contributors.sort(() => Math.random() - 0.5).toString()}</h5>
        <h5>special support: {specialSupport.sort(() => Math.random() - 0.5).toString()}</h5>
      </div>
    </div>
  );
}