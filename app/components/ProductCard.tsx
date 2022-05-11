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
          className="px-6 py-4 bg-neutral-200 font-semibold space-x-2 flex items-center justify-center text-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)] cursor-not-allowed text-neutral-600 rounded-xl"
        >
          <span>You need</span>

          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5V0.5C18.6274 0.5 24 5.87258 24 12.5V12.5C24 19.1274 18.6274 24.5 12 24.5V24.5C5.37258 24.5 0 19.1274 0 12.5V12.5Z"
              fill="#8FA3BF"
            />
            <g clipPath="url(#clip0_8537_1622)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9506 5.9017C14.8652 5.75665 14.6761 5.70691 14.5283 5.7907L9.46809 8.65799C9.35293 8.7233 9.29313 8.85368 9.31984 8.9816L11.0228 17.1496C11.0311 17.1889 11.014 17.247 10.9883 17.2755L10.7814 17.5045C10.3512 17.9807 9.9868 18.2386 9.29416 18.2386C8.51751 18.2386 8.15287 17.8369 7.5755 17.1267C6.88593 16.2786 6.02792 15.2233 3.94176 15.2233H3.89018C3.60565 15.2233 3.375 15.4496 3.375 15.7289C3.375 16.0081 3.60565 16.2345 3.89018 16.2345H3.94176C5.5318 16.2345 6.13326 16.9742 6.77009 17.7574C7.33891 18.4571 7.98362 19.25 9.29416 19.25C10.4255 19.25 11.0481 18.7335 11.5523 18.1755L13.4121 16.1171C13.4121 16.117 17.8356 11.2211 17.8356 11.2211C17.9239 11.1234 17.9386 10.9812 17.8721 10.8681L14.9506 5.9017Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_8537_1622">
                <rect
                  width="14.625"
                  height="13.5"
                  fill="white"
                  transform="translate(3.375 5.75)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>{product.cost.toLocaleString()}</span>
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
