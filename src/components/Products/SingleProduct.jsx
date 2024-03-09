import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features/api/apiSlice';

import { ROUTES } from '../../utils/routes';
import Product from './Product';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, isSuccess, isLoading } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isFetching, isLoading, isSuccess]);
  return !data ? (
    <section className='preloader'>Loading...</section>
  ) : (
    <>
      <Product {...data} />
    </>
  );
};

export default SingleProduct;
