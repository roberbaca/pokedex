import './App.css';
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Card from './components/Card/Card'
/*--------------------------------------------------------------------------------
	# Challenge SIW Cargo v1.0 - Apr 27, 2022
	# ------------------------------------------------------------------------------
	# Designed & coded by Roberto Baca
	# Websites:  xxx -  Email: roberto.nicolas.baca@gmail.com
---------------------------------------------------------------------------------- */


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <Card></Card>
    </div>
  );
}

export default App;
