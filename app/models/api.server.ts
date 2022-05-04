import axios from 'axios';

const client = axios.create({
  baseURL: 'https://coding-challenge-api.aerolab.co',
  headers: {
    Authorization: `Bearer ${process.env.AEROLAB_API_TOKEN}`
  }
});

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
  createdDate: string;
  redeemHistory: any[];
}

export const getProducts = async (params?: {
  page?: number;
  category?: string;
  sortBy?: 'recent' | 'highestCost' | 'lowestCost';
  limit?: number;
}) => {
  const res = await client.get<Product[]>('/products');

  let products = res.data;

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

  if (params?.page) {
    products = products.slice(
      (params.page - 1) * params.limit!,
      params.page * params.limit!
    );
  }

  return products;
};

export const getCategories = async () => {
  const products = await getProducts();

  const categories = new Set(products.map(product => product.category));

  return Array.from(categories);
};

export const getUser = () => client.get<User>('/user/me').then(res => res.data);
