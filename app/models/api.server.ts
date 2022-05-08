import axios from 'axios';
import LRU from 'lru-cache';

const client = axios.create({
  baseURL: 'https://coding-challenge-api.aerolab.co',
  headers: {
    Authorization: `Bearer ${process.env.AEROLAB_API_TOKEN}`
  }
});

let cache: LRU<string, any>;

declare global {
  var __cache: LRU<string, any> | undefined;
}

if (!global.__cache) {
  global.__cache = new LRU<string, any>({
    max: 1000,
    maxAge: 1000 * 60 * 60
  });
}

cache = global.__cache;

export interface Product {
  _id: string;
  name: string;
  cost: number;
  category: string;
  img: {
    url: string;
    hdUrl: string;
  };
}

export interface User {
  _id: string;
  name: string;
  points: number;
  createDate: string;
  redeemHistory: any[];
}

export const getProducts = async (params?: {
  page?: number;
  category?: string;
  sortBy?: 'recent' | 'highestCost' | 'lowestCost';
  limit?: number;
}) => {
  let products: Product[] = [];

  const productsPromise = client.get<Product[]>('/products').then(res => {
    cache.set('products', res.data);

    console.log('Updated Products Cache');

    return res.data;
  });

  try {
    const productsInCache = cache.get('products');

    if (productsInCache) {
      products = productsInCache;
    } else {
      const productsResponse = await productsPromise;

      products = productsResponse;
    }
  } catch (err) {
    console.log(err);
  }

  if (params?.category) {
    products = products.filter(
      product =>
        product.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params?.sortBy && params.sortBy !== 'recent') {
    products = products.sort((a, b) =>
      params.sortBy === 'highestCost' ? b.cost - a.cost : a.cost - b.cost
    );
  }

  const total = products.length;

  if (params?.page) {
    products = products.slice(
      (params.page - 1) * params.limit!,
      params.page * params.limit!
    );
  }

  return {
    data: products,
    total,
    pages: params?.limit ? Math.ceil(total / params.limit) : 1
  };
};

export const redeem = async (productId: string) => {
  const res = await client.post<{ message: string }>('/redeem', { productId });

  return res.data;
};

export const addPoints = async (amount: number) => {
  const res = await client.post<{ message: string }>('/user/points', {
    amount
  });

  return res.data;
};

export const getCategories = async () => {
  const products = await getProducts();

  const categories = new Set(products.data.map(product => product.category));

  return Array.from(categories);
};

export const getUser = () => client.get<User>('/user/me').then(res => res.data);
