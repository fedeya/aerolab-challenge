import type { Product } from '~/models/api.server';
import { useUser } from '~/utils';
import Aero from './icons/Aero';
import Image, { MimeType } from 'remix-image';
import { useFetcher } from '@remix-run/react';
import { useCallback, useEffect } from 'react';
import Button from './Button';
import { m } from 'framer-motion';
import toast from 'react-hot-toast';
import clsx from 'clsx';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = useUser();
  const fetcher = useFetcher();

  const fire = useCallback(
    (success: boolean) => {
      toast.custom(
        t => (
          <div
            className={clsx(
              'flex items-center  justify-between p-6 space-x-4 text-lg bg-white border-2 rounded-xl',
              success ? 'border-green' : 'border-red',
              t.visible ? 'animate-enter' : 'animate-leave'
            )}
          >
            <div className="flex items-center space-x-2">
              {success ? (
                <img
                  src="/icons/success.svg"
                  className="w-[26px] h-[26px]"
                  alt="Success"
                />
              ) : (
                <img
                  src="/icons/error.svg"
                  className="w-[26px] h-[26px]"
                  alt="Error"
                />
              )}

              <p className="font-semibold text-neutral-600">
                {success ? (
                  <>
                    <span className="mr-2 text-neutral-900">
                      {product.name}
                    </span>
                    redeemed successfully
                  </>
                ) : (
                  <>There was a problem with the transaction</>
                )}
              </p>
            </div>

            <button onClick={() => toast.dismiss(t.id)}>
              <img className="" src="/icons/close.svg" alt="Close" />
            </button>
          </div>
        ),
        {
          duration: 3000
        }
      );
    },
    [product.name]
  );

  useEffect(() => {
    if (fetcher.type === 'done' && fetcher.data) {
      fire(fetcher.data.ok);
    }
  }, [fetcher.data, fetcher.type, fire]);

  const isSubmitting =
    fetcher.state === 'submitting' || fetcher.state === 'loading';

  return (
    <m.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col justify-between h-full space-y-2"
    >
      <div className="bg-white h-full relative rounded-xl border border-[#DAE4F2] py-2 shadow-lg">
        <div className="border-b flex items-center justify-center py-12 h-60 px-8 border-[#DAE4F2]">
          <Image
            src={product.img.hdUrl || product.img.url}
            loading="lazy"
            alt={product.name}
            options={{ contentType: MimeType.WEBP }}
            className="object-contain duration-700 ease-in-out"
            responsive={[
              {
                size: {
                  width: 300,
                  height: 200
                }
              }
            ]}
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
          <input type="text" readOnly hidden name="id" value={product._id} />
          <Button
            disabled={fetcher.state === 'submitting'}
            className="w-full flex items-center justify-center space-x-2 font-semibold text-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)] rounded-xl px-6 py-4"
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <span>Redeem for</span>

                <Aero />

                <span>{product.cost.toLocaleString()}</span>
              </>
            )}
          </Button>
        </fetcher.Form>
      )}
    </m.div>
  );
};

export default ProductCard;
