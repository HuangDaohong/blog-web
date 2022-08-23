import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

const TagPage: React.FC = () => {
  const [params] = useSearchParams();

  const id = params.get('id');
  return <h1>TagPage,id是{id}</h1>;
};
export default TagPage;
