import React, { Component } from 'react';
import firebase from './firebaseConfig';

class NewCar extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      level: '',
      cargo: '',
      comfort: '',
      entertainment: '',
      facilities: '',
      food: '',
      name: '',
      passengers: '',
      picture: '',
      weight: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCar = this.addCar.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  carKey(car) {
    return `${car.id}-${car.level}`;
  }

  addCar(e) {
    e.preventDefault();
    const carsRef = firebase.database().ref('cars');
    const car = this.state;
    carsRef.child(this.carKey(car)).set(car);
    this.setState({
      id: '',
      level: '',
      cargo: '',
      comfort: '',
      entertainment: '',
      facilities: '',
      food: '',
      name: '',
      passengers: '',
      picture: '',
      weight: '',
    });
  }

  render() {
    return (
      <div className="row">
        <h3>New Car:</h3>
        <form className="col-xs-12 form-horizontal" onSubmit={this.addCar}>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="id" className="col-xs-2 control-label">Id:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="id" placeholder="car id #" onChange={this.handleChange} value={this.state.id} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="name" className="col-xs-2 control-label">Name:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="name" placeholder="car id #" onChange={this.handleChange} value={this.state.name} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="level" className="col-xs-2 control-label">Level:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="level" placeholder="car id #" onChange={this.handleChange} value={this.state.level} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="passengers" className="col-xs-2 control-label">Passengers:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="passengers" placeholder="car id #" onChange={this.handleChange} value={this.state.passengers} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="cargo" className="col-xs-2 control-label">Cargo:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="cargo" placeholder="car id #" onChange={this.handleChange} value={this.state.cargo} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="food" className="col-xs-2 control-label">Food:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="food" placeholder="car id #" onChange={this.handleChange} value={this.state.food} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="comfort" className="col-xs-2 control-label">Comfort:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="comfort" placeholder="car id #" onChange={this.handleChange} value={this.state.comfort} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="entertainment" className="col-xs-2 control-label">Entertainment:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="entertainment" placeholder="car id #" onChange={this.handleChange} value={this.state.entertainment} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="facilities" className="col-xs-2 control-label">Facilities:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="facilities" placeholder="car id #" onChange={this.handleChange} value={this.state.facilities} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="weight" className="col-xs-2 control-label">Weight:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="weight" placeholder="car id #" onChange={this.handleChange} value={this.state.weight} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="picture" className="col-xs-2 control-label">Picture:</label>
              <div className="col-xs-10">
                <input type="text" className="form-control" name="picture" placeholder="car id #" onChange={this.handleChange} value={this.state.picture} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-block btn-primary">Add Car</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewCar;