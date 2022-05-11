import Image, { MimeType } from 'remix-image';

export default function Hero() {
  return (
    <div className="flex mt-10 bg-[url('/patterns/wave.svg')] bg-repeat items-center justify-center w-full h-full space-x-28 p-4">
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
          Here you’ll be able to exchange all of your hard-earned Aeropoints and
          exchange them for cool tech.
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

        <Image
          responsive={[
            {
              size: {
                width: 720,
                height: 720
              }
            }
          ]}
          options={{ contentType: MimeType.WEBP }}
          className="relative z-20 h-[45rem]"
          src="/images/hero-desktop.png"
          alt="hero desktop"
        />
      </div>
    </div>
  );
}
