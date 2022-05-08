import { useEffect, useRef, useState } from 'react';
import type { Product } from '~/models/api.server';
import { useUser } from '~/utils';
import Aero from './icons/Aero';
import Image from 'remix-image';
import clsx from 'clsx';

type ProductCardProps = {
  product: Product;
};

const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return [ref, loaded, onLoad] as const;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = useUser();

  return (
    <div className="flex flex-col justify-between h-full space-y-2">
      <div className="bg-white h-full relative rounded-xl border border-[#DAE4F2] py-2 shadow-lg">
        <div className="border-b flex items-center justify-center py-12 h-60 px-8 border-[#DAE4F2]">
          <Image
            // ref={ref}
            // onLoad={onLoad}
            src={product.img.hdUrl || product.img.url}
            loading="lazy"
            alt={product.name}
            className={clsx(
              'object-contain duration-700 ease-in-out'
              // !loaded
              //   ? 'grayscale blur-2xl scale-110'
              //   : 'grayscale-0 blur-0 scale-100'
            )}
            responsive={[
              {
                size: {
                  width: 300,
                  height: 200
                }
              }
            ]}
            // width="200"
            // height="200"
            // decoding="async"
          />
        </div>

        <div className="px-4 pb-2 mt-2 font-semibold">
          <p className="text-lg text-neutral-900">{product.name}</p>
          <p className="text-sm uppercase text-neutral-600">
            {product.category}
          </p>
        </div>
      </div>

      {user && user.points < product.cost && (
        <button className="px-6 py-4 bg-neutral-200 font-semibold text-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)] text-neutral-600 rounded-xl">
          You need {product.cost.toLocaleString()}
        </button>
      )}

      {user && user.points >= product.cost && (
        <button className="w-full flex items-center justify-center space-x-2 font-semibold text-lg bg-gradient-to-r from-brand-primary shadow-[0px_2px_8px_rgba(0,0,0,0.05)] to-brand-secondary rounded-xl px-6 py-4 text-white">
          <span>Redeem for</span>

          <Aero />

          <span>{product.cost.toLocaleString()}</span>
        </button>
      )}
    </div>
  );
};

export default ProductCard;
