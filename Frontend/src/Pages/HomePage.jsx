import React, { useEffect, useState } from 'react';
import Login from "../Components/adminComponents/LoginForm";
import Products from "../Components/productsComponents/Products";
import Header from "../Components/shared/Header";
import Footer from '../Components/shared/Footer';
import { fetchItems } from '../Services/Products/products';
import Pagination from '../Components/shared/Pagination';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [page, setPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });


  useEffect(() => {
    const getData = async () => {
      try {
        const items = await fetchItems('products', {
          search: search,
          category: categoryFilter,
          min: priceFilter.min,
          max: priceFilter.max,
          page,         // NEW: current page
          limit: 10     // NEW: items per page
        });

        setProducts(items.data); // items.data = products array
        setPaginationMeta({
          currentPage: items.currentPage,
          totalPages: items.totalPages,
          totalItems: items.totalItems
        });
      } catch (error) {
        console.error(`Failed to fetch products`, error);
      }
    };

    getData();

  }, [page, search, categoryFilter, priceFilter]);

  useEffect(() => {
    const getData = async () => {
      try {
        const items = await fetchItems('category', '');

        setCategories(items.data);

      } catch (error) {
        console.error(`Failed to fetch categories`, error);
      }
    };
    getData();

  }, []);


  return (
    <div className=''>
      <Header setCategoryFilter={setCategoryFilter} categories={categories} search={search} setSearch={setSearch}></Header>
      <Products setPriceFilter={setPriceFilter} products={products}></Products>
      <Pagination page={page} setPage={setPage} paginationMeta={paginationMeta} ></Pagination>

      <Footer></Footer>
    </div>
  );
}

export default HomePage;