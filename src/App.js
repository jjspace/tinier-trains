import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NewCar from './newCar';
import Car from './Car';
import Computations from './carComputation';
import firebase from './firebaseConfig';

class App extends Component {

  static carKey(car) {
    return `${car.id}-${car.level}`;
  }

  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
    const carsRef = firebase.database().ref('cars');
    carsRef.on('value', (snapshot) => {
      const cars = snapshot.val();
      // console.log('cars:', cars);
      const newState = [];

      Object.keys(cars).forEach((k) => {
        newState.push(cars[k]);
      });

      // console.log('newState:', newState);
      const sortKey = 'id';
      newState.sort((a, b) => a[sortKey] - b[sortKey]);
      // console.log('sorted newState:', newState);

      this.setState({
        cars: newState,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Tinier Trains <small>for <a href="tinyrails.wikia.com/" rel="noopener noreferrer" target="_blank">Tiny Rails</a></small></h1>
        </div>
        <Computations cars={this.state.cars} />
        <NewCar />
        <h2>Build your train:</h2>
        <div className="row">
          <div className="col-sm-4">
            <h3>Avaliable Cars</h3>
            <ul className="list-group">
              {this.state.cars.map(car => (
                <li className="list-group-item">
                  <div className="media">
                    <div className="media-left">
                      <img className="media-object" src={car.picture + '/scale-to-height-down/50'} alt={car.name} />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{car.name}</h4>
                      <div>lvl {car.level}</div>
                    </div>
                    <div className="media-right">
                      <button className="btn">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4">
            <h3>Cars on your train</h3>
            <ul className="list-group">
              {this.state.cars.map(car => (
                <li className="list-group-item">
                  <div className="media">
                    <div className="media-left">
                      <img className="media-object" src={car.picture + '/scale-to-height-down/50'} alt={car.name} />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{car.name}</h4>
                      <div>lvl {car.level}</div>
                    </div>
                    <div className="media-right">
                      <button className="btn">-</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4">
            <h3>Train Stats</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="media">
                  <div className="media-left">
                    <img className="media-object" src="https://vignette1.wikia.nocookie.net/tinyrails/images/b/b0/Oldwestpass1.png/revision/latest/scale-to-height-down/50" alt="car" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Old West Passenger</h4>
                    <div>lvl 2</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {this.state.cars.map(car => (
          <Car key={App.carKey(car)} car={car} />
        ))}
      </div>
    );
  }
}

export default App;
