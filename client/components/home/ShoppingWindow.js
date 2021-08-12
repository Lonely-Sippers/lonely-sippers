import React, { useState } from 'react';
import DetailWindow from './DetailWindow';
import { connect } from 'react-redux';

import FilterButton from './icons/FilterButton';

import { Link } from 'react-router-dom';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

const liquorTypes = ['Brandy', 'Gin', 'Rum', 'Tequila', 'Vodka', 'Whiskey'];

const ShoppingWindow = (props) => {
  let count = 0;
  const [filter, setFilter] = useState(props.match.params.filter);

  let showProducts = props.products;

  if (filter) {
    showProducts = showProducts.filter(
      (product) => product.alcohol_type === filter
    );
  }

  return (
    <div className="">
      <div className="sticky">
        <div className="m-4 flexy justify-between w-10/12 mx-auto">
          <FilterButton
            type={'All'}
            key={'All'}
            history={props.history}
            setFilter={setFilter}
            filter={filter}
          />
          {liquorTypes.map((type) => (
            <FilterButton
              type={type}
              key={type}
              history={props.history}
              setFilter={setFilter}
              filter={filter}
            />
          ))}
        </div>
        <hr></hr>
      </div>
      <div className="lg:grid lg:grid-cols-6 ">
        {showProducts.map((product) => {
          count++;
          return (
            <DetailWindow key={product.id} itemId={product.id} count={count} />
          );
        })}
      </div>
    </div>
  );
};

const mapState = (state) => {
  console.log('in mapstate', state);
  return state;
};

export default connect(mapState)(ShoppingWindow);
