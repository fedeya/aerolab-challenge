import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { getUser } from './models/api.server';

import styles from './styles/tailwind.css';

export const links: LinksFunction = () => [
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
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap',
    rel: 'stylesheet'
  },
  { rel: 'stylesheet', href: styles }
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Aerolab Challenge',
  viewport: 'width=device-width,initial-scale=1'
});

export const loader: LoaderFunction = async () => {
  return json(
    {
      user: await getUser()
    },
    {
      headers: {
        'Cache-Control': 'max-age=300, s-maxage=3600'
      }
    }
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
