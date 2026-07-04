import ProductCardPremium from '../../components/products/ProductCardPremium';
import {
  getProductPricing,
  isOutOfStock,
  formatPrice,
  getProductImg,
} from '../../utils/productHelpers';

export default function ShopProductCard({ product, onQuickView }) {
  return (
    <ProductCardPremium
      product={product}
      onQuickView={onQuickView}
      variant="default"
      className="h-full mb-0"
    />
  );
}

export { getProductPricing, isOutOfStock, formatPrice, getProductImg };
