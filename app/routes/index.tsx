import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { Product } from '~/models/api.server';

import { json } from '@remix-run/node';

import { getProducts, getCategories } from '~/models/api.server';

import ProductList from '~/components/ProductList';
import { redeem } from '../models/api.server';
import invariant from 'tiny-invariant';
import Hero from '~/components/Hero';
import WalkthroughSection from '~/components/WalkthroughSection';
import { isAxiosError } from '~/utils';

export type LoaderData = {
  products: Product[];
  pages: number;
  total: number;
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
    total: products.total,
    categories
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const { id } = Object.fromEntries(formData.entries());

  invariant(id, 'id is required');

  try {
    const { message } = await redeem(id.toString());

    return json({ message, ok: true });
  } catch (err) {
    if (isAxiosError<{ message: string }>(err))
      return json({ message: err.response?.data.message, ok: false });
  }
};

export default function Index() {
  return (
    <div>
      <Hero />

      <WalkthroughSection />

      <ProductList />
    </div>
  );
}
