import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route, Switch, Redirect } from 'react-router-dom';

const FilterButton = (props) => {
  let classes =
    'btn w-32 transition-colors duration-300  m-2   rounded-full text-xs font-semibold text-white uppercase py-2 px-6 text-center';

  if (props.type === props.filter) {
    classes =
      'selected w-32    m-2  rounded-full text-xs font-semibold  uppercase py-2 px-6 text-center';
  }

  if (props.type === 'All' && !props.filter) {
    classes =
      'selected w-32   m-2   rounded-full text-xs font-semibold  uppercase py-2 px-6 text-center';
  }

  return (
    <button
      // onClick={() => props.history.push(`/${props.type}`)}
      onClick={() => {
        if (props.type === 'All') {
          props.history.push(`/`);
        } else {
          props.history.push(`/${props.type}`);
        }
      }}
      className={classes}
    >
      {props.type}
    </button>
  );
};

const mapState = (state) => ({ state });

export default connect(mapState)(FilterButton);
