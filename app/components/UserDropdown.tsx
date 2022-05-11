import type { FC } from 'react';

import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import Button from './Button';
import { useUser } from '~/utils';
import { AnimatePresence, m } from 'framer-motion';

type UserDropdownProps = {
  isOpen: boolean;
};

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: '2-digit',
    month: 'numeric'
  });

  return formatter.format(new Date(date));
};

const UserDropdown: FC<UserDropdownProps> = ({ isOpen }) => {
  const user = useUser();
  const [points, setPoints] = useState(5000);
  const fetcher = useFetcher();

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute z-50 bg-white border shadow-md w-[312px] right-0 border-neutral-300 top-14 rounded-xl"
        >
          <div className="px-6 py-4 border-b border-neutral-300">
            <p className="text-lg font-semibold leading-tight text-neutral-900">
              Add Balance
            </p>
          </div>

          <div className="p-6">
            <div className="flex bg-repeat bg-[url('/patterns/aerocard.svg')] flex-col justify-between w-full p-4 bg-center mb-6 text-lg font-semibold h-36 text-neutral-100 bg-neutral-900 rounded-xl">
              <div className="flex items-center justify-between">
                <p>Aerocard</p>

                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5C18.6274 0.5 24 5.87258 24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 0 19.1274 0 12.5Z"
                    fill="#F5F9FF"
                  />
                  <g clipPath="url(#clip0_8346_1429)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.9506 5.9017C14.8652 5.75665 14.6761 5.70691 14.5283 5.7907L9.46809 8.65799C9.35293 8.7233 9.29313 8.85368 9.31984 8.9816L11.0228 17.1496C11.0311 17.1889 11.014 17.247 10.9883 17.2755L10.7814 17.5045C10.3512 17.9807 9.9868 18.2386 9.29416 18.2386C8.51751 18.2386 8.15287 17.8369 7.5755 17.1267C6.88593 16.2786 6.02792 15.2233 3.94176 15.2233H3.89018C3.60565 15.2233 3.375 15.4496 3.375 15.7289C3.375 16.0081 3.60565 16.2345 3.89018 16.2345H3.94176C5.5318 16.2345 6.13326 16.9742 6.77009 17.7574C7.33891 18.4571 7.98362 19.25 9.29416 19.25C10.4255 19.25 11.0481 18.7335 11.5523 18.1755L13.4121 16.1171C13.4121 16.117 17.8356 11.2211 17.8356 11.2211C17.9239 11.1234 17.9386 10.9812 17.8721 10.8681L14.9506 5.9017Z"
                      fill="#252F3D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8346_1429">
                      <rect
                        width="14.625"
                        height="13.5"
                        fill="white"
                        transform="translate(3.375 5.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="flex justify-between text-sm">
                <p>{user.name}</p>
                <p>{formatDate(user.createDate)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={() => setPoints(1000)}
                className="w-full px-4 py-1"
                outline={points !== 1000}
              >
                1000
              </Button>
              <Button
                onClick={() => setPoints(5000)}
                className="w-full px-4 py-1"
                outline={points !== 5000}
              >
                5000
              </Button>
              <Button
                className="w-full px-4 py-1"
                outline={points !== 7500}
                onClick={() => setPoints(7500)}
              >
                7500
              </Button>
            </div>

            <fetcher.Form method="post">
              <input type="text" hidden readOnly value={points} name="amount" />
              <Button
                disabled={fetcher.state === 'submitting'}
                className="w-full px-4 py-3 mt-4"
              >
                {fetcher.state === 'submitting'
                  ? 'Processing...'
                  : 'Add Points'}
              </Button>
            </fetcher.Form>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default UserDropdown;
