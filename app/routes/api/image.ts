import type { LoaderFunction } from '@remix-run/node';
import type { LoaderConfig, Resolver } from 'remix-image/server';
import { fetchResolver, fsResolver } from 'remix-image/server';
import { imageLoader, DiskCache } from 'remix-image/server';
import { sharpTransformer } from '~/lib/sharp';

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith('/') && (url.length === 1 || url[1] !== '/')) {
    console.log(asset, url, 'is a local path');
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};

const config: LoaderConfig = {
  selfUrl: `http://localhost:${process.env.PORT || 3000}`,
  cache: new DiskCache(),
  transformer: sharpTransformer,
  resolver: fetchImage
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
