import type { LoaderData } from '~/routes';

import { useLoaderData, useTransition } from '@remix-run/react';

import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductList: React.FC = () => {
  const { products } = useLoaderData<LoaderData>();
  const transition = useTransition();

  return (
    <div className="px-10 py-4 mt-4">
      <h1 className="uppercase text-5xl font-black text-neutral-900 mb-10">
        <span className="text-brand-primary">Tech</span> Products
      </h1>

      <Filters />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {transition.state === 'submitting'
          ? Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="bg-neutral-300 w-full animate-pulse h-80 rounded-md" />

                <div className="bg-neutral-300 mt-4 w-full animate-pulse h-12 rounded-md" />
              </div>
            ))
          : products?.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default ProductList;
