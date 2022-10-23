import React from 'react';
import { useEffect, useState } from "react";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://eth-goerli.g.alchemy.com/v2/5COxhE7z4DDwBECWZfoG2T0goJ9awmmC");
const ticketContract = new web3.eth.Contract(
  require("./Ticket.json").abi,
  "0x02BF9031c93DE680e83aB66Ae6F38efFcB79719b"
);
export default function ListDescription() {
  const contributors = ["Akira", "Wade", "YaCheng", "Pierce", "David Jr.", "Shawn"]
  const specialSupport = ['Aaron']
  const [usdTicketPrice, setUsdTicketPrice] = useState("");
  const [ohmTicketPrice, setOhmTicketPrice] = useState("");
  let account;

  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  async function requestTicketPrice() {
    let tmpTicketPrice = await ticketContract.methods.usdTicketPrices("2022-in-person").call();
    setUsdTicketPrice(tmpTicketPrice);
    let tmpOhmTicketPrice = await ticketContract.methods.ohmTicketPrices("2022-in-person").call();
    setOhmTicketPrice(tmpOhmTicketPrice);
  }
  useEffect(requestTicketPrice, []);
  async function buyTicket(){
    console.log('!!!!!!')
    ticketContract.methods.buyTicket("dai", "2022-in-person", true).send( {from: account}).then((tx) => {
      console.log("Transaction: ", tx);
    });  
    // await ticketContract.methods.buyTicket("dai", "2022-in-person", true);
    console.log('!!!!ned!!')
  }
  return (
    <div className="App">
      <h1 style={{ color: 'green' }}>Consensus Conf 2022</h1>
      <h2>使命與願景 - Mission Statement</h2>
      <div style={{ display: 'inline', marginRight: '50px' }}>
        <h3 style={{ color: 'red' }}>我們將在 2030 年，做到「台灣區塊鏈的龍頭社群」，因為「現代社會對區塊鏈有很多誤解，我們希望這個 conf/DAO 能不分職業、種族、性別等等，平等地去普及各類區塊鏈知識」。</h3>
        <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
          <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view">Check Details!</a>
        </ol>
        <h2>活動時間與地點 - When and Where</h2>
        <ol style={{ listStyleType: 'upper-alpha' }}>
          <li>&#9200; 時間 - 12/10 9:00 ~ 17:00</li>
          <li>&#127758; 地點 - AppWorks School <a href='https://goo.gl/maps/gNvPm7LuzScsxQEh8'>100台北市中正區仁愛路二段99號</a></li>
          <li>&#127836; 餐點 - 供午餐 (free lunch)</li>
        </ol>
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
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/14483/small/token_OHM_%281%29.png?1628311611" alt="BigCo Inc. logo" width="20" height="20" /> OHM</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={buyTicket}>一般票：OHM {ohmTicketPrice}</button></li>
          <li>講者票：OHM yyy</li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506" alt="BigCo Inc. logo" width="20" height="20" /> FRAX</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li><button onClick={buyTicket}>一般票：$ {usdTicketPrice}</button></li>
          <li>講者票：$ yyy</li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734" alt="BigCo Inc. logo" width="20" height="20" /> DAI</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li>一般票：$ {usdTicketPrice}</li>
          <li>講者票：$ yyy</li>
        </ol>
        <h5 style={{ color: 'red' }}><img src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389" alt="BigCo Inc. logo" width="20" height="20" /> USDC</h5>
        <ol style={{ listStyleType: 'upper-latin' }}>
          <li>一般票：$ {usdTicketPrice}</li>
          <li>講者票：$ yyy</li>
        </ol>
        <h2>徵稿 - Call for Papers</h2>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSe9-BdV8BL1bG0G6uoopi_ftoFj55jL5OFRj5ZfIkXVjObGiw/viewform'>Google Form: Call for Papers</a>
        <h2>Join DAO!</h2>
        <a href="https://hackmd.io/FJlahwQTTUWahfzSWDsdaw?view#%E5%8A%A0%E5%85%A5-DAO-%E4%B9%8B%E5%89%8D%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%95%8F%E8%87%AA%E5%B7%B1-4-%E5%80%8B%E5%95%8F%E9%A1%8C">Click Here to Join DAO!</a>
        <h2>我的票券 - Your Tickets</h2>        
        <p>Placeholder: would show your NFT ticket here for entrance!</p>
        <p>show his/her tokenID!</p>
        <h2>工作人員 - Staff</h2>
        <h5>contributors: {contributors.sort(() => Math.random() - 0.5).toString()}</h5>
        <h5>special support: {specialSupport.sort(() => Math.random() - 0.5).toString()}</h5>
      </div>
    </div>
  );
}