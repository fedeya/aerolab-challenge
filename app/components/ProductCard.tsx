import type { Product } from '~/models/api.server';
import { useUser } from '~/utils';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = useUser();

  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-white relative rounded-xl border border-[#DAE4F2] py-2 shadow-lg">
        <div className="border-b p-8 border-[#DAE4F2]">
          <div className="relative h-56 w-full">
            <img
              src={product.img.hdUrl || product.img.url}
              alt={product.name}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-2 pb-2 px-4 font-semibold">
          <p className="text-neutral-900 text-lg">{product.name}</p>
          <p className="text-neutral-600 text-sm uppercase">
            {product.category}
          </p>
        </div>
      </div>

      {user && user.points < product.cost && (
        <button className="p-2 bg-neutral-200 font-semibold text-lg shadow-md text-neutral-600 rounded-xl">
          You need {product.cost}
        </button>
      )}

      {user && user.points >= product.cost && (
        <button className="w-full shadow-md font-semibold text-lg bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl text-white p-2">
          Redeem for {product.cost}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
