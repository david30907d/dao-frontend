import "./App.css";
import Minter from "./Minter";
import ListDescription from "./ListDescription";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Ticket from "./components/Ticket";
import Mission from "./components/Mission";
import Place from "./components/Place";
import Programs from "./components/Programs";
import PapersDao from "./components/PapersDao";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Banner></Banner>
      <Ticket></Ticket>
      <Mission></Mission>
      <Place></Place>
      <Programs></Programs>
      <PapersDao></PapersDao>
      {/* <Minter></Minter>
      <ListDescription></ListDescription> */}
    </div>
  );
}

export default App;
