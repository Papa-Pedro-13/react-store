import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductsQuery } from '../../features/api/apiSlice';

import styles from '../../styles/Category.module.css';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const defaultValues = {
  title: '',
  price_min: 0,
  price_max: 0,
};
const defaultParams = {
  ...defaultValues,
  limit: 5,
  offset: 0,
  categoryId: '',
};

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const [isEnd, setIsEnd] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setIsEnd(true);

    setItems((prev) => [...prev, ...data]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);
    setCategory(category);
  }, [list, id]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{category?.name}</h2>
      <form
        className={styles.filters}
        onSubmit={handleSubmit}
      >
        <div className={styles.filter}>
          <input
            type='text'
            name='title'
            placeholder='Product name'
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type='number'
            name='price_min'
            placeholder='Min price'
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type='number'
            name='price_max'
            placeholder='Max price'
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type='submit'></button>
      </form>
      {isLoading ? (
        <div className='preloader'>Loading</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button type='reset'>Reset</button>
        </div>
      ) : (
        <Products
          products={items}
          styles={{ padding: 0 }}
          amount={items.length}
        />
      )}
      <div className={styles.more}>
        {!isEnd && (
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        )}
      </div>
    </section>
  );
};

export default Category;
