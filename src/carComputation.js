import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from './firebaseConfig';
import App from './App';
import Progress from './Progress';

class Computations extends Component {

  constructor() {
    super();
    this.state = {
      cars: [],
      picked: [],
      train: {
        cars: [],
        weight: 0,
        passengers: 0,
        cargo: 0,
        food: 0,
        comfort: 0,
        entertainment: 0,
        facilities: 0,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const carsRef = firebase.database().ref('cars');

    carsRef.on('value', (snapshot) => {
      this.setState({
        cars: snapshot.val(),
      }, this.updateTrain);
    });
  }

  calcTrainAttr(cars, attr) {
    return cars.reduce((acc, car) => acc + +car[attr], 0);
  }

  updateTrain() {
    const trainCars = this.state.picked.map(c => this.state.cars[c]);
    console.log('cars to calc:', trainCars);

    this.setState({
      train: {
        cars: trainCars,
        weight: this.calcTrainAttr(trainCars, 'weight'),
        passengers: this.calcTrainAttr(trainCars, 'passengers'),
        cargo: this.calcTrainAttr(trainCars, 'cargo'),
        food: this.calcTrainAttr(trainCars, 'food'),
        comfort: this.calcTrainAttr(trainCars, 'comfort'),
        entertainment: this.calcTrainAttr(trainCars, 'entertainment'),
        facilities: this.calcTrainAttr(trainCars, 'facilities'),
        happiness: this.calcTrainAttr(trainCars, 'food') +
        this.calcTrainAttr(trainCars, 'comfort') +
        this.calcTrainAttr(trainCars, 'entertainment') +
        this.calcTrainAttr(trainCars, 'facilities'),
        maxHappiness: this.calcTrainAttr(trainCars, 'passengers') * 4,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      picked: [...e.target.cars.options].filter(o => o.selected).map(o => o.value),
    }, this.updateTrain);
  }

  render() {
    return (
      <div className="row">
        <form className="col-sm-3" onSubmit={this.handleSubmit}>
          <select name="cars" multiple className="form-control">
            {this.props.cars.map(car => (
              <option key={App.carKey(car)} value={App.carKey(car)}>
                {App.carKey(car)}: {car.name}
              </option>
            ))}
          </select>
          <button className="btn btn-block btn-primary">Build Train</button>
        </form>
        <div className="col-sm-9">
          <div className="row">
            <ul className="col-sm-4 list-unstyled">
              {this.state.train.cars.map(car => (
                <li key={App.carKey(car)}>
                  {car.name}-{car.level}
                  <img src={car.picture + '/scale-to-height-down/50'} alt={car.name} className="traincar" />
                </li>
              ))}
            </ul>
            <div className="col-sm-8">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Weight: {this.state.train.weight}</td>
                    <td>Passengers: {this.state.train.passengers}</td>
                    <td colSpan="2">Cargo: {this.state.train.cargo}</td>
                  </tr>
                  <tr>
                    <td>Food: {this.state.train.food}</td>
                    <td>Comfort: {this.state.train.comfort}</td>
                    <td>Entertainment: {this.state.train.entertainment}</td>
                    <td>Facilities: {this.state.train.facilities}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div>Food:</div>
              <Progress
                value={this.state.train.food}
                max={this.state.train.passengers}
                text={` / ${this.state.train.passengers}`}
              />
              <div>Comfort:</div>
              <Progress
                value={this.state.train.comfort}
                max={this.state.train.passengers}
                text={` / ${this.state.train.passengers}`}
              />
              <div>Entertainment:</div>
              <Progress
                value={this.state.train.entertainment}
                max={this.state.train.passengers}
                text={` / ${this.state.train.passengers}`}
              />
              <div>Facilities:</div>
              <Progress
                value={this.state.train.facilities}
                max={this.state.train.passengers}
                text={` / ${this.state.train.passengers}`}
              />
              <div>Happiness:</div>
              <Progress
                value={this.state.train.happiness}
                max={this.state.train.maxHappiness}
                text={` / ${this.state.train.maxHappiness}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Computations.propTypes = {
  cars: PropTypes.array.isRequired,
};

export default Computations;