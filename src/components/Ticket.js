function Ticket() {
  return (
    <div className="container section ticket mb-9">
      <div className="title pb-6">
        <h3>購票 - Ticket</h3>
        <p>購票教學 - Tutorial</p>
      </div>
      <div className="content">
        <div className="content-item  ticket-step1 pr-5">
          <h5>Step_1 連接錢包至 Arbitrum One</h5>
          <ul className="font">
            <li className="mb-2">
              a. 選擇票種並結帳
              <a className="wallet-Btn ml-2" href="https://consensus-confv1.on.fleek.co/">
                Connect Wallet
              </a>
            </li>
            <li>
              b. 切換主網
              <a className="switch-Btn ml-2" href="https://consensus-confv1.on.fleek.co/">
                Switch to Arbitrum One
              </a>
            </li>
          </ul>
        </div>
        <div className="content-item ticket-step2 pl-5 pr-10 font">
          <h5>Step_2 選擇付款貨幣</h5>
          <p className="mb-2">從下面的代幣中選擇一種進行結帳</p>
          <div className="radio-btn ">
            <label>
              <img src="GOHM.png" alt="" />
              <p>GOHM</p>
              <input type="radio" value="GOHM" />
            </label>
            <label>
              <img src="FRAX.png" alt="" />
              <p>FRAX</p>
              <input type="radio" value="FRAX" />
            </label>
            <label>
              <img src="DAI.png" alt="" />
              <p>DAI</p>
              <input type="radio" value="DAI" />
            </label>
          </div>
        </div>
        <div className="ticket-step3 font pl-5">
          <h5>Step_3 選擇票種並結帳</h5>
          <p>選擇購入的票種並直接結帳</p>
          <p className="mb-1">(注意：入場時核實）</p>
          <p className="mb-1">結帳資訊：</p>
          <ul className="mb-1">
            <li>
              <img src="normal.png" alt="" />
              <p>一般票：</p>
              <img src="gohms.png" alt="" />
              <p>0.006/張</p>
            </li>
            <li className="mb-2">
              <img src="contri.png" alt="" />
              <p>貢獻票：</p>
              <img src="gohms.png" alt="" />
              <p>0.003/張</p>
            </li>
            <li>
              <a className="mr-2" href="">
                <img src="normal.png" alt="" />
                <p>購買一般票</p>
              </a>
              <a className="contibute" href="">
                <img src="contri.png" alt="" />
                <p>購買貢獻票</p>
              </a>
            </li>
          </ul>
          <p className="leftTic">目前還剩下 38 張票</p>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
