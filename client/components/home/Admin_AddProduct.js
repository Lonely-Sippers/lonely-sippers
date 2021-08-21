import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postProduct } from "../../store/admin";

class _AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "",
      year: 0,
      alcohol_percentage: "",
      region: "",
      price: 0,
      alcohol_type: "",
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(ev) {
    ev.preventDefault();
    console.log("THIS.PROPS", this.props);
    // const product = this.state;
    this.props.postProduct((props) => this.props.history.push("/products"));
    this.setState({
      category: "",
      year: "",
      alcohol_percentage: "",
      region: "",
      price: "",
      alcohol_type: "",
      description: "",
    });
  }

  render() {
    const product = this.state;
    console.log("RENDER PRODUCT", product);
    return (
      <div className="pt-5 container mx-auto">
        <form
          onSubmit={this.handleSubmit}
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
                placeholder="Name"
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
                  placeholder="Year"
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
                    placeholder="Percent"
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
                      placeholder="Region"
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
                      placeholder="Price"
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
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={this.onSubmit}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow justify-self-end"
              >
                Add To Products
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    postProduct: (product) => dispatch(postProduct(product, history)),
    // handleSubmit(ev) {
    //     ev.preventDefault();
    //     const category = ev.target.category
    //     const year = ev.target.year
    //     const alcohol_percentage = ev.target.alcohol_percentage
    //     const region = ev.target.region
    //     const price = ev.target.price
    //     const alcohol_type = ev.target.alcohol_type
    //     const description = ev.target.description
    //     dispatch(postProduct({
    //         category,
    //         year,
    //         alcohol_percentage,
    //         region,
    //         price,
    //         alcohol_type,
    //         description
    //     })
    //     )
    // }
  };
};

const AddProduct = connect(null, mapDispatchToProps)(_AddProduct);

export default AddProduct;
