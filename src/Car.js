import React from 'react';
import PropTypes from 'prop-types';

function Car(props) {
  return (
    <div className="col-xs-6 col-sm-3">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{props.car.name}<br />
            <small>lvl. {props.car.level}</small>
          </h3>
        </div>
        <div className="panel-body">
          <img src={props.car.picture} alt={props.car.name} className="img-responsive" />
        </div>
      </div>
    </div>
  );
}

Car.propTypes = {
  car: PropTypes.object.isRequired,
};

export default Car;