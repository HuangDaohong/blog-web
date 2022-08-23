import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const [params] = useSearchParams();

  const id = params.get('id');
  return <h1>CategoryPage,id是:{id}</h1>;
};
export default CategoryPage;
