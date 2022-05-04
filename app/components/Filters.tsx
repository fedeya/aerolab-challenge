import { useMemo } from 'react';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
  useSearchParams
} from '@remix-run/react';
import type { LoaderData } from '~/routes';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

const Button: React.FC<ButtonProps> = ({ isActive, ...props }) => {
  return (
    <button
      {...props}
      className={clsx('px-4 rounded-xl py-2 ', {
        'bg-gradient-to-r from-brand-primary to-brand-secondary': isActive,
        'bg-neutral-200': !isActive
      })}
    >
      <span
        className={clsx('font-semibold', {
          'text-white': isActive,
          'bg-gradient-to-r font-semibold bg-clip-text from-brand-primary text-transparent to-brand-secondary':
            !isActive
        })}
      >
        {props.children}
      </span>
    </button>
  );
};

const Filters: React.FC = () => {
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();
  const [params] = useSearchParams();
  const submit = useSubmit();

  const sortBy = useMemo(() => {
    const transitionSortBy = transition.submission?.formData.get('sortBy');

    if (transition.state === 'submitting' && transitionSortBy)
      return transitionSortBy;

    if (transition.state === 'submitting' && !transitionSortBy) return 'recent';

    return params.get('sortBy') || 'recent';
  }, [params, transition]);

  return (
    <div className="w-full mb-6">
      <Form
        action="/"
        onChange={event => {
          submit(event.currentTarget, {});
        }}
        className="text-neutral-600 flex items-center space-x-4"
      >
        <div className="border-r border-neutral-300 pr-6">
          <label className="flex items-center space-x-2">
            <span>Filter by:</span>
            <select defaultValue={params.get('category') || ''} name="category">
              <option value="">All Products</option>

              {data.categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <p>Sort by:</p>

          <Button name="sortBy" value="recent" isActive={sortBy === 'recent'}>
            Most Recent
          </Button>

          <Button
            name="sortBy"
            value="lowestCost"
            isActive={sortBy === 'lowestCost'}
          >
            Lowest Price
          </Button>

          <Button
            name="sortBy"
            value="highestCost"
            isActive={sortBy === 'highestCost'}
          >
            Highest Price
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
