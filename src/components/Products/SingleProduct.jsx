import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features/api/apiSlice';

import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { related } = useSelector(({ products }) => products);

  const { data, isFetching, isSuccess, isLoading } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isFetching, isLoading, isSuccess]);

  useEffect(() => {
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data]);

  return !data ? (
    <section className='preloader'>Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products
        products={related}
        amount={5}
        title={'Related products'}
      />
    </>
  );
};

export default SingleProduct;
