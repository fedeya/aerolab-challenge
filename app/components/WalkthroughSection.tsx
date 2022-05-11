import Image, { MimeType } from 'remix-image';
import WalkthroughCard from './WalkthroughCard';

export default function WalkthroughSection() {
  return (
    <section className="relative bg-repeat flex flex-col lg:flex-row items-center justify-center p-4 mb-16 lg:space-y-0 space-y-4 lg:space-x-4 mt-80 lg:mt-[450px] 2xl:space-x-0 2xl:px-32 3xl:px-64 2xl:mb-28 2xl:mt-10">
      <div className="pt-20 absolute 2xl:bottom-12 bottom-0 h-[calc(100%+200px)] lg:h-[calc(100%+110px)] w-full bg-[linear-gradient(102.47deg,#7296EB_-5.34%,#EAC0E9_106.58%,#EAC0E9_106.58%)] 2xl:h-[500px]" />

      <div className="absolute 2xl:hidden flex items-center justify-center w-full -top-[340px] lg:-top-[440px]">
        <Image
          responsive={[
            {
              size: {
                width: 540,
                height: 540
              }
            }
          ]}
          options={{ contentType: MimeType.WEBP }}
          src="/images/hero-responsive.png"
          alt="Hero"
        />
      </div>

      <WalkthroughCard
        title="1—browse"
        icon="/icons/browse.svg"
        className="relative 2xl:!-rotate-3 2xl:-right-20"
        description="Browse our tech catalog with more than 20 top tech products"
        image="/images/walkthroug-1-desktop.png"
      />

      <WalkthroughCard
        title="2—Choose"
        icon="/icons/cursor.svg"
        className="relative 2xl:-top-7"
        description="Exchange your hard earned AeroPoints for the item you want"
        image="/images/walkthroug-2-desktop.png"
      />

      <WalkthroughCard
        title="3—Enjoy!"
        icon="/icons/star.svg"
        className="relative 2xl:!rotate-3 2xl:right-16"
        description="All done, you can relax! We’ll take care of delivery of your tech item!"
        image="/images/walkthroug-3-desktop.png"
      />
    </section>
  );
}
