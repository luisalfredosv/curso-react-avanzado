import React, { useState, useEffect, Fragment } from 'react';
import { Category } from '../Category';
import { Item, List } from './styles';

const useCategoryData = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://petgram-server-lasv-h90fyikrw-luisalfredosv.vercel.app/categories'
    )
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
};

export const ListOfCategories = () => {
  const { categories, loading } = useCategoryData();

  const [showFixed, setshowFixed] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== setshowFixed && setshowFixed(newShowFixed);
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [showFixed]);

  const renderList = (fixed) => (
    <List className={fixed}>
      {loading ? (
        <Item key="loading">
          <Category></Category>
        </Item>
      ) : (
        categories.map((category) => (
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        ))
      )}
    </List>
  );

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  );
};
