import type { LoaderFunction, HeadersFunction } from '@remix-run/node';
import type { Product } from '~/models/api.server';

import { json } from '@remix-run/node';

import { getProducts, getCategories } from '~/models/api.server';

import ProductList from '~/components/ProductList';

export type LoaderData = {
  products: Product[];
  categories: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const { page, category, sortBy } = Object.fromEntries(
    url.searchParams.entries()
  );

  return json<LoaderData>(
    {
      products: await getProducts({
        page: page ? +page : 1,
        category,
        sortBy: (sortBy as any) || 'recent',
        limit: 16
      }),
      categories: await getCategories()
    },
    {
      headers: {
        'Cache-Control': 'max-age=300, s-maxage=3600'
      }
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control')!
  };
};

export default function Index() {
  return (
    <div>
      <ProductList />
    </div>
  );
}
