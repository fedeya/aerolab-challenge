import type { LoaderFunction } from '@remix-run/node';
import type { Product } from '~/models/api.server';

import { json } from '@remix-run/node';

import { getProducts, getCategories } from '~/models/api.server';

import ProductList from '~/components/ProductList';
import Navbar from '~/components/Navbar';
import WalkthroughCard from '~/components/WalkthroughCard';

export type LoaderData = {
  products: Product[];
  pages: number;
  categories: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const { page, category, sortBy } = Object.fromEntries(
    url.searchParams.entries()
  );

  const [products, categories] = await Promise.all([
    getProducts({
      page: page ? +page : 1,
      category,
      sortBy: (sortBy as any) || 'recent',
      limit: 16
    }),
    getCategories()
  ]);

  return json<LoaderData>({
    products: products.data,
    pages: products.pages,
    categories
  });
};

export default function Index() {
  return (
    <div>
      <Navbar />

      <div className="flex bg-[url('/patterns/wave.svg')] bg-repeat items-center justify-center w-full h-full space-x-28 p-4">
        <div className="flex flex-col items-center justify-center h-full max-w-2xl 2xl:items-start 2xl:pl-40">
          <p className="mb-2 text-lg font-semibold uppercase text-neutral-600">
            Explore the
          </p>
          <h1 className="font-black text-center 2xl:text-left uppercase leading-[80%] text-8xl 2xl:text-[200px]">
            <span className="block text-transparent 2xl:inline bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text">
              Tech
            </span>{' '}
            <span className="block text-neutral-900 2xl:inline">Zone</span>
          </h1>

          <p className="mt-2 text-lg font-semibold text-center lg:mt-4 lg:max-w-sm 2xl:max-w-full 2xl:text-left 2xl:w-full text-neutral-600">
            Here you’ll be able to exchange all of your hard-earned Aeropoints
            and exchange them for cool tech.
          </p>

          <a
            href="#products"
            className="flex items-center px-12 py-6 mt-10 space-x-1 text-base font-semibold text-white uppercase lg:text-lg 2xl:px-10 max-w-fit bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl"
          >
            <span>View all products</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0625 13.2L12.375 17.8875H11.0625L6.375 13.2L7.6875 11.8687L10.7812 14.9437V4.5H12.6563V14.9437L15.75 11.85L17.0625 13.2Z"
                fill="#fff"
              />
            </svg>
          </a>
        </div>

        <div className="relative justify-center hidden pr-10 2xl:flex -top-20">
          <div className="absolute w-full h-[33rem] max-w-xl shadow-lg bottom-0 z-10 bg-[linear-gradient(102.47deg,#7296EB_-5.34%,#EAC0E9_106.58%,#EAC0E9_106.58%)] rounded-[104px]" />

          <img
            className="relative z-20 h-[45rem]"
            src="/images/hero-desktop.png"
            alt="hero desktop"
          />
        </div>
      </div>

      <div className="relative bg-repeat flex flex-col lg:flex-row items-center justify-center p-4 mb-16 lg:space-y-0 space-y-4 lg:space-x-4 mt-80 lg:mt-[450px] 2xl:space-x-0 2xl:px-32 3xl:px-64 2xl:mb-28 2xl:mt-10">
        <div className="pt-20 absolute 2xl:bottom-12 h-full lg:h-[35rem] w-full bg-[linear-gradient(102.47deg,#7296EB_-5.34%,#EAC0E9_106.58%,#EAC0E9_106.58%)] 2xl:h-[500px]" />

        <div className="absolute 2xl:hidden flex items-center justify-center w-full -top-[340px] lg:-top-[440px]">
          <img src="/images/hero-responsive.png" alt="Hero" />
        </div>

        <WalkthroughCard
          title="1—browse"
          icon="/icons/browse.svg"
          className="relative 2xl:-rotate-3 2xl:-right-20"
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
          className="relative 2xl:rotate-3 2xl:right-16"
          description="All done, you can relax! We’ll take care of delivery of your tech item!"
          image="/images/walkthroug-3-desktop.png"
        />
      </div>

      <ProductList />
    </div>
  );
}
