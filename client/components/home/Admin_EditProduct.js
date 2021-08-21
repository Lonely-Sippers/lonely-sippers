import React from "react";
import { connect } from "react-redux";
import { getSingleProduct } from "../../store/products";

import { editProduct } from "../../store/admin";

const _EditProduct = (props) => {
  console.log("PROPS.PRODUCT", props.product);
  console.log("PROPS", props);
  const id = props.history.match.params.id * 1;
  console.log("ID!!", id);
  const product =
    props.products.find((prod) => {
      return prod.id === id;
    }) || {};

  console.log("singleProduct", product);

  const handleUpdate = (ev) => {
    ev.preventDefault();
    editProduct(id);
  };
  console.log("HANDLE UPDATE", editProduct);

  return (
    <div className="pt-5 container mx-auto">
      <form
        onSubmit={handleUpdate}
        className="h-64 grid grid-rows-3 grid-flow-col gap-4"
      >
        {/* <div className="flex flex-column px-8 pt-6 pb-8 mb-4"> */}
        <div className="pt-20 w-full max-w-lg space-y-5">
          <div className="w-full md:w-25 px-3 mb-6 md:mb-0 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Category Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-category-name"
              type="text"
              defaultValue={product.category}
              placeholder={product.category}
            />
            <p className="text-red-500 text-xs italic">Required</p>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Year
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-year"
                type="number"
                step="1"
                defaultValue={product.year}
                placeholder={product.year}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Alc. by Percent
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-percent"
                  type="number"
                  step="1"
                  defaultValue={product.alcohol_percentage}
                  placeholder={product.alcohol_percentage}
                />
                <p className="text-gray-600 text-xs italic">Required</p>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-25 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Region
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-region"
                    type="text"
                    defaultValue={product.region}
                    placeholder={product.region}
                  />
                  <p className="text-gray-600 text-xs italic">Required</p>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-price"
                    type="number"
                    step="0.01"
                    defaultValue={product.price}
                    placeholder={product.price}
                  />
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Type
                  </label>
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    defaultValue={product.alcohol_type}
                  >
                    <option>Brandy</option>
                    <option>Tequila</option>
                    <option>Gin</option>
                    <option>Whiskey</option>
                    <option>Rum</option>
                    <option>Vodka</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      {/* <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> */}
                    </svg>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Description
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-description"
                      type="text"
                      defaultValue={product.description}
                      placeholder={product.description}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow justify-self-end"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ products }, history) => {
  return {
    products,
    history,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getSingleProduct: (id) => dispatch(getSingleProduct(id)),
    handleUpdate: (id, product) => dispatch(editProduct(id, product, history)),
  };
};

const EditProduct = connect(mapStateToProps, mapDispatchToProps)(_EditProduct);

export default EditProduct;
