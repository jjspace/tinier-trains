import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NewCar from './newCar';
import Car from './Car';
import Computations from './carComputation';
import firebase from './firebaseConfig';
// import Catalog from './Catalog';

// var tabData = [
//   { name: 'Tab 1', isActive: true },
//   { name: 'Tab 2', isActive: false },
//   { name: 'Tab 3', isActive: false },
// ];
// var Tabs = React.createClass({
//   render: function () {
//     return (
//       <ul className="nav nav-tabs">
//         {tabData.map(function (tab) {
//           return (
//             <Tab data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this, tab)} />
//           );
//         }.bind(this))}
//       </ul>
//     );
//   }
// });
// var Tab = React.createClass({
//   render: function () {
//     return (
//       <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
//         <a href="#">{this.props.data.name}</a>
//       </li>
//     );
//   }
// });
// var Content = React.createClass({
//   render: function () {
//     return (
//       <div>
//         {this.props.activeTab.name === 'Tab 1' ?
//           <section className="panel panel-success">
//             <h2 className="panel-heading">Content 1</h2>
//             <p className="panel-body">Bacon ham hock kevin boudin rump leberkas. Spare rib</p>
//           </section>
//           : null}
//         {this.props.activeTab.name === 'Tab 2' ?
//           <section className="panel panel-warning">
//             <h2 className="panel-heading">Content 2</h2>
//             <p className="panel-body">Atlantic herring jellynose fish Siamese fighting</p>
//           </section>
//           : null}
//         {this.props.activeTab.name === 'Tab 3' ?
//           <section className="panel panel-danger">
//             <h2 className="panel-heading">Content 3</h2>
//             <p className="panel-body">Turnip greens yarrow ricebean rutabaga endive cauliflower</p>
//           </section>
//           : null}
//       </div>
//     );
//   }
// });
// var App2 = React.createClass({
//   getInitialState: function () {
//     return {
//       activeTab: tabData[0]
//     }
//   },
//   handleClick: function (tab) {
//     this.setState({ activeTab: tab });
//   },
//   render: function () {
//     return (
//       <div>
//         <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
//         <Content activeTab={this.state.activeTab} />
//       </div>
//     );
//   }
// });


class App extends Component {

  static carKey(car) {
    return `${car.id}-${car.level}`;
  }

  constructor() {
    super();
    this.state = {
      cars: [],
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  // getInitialState() {
  //   return {
  //     activeTab: tabData[0],
  //   };
  // }

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
  
  // handleClick(tab) {
  //   this.setState({ activeTab: tab });
  // }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Tinier Trains <small>for <a href="tinyrails.wikia.com/" rel="noopener noreferrer" target="_blank">Tiny Rails</a></small></h1>
        </div>
        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#">Home</a></li>
          <li role="presentation"><a href="#">Profile</a></li>
          <li role="presentation"><a href="#">Messages</a></li>
        </ul>
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
        {/*<Catalog cars={this.state.cars} />*/}
      </div>
    );
  }
}

export default App;