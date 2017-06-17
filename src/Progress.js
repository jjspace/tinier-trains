import React from 'react';

function Progress(props) {
  
  const value = (props.value / props.max) * 100;
  
  // Add:
  // colors
  // label
  // striped or not
  // animated or not
  // stacked???
  
  return (
    <div className="progress">
      <div 
      className="progress-bar" 
      role="progressbar" 
      aria-valuenow={value} 
      aria-valuemin="0" 
      aria-valuemax={props.max} 
      style={{ width: value + '%', minWidth: '1em' }}>
        <span className={props.noValue ? 'sr-only' : ''} >
          {value}
        </span>
      </div>
    </div>
  );
}

export default Progress;