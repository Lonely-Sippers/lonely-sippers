import React from 'react';
import { connect } from 'react-redux';
import StarRating from './icons/StarRating';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product, rating }) => {
  return (
    <div className="container mx-auto wood4 pt-20  lg:grid lg:grid-cols-5">
      <div className="col-span-3">
        <img
          src={product.image_URL}
          alt=""
          className="mx-auto rounded-lg"
          width="50%"
        />

        <div className="px-8">
          <div className="mt-8  md:flex md:justify-around">
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="mx-12">
          <h3 className="font-semibold py-4">User Reviews</h3>
          <hr className="wood1 py-4"></hr>
          <p className="pb-4">
            Assumenda quidem sint et facilis perferendis vel exercitationem sed.
            Fugiat et recusandae labore autem voluptatem commodi in. Natus
            maxime cupiditate necessitatibus voluptatem et placeat debitis aut.
            Maxime ex provident ut vitae nam ex. Dolores doloremque similique
            vel. Ad nihil ex maiores et autem. Ut cumque voluptatem sunt. Et est
            est similique. Omnis non natus voluptatum quia distinctio aliquam
            voluptatem dolorum. Dolores quos amet officiis qui fugit dolorem
            dicta quidem quibusdam.{' '}
          </p>
          <hr className="wood1 py-4"></hr>
          <p className="pb-4">
            Assumenda quidem sint et facilis perferendis vel exercitationem sed.
            Fugiat et recusandae labore autem voluptatem commodi in. Natus
            maxime cupiditate necessitatibus voluptatem et placeat debitis aut.
            Maxime ex provident ut vitae nam ex. Dolores doloremque similique
            vel. Ad nihil ex maiores et autem. Ut cumque voluptatem sunt. Et est
            est similique. Omnis non natus voluptatum quia distinctio aliquam
            voluptatem dolorum. Dolores quos amet officiis qui fugit dolorem
            dicta quidem quibusdam.{' '}
          </p>
          <hr className="wood1 py-4"></hr>
          <p className="pb-4">
            Assumenda quidem sint et facilis perferendis vel exercitationem sed.
            Fugiat et recusandae labore autem voluptatem commodi in. Natus
            maxime cupiditate necessitatibus voluptatem et placeat debitis aut.
            Maxime ex provident ut vitae nam ex. Dolores doloremque similique
            vel. Ad nihil ex maiores et autem. Ut cumque voluptatem sunt. Et est
            est similique. Omnis non natus voluptatum quia distinctio aliquam
            voluptatem dolorum. Dolores quos amet officiis qui fugit dolorem
            dicta quidem quibusdam.{' '}
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <div>
          <h3 className="font-semibold py-8">{product.category}</h3>
          <h4>{product.alcohol_type}</h4>

          {/* <p>{product.description}</p> */}

          <h4 className="">Country of Origin: {product.region}</h4>

          <div>
            <h4>Alcohol Percentage: {product.alcohol_percentage}</h4>
          </div>
          <p className="py-8">{product.description}</p>
          <h4 className="">Price: ${product.price}</h4>
          <div className="md:flex md:justify-between py-8  wider">
            <button className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
              Add to Cart
            </button>

            <Link to={`/`}>
              <button className="btn transition-colors duration-300  mt-4 lg:mt-0  lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ products }, history) => {
  const product =
    products.find((prod) => prod.id === history.match.params.id * 1) || {};

  let rating = product.rating || 0;

  return {
    product: product,
    rating: rating,
  };
};

export default connect(mapState)(SingleProduct);
