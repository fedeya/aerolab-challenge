import type { Product } from '~/models/api.server';
import { useUser } from '~/utils';
import Aero from './icons/Aero';
import Image, { MimeType } from 'remix-image';
import clsx from 'clsx';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = useUser();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === 'done' && fetcher.data) {
      console.log(fetcher.data);
    }
  }, [fetcher.data, fetcher.type]);

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
            options={{ contentType: MimeType.WEBP }}
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
        <button
          disabled
          className="px-6 py-4 bg-neutral-200 font-semibold text-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)] cursor-not-allowed text-neutral-600 rounded-xl"
        >
          You need {product.cost.toLocaleString()}
        </button>
      )}

      {user && user.points >= product.cost && (
        <fetcher.Form method="post">
          <input type="text" hidden name="id" value={product._id} />
          <button
            name="action"
            disabled={fetcher.state === 'submitting'}
            value="redeem"
            className="w-full flex items-center justify-center space-x-2 font-semibold text-lg bg-gradient-to-r from-brand-primary shadow-[0px_2px_8px_rgba(0,0,0,0.05)] to-brand-secondary rounded-xl px-6 py-4 text-white"
          >
            {fetcher.state === 'submitting' ? (
              'Processing...'
            ) : (
              <>
                <span>Redeem for</span>

                <Aero />

                <span>{product.cost.toLocaleString()}</span>
              </>
            )}
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};

export default ProductCard;
