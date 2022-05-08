import type { LoaderData } from '~/routes';

import { useLoaderData, useTransition } from '@remix-run/react';

import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductList: React.FC = () => {
  const { products } = useLoaderData<LoaderData>();
  const transition = useTransition();

  return (
    <div id="products" className="px-10 py-4 mt-4 2xl:px-40 3xl:px-80">
      <h1 className="2xl:mb-10 mb-4 2xl:text-5xl text-[32px] font-black uppercase text-neutral-900">
        <span className="bg-[linear-gradient(102.47deg,#176FEB_-5.34%,#FF80FF_106.58%)] bg-clip-text text-transparent">
          Tech
        </span>{' '}
        Products
      </h1>

      <Filters />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {transition.state === 'submitting'
          ? Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="w-full bg-white border rounded-md animate-pulse h-80 border-neutral-300" />

                <div className="w-full mt-4 bg-white border rounded-md animate-pulse border-neutral-300 h-14" />
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
