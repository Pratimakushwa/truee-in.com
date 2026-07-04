export const getProductImg = (p, index = 0) => {
  if (p?.variants?.[0]?.images?.[index]?.url) return p.variants[0].images[index].url;
  if (p?.images?.[index]?.url) return p.images[index].url;
  if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
  if (p?.images?.[0]?.url) return p.images[0].url;
  return 'https://placehold.co/400x400/f8f8f8/cccccc?text=TRUEE';
};

export const getProductPricing = (product) => {
  const isDealActive =
    product?.flashDeal?.isActive &&
    new Date(product.flashDeal.endTime).getTime() > Date.now();
  const mrp = product?.price || 0;
  const sellingPrice = isDealActive
    ? product.flashDeal.dealPrice
    : mrp - (product?.discountPrice || 0);
  const hasDiscount = mrp > sellingPrice && mrp > 0;
  const discountPercent = hasDiscount
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : 0;
  return { mrp, sellingPrice, hasDiscount, discountPercent, isDealActive };
};

export const isOutOfStock = (product) =>
  product?.stock <= 0 &&
  (!product?.variants || !product.variants.some((v) => v.stock > 0));

export const formatPrice = (price) => {
  if (price === undefined || price === null || price === 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getRating = (product) => {
  const avg = product?.ratings?.average ?? product?.averageRating ?? 4.2;
  const count = product?.ratings?.count ?? product?.numReviews ?? 0;
  return { avg: Number(avg) || 4.2, count: Number(count) || 0 };
};
