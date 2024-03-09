import { useDispatch, useSelector } from 'react-redux';
import Poster from '../Poster/Poster';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';

import { useEffect } from 'react';

import { filterByPrice } from '../../features/products/productsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!list.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);
  return (
    <>
      <Poster />
      <Products
        products={list}
        amount={5}
        title={'Trending'}
      />
      <Categories
        amount={5}
        categories={categories.list}
        title={'Wodth seeing'}
      />
      <Banner />
      <Products
        products={filtered}
        amount={5}
        title={'Less than 100$'}
      />
    </>
  );
}
