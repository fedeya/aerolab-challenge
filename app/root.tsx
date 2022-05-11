import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction
} from '@remix-run/node';
import type { ShouldReloadFunction } from '@remix-run/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { addPoints, getUser } from './models/api.server';

import styles from './styles/tailwind.css';
import globals from './styles/globals.css';
import Layout from './components/Layout';
import invariant from 'tiny-invariant';
import { isAxiosError } from './utils';
import { LazyMotion, domAnimation } from 'framer-motion';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
    type: 'image/png'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;900&display=swap',
    rel: 'stylesheet',
    as: 'style'
  },
  { rel: 'stylesheet', href: globals },
  { rel: 'stylesheet', href: styles }
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Aerolab Challenge',
  viewport: 'width=device-width,initial-scale=1',
  description: 'Aerolab Challenge made by Fedeya',
  keywords: 'aerolab, challenge, fedeya',
  'og:image': '/og.jpg',
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:type': 'website',
  'og:url': 'https://aerolab-challenge.fly.dev',
  'og:description': 'Aerolab Challenge made by Fedeya',
  'og:title': 'Aerolab Challenge',
  'twitter:card': 'summary_large_image',
  'twitter:creator': '@fede_minaya',
  'twitter:url': 'https://aerolab-challenge.fly.dev',
  'twitter:title': 'Aerolab Challenge',
  'twitter:description': 'Aerolab Challenge made by Fedeya',
  'twitter:image': '/og.jpg'
});

export const loader: LoaderFunction = async () => {
  return json({
    user: await getUser()
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const { amount } = Object.fromEntries(formData.entries());

  invariant(amount, 'amount is required');

  try {
    const { message } = await addPoints(+amount.toString());

    return json({ message, ok: true });
  } catch (err) {
    if (isAxiosError<{ message: string }>(err))
      return json({ message: err.response?.data.message, ok: false });
  }
};

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return !!submission && submission.method !== 'GET';
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <LazyMotion features={domAnimation}>
          <Layout>
            <Outlet />
          </Layout>
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
