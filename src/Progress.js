import React from 'react';

function Progress(props) {
  
  // Add:
  // stacked???

  const width = props.value > props.max ? 100 : (props.value / props.max) * 100;
  const color = props.color ? ' progress-bar-' + props.color : '';
  const striped = props.striped ? ' progress-bar-striped' : '';
  const animated = props.animated ? ' active' : '';

  return (
    <div className="progress">
      <div
        className={`progress-bar${color}${striped}${animated}`}
        role="progressbar"
        aria-valuenow={props.value}
        aria-valuemin="0"
        aria-valuemax={props.max}
        style={{ width: width + '%', minWidth: '1em' }}
      >
        <span className={props.noValue ? 'sr-only' : ''} >
          {props.value} {props.text}
        </span>
      </div>
    </div>
  );
}

export default Progress;