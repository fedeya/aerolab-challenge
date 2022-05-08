import type { LoaderFunction } from '@remix-run/node';
import type { LoaderConfig } from 'remix-image/server';
import { imageLoader, DiskCache } from 'remix-image/server';
import { sharpTransformer } from '~/lib/sharp';

const config: LoaderConfig = {
  selfUrl: 'http://localhost:3000',
  cache: new DiskCache(),
  transformer: sharpTransformer
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
