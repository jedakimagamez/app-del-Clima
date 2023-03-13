import './App.css'
import Weather from './components/WeatherApp'
function App() {  

  return (
    <div className="principaldiv">
      <div className='tittle'>
        <h2>Weather App</h2>
      </div>
      <div className="App">
        <Weather />
      </div>
    </div>
  );
}

export default App


