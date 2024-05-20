import './App.css';
import { Carousel } from './carousel-sc';
import { FillerDiv } from './filler-div';
import { MAIN_ID } from './carousel-sc/constants';

function App() {
  const fillerDivs = [];

  for (let i = 1; i < 10; i++) {
    fillerDivs.push(<FillerDiv text={i} />);
  }
  return (
    <div className="App">
      <div id={MAIN_ID}>
        {fillerDivs}
        <Carousel />
        {fillerDivs}
        {fillerDivs}
      </div>
    </div>
  );
}

export default App;
