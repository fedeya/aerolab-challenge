import { useMatches } from '@remix-run/react';
import type { AxiosError } from 'axios';
import { useMemo } from 'react';
import type { User } from './models/api.server';

export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find(route => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.name === 'string';
}

export function useUser(): User {
  const data = useMatchesData('root');
  if (!data?.user || !isUser(data.user)) {
    throw new Error(
      'No user found in root loader, but user is required by useUser.'
    );
  }
  return data.user;
}

export function isAxiosError<T>(err: any): err is AxiosError<T> {
  return err.response && err.response.data;
}
