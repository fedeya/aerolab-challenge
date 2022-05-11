import type { LoaderData } from '~/routes';

import { useLoaderData, useTransition } from '@remix-run/react';

import ProductCard from './ProductCard';
import Filters from './Filters';
import ProductCardSkeleton from './ProductCardSkeleton';

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

      {transition.state === 'submitting' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: products.length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {transition.state === 'idle' && (
        <div
          // initial={{ translateX: -200 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products?.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
