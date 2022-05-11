import type { LoaderData } from '~/routes';

import { useLoaderData, useSearchParams, useTransition } from '@remix-run/react';

import ProductCard from './ProductCard';
import Filters from './Filters';
import ProductCardSkeleton from './ProductCardSkeleton';
import Paginator from './Paginator';

const ProductList: React.FC = () => {
  const { products, total } = useLoaderData<LoaderData>();
  const [params] = useSearchParams();
  const transition = useTransition();

  const page = +(params.get('page') || '1') || 1;

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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products?.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}

      <div className="relative mt-16 w-full flex space-y-8 flex-col xl:flex-row xl:space-y-0 items-center justify-center">
        <Paginator className="flex xl:absolute right-0" />

        <p className="w-full text-center text-lg text-neutral-600">
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
            {products.length * page} of {total}
          </span>{' '}
          products
        </p>
      </div>

    </div>
  );
};

export default ProductList;
