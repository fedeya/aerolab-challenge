export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col justify-between w-full bg-white animate-pulse h-80">
        <div className="flex items-center justify-center h-full border border-b-0 border-neutral-300 rounded-t-2xl">
          <svg
            width="78"
            height="72"
            viewBox="0 0 78 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M61.7365 0.80909C61.2812 0.0354577 60.2726 -0.22979 59.4844 0.217064L32.4965 15.5093C31.8823 15.8576 31.5634 16.553 31.7058 17.2352L40.7885 60.7976C40.8323 61.0074 40.7416 61.3172 40.6041 61.4693L39.5006 62.6907C37.2065 65.2303 35.263 66.6061 31.5688 66.6061C27.4267 66.6061 25.482 64.4632 22.4027 60.6757C18.725 56.1528 14.1489 50.5241 3.02273 50.5241H2.7476C1.23015 50.5241 0 51.7314 0 53.2207C0 54.7101 1.23015 55.9174 2.7476 55.9174H3.02273C11.5029 55.9174 14.7107 59.8626 18.1072 64.0396C21.1408 67.771 24.5793 72 31.5688 72C37.6027 72 40.9231 69.2454 43.6123 66.2691L53.5314 55.2913C53.5314 55.2907 77.1234 29.179 77.1234 29.179C77.5939 28.6581 77.6725 27.9 77.3176 27.2966L61.7365 0.80909Z"
              fill="#E6EDF7"
            />
          </svg>
        </div>

        <div className="h-[72px] border rounded-b-2xl flex flex-col space-y-2 p-4 border-neutral-300">
          <div className="h-4 w-52 bg-neutral-300 rounded-xl" />

          <div className="w-24 h-2 rounded bg-neutral-300" />
        </div>
      </div>

      <div className="w-full mt-4 bg-neutral-300 rounded-xl animate-pulse h-[59px]" />
    </div>
  );
}
