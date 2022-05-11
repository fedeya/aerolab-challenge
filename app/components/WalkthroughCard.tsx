import type { FC } from 'react';
import clsx from 'clsx';
import Image, { MimeType } from 'remix-image';
import { m } from 'framer-motion';

type WalkthroughCardProps = {
  title: string;
  description: string;
  image: string;
  icon: string;
  className?: string;
};

const WalkthroughCard: FC<WalkthroughCardProps> = ({
  image,
  title,
  description,
  className,
  icon
}) => {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.5 }}
      className={clsx(
        'border border-neutral-300 max-w-sm 2xl:max-w-2xl 2xl:bg-opacity-100 bg-opacity-80 bg-white rounded-[32px] p-4 lg:p-2',
        className
      )}
    >
      <div className="bg-[linear-gradient(102.47deg,#7296EB_-5.34%,#EAC0E9_106.58%,#EAC0E9_106.58%)] rounded-t-[24px] h-60 lg:h-full">
        <Image
          src={image}
          responsive={[
            {
              size: {
                width: 500,
                height: 500
              },
              maxWidth: 1048
            },
            {
              size: {
                width: 400,
                height: 300
              },
              maxWidth: 375
            }
          ]}
          options={{
            contentType: MimeType.WEBP
          }}
          alt={title}
          className="object-cover w-full h-full "
        />
      </div>

      <div className="p-4 border bg-white border-neutral-300 rounded-b-[24px]">
        <div className="flex items-center mb-2 space-x-4">
          <div className="flex items-center justify-center p-2 rounded-lg bg-brand-light">
            <img src={icon} alt="Icono" className="w-8 h-8" />
          </div>

          <h2 className="font-black uppercase text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text lg:text-2xl 2xl:text-[32px]">
            {title}
          </h2>
        </div>

        <p className="text-neutral-600 2xl:pr-12 text-base 2xl:text-[18px] font-semibold">
          {description}
        </p>
      </div>
    </m.div>
  );
};

export default WalkthroughCard;
