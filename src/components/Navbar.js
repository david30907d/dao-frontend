import react from "react";

function Navbar() {
  return (
    // navbar
    <div className="navbar container">
      <h1 class="logo">
        <img src="Logo.svg" alt="" />
      </h1>
      <div className="menu">
        <ul className="list">
          <li>
            <a href="">Buy Tickets</a>
          </li>
          <li>
            <a href="">Our Mission</a>
          </li>
          <li>
            <a href="">Event Info</a>
          </li>
          <li>
            <a href="">Programs</a>
          </li>
          <li>
            <a href="">The DAO</a>
          </li>
        </ul>
        <a className="wallet-Btn" href="https://consensus-confv1.on.fleek.co/">
          Connect Wallet
        </a>
      </div>
    </div>
  );
}

export default Navbar;
