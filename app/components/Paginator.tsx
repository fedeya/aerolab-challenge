import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import clsx from 'clsx';
import { FC } from 'react';
import { LoaderData } from '~/routes';

type PaginatorProps = {
  className?: string;
}

const Paginator: FC<PaginatorProps> = ({ className }) => {
  const [params] = useSearchParams()

  const data = useLoaderData<LoaderData>()
  const submit = useSubmit()


  const goToPage = (page: number) => {
    submit(
      {
        category: params.get('category') || '',
        sortBy: params.get('sortBy')?.toString() || '',
        page: page.toString()
      },
      {
        replace: true,
        action: '/'
      }
    );
  };

  const page = +(params.get('page') || '1') || 1;


  return (
    <fieldset className={clsx('items-center justify-between px-4 py-3 space-x-4 border border-neutral-300 rounded-2xl', className)}>
      <button
        name="page"
        value={page - 1}
        disabled={page === 1}
        type="button"
        onClick={() => goToPage(page - 1)}
        className="p-2 rotate-180 rounded-lg disabled:cursor-not-allowed disabled:bg-neutral-200 bg-brand-light"
      >
        <img src="/icons/ios-arrow.svg" alt="Go Back Page" />
      </button>

      <p className="text-lg text-neutral-600 font-semibold">
        Page{' '}
        <span className="text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text">
          {page} of {data.pages}
        </span>
      </p>

      <button
        name="page"
        value={page + 1}
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page === data.pages}
        className="p-2 rounded-lg disabled:bg-neutral-200 disabled:cursor-not-allowed bg-brand-light"
      >
        <img src="/icons/ios-arrow.svg" alt="Go Next Page" />
      </button>
    </fieldset>
  )
}

export default Paginator;