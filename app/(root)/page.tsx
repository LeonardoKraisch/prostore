import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
  getCategoryShowcase,
} from "@/lib/actions/product.actions";
import IconBoxes from "@/components/icon-boxes";
import Hero from "@/components/home/hero";
import CategoryShowcase from "@/components/home/category-showcase";

const Homepage = async () => {
  const [latestProducts, featuredProducts, categories] = await Promise.all([
    getLatestProducts(),
    getFeaturedProducts(),
    getCategoryShowcase(),
  ]);

  const heroProduct = featuredProducts[0] ?? latestProducts[0];

  return (
    <>
      <Hero product={heroProduct} />
      <ProductList
        data={latestProducts}
        title="New arrivals"
        viewAllHref="/search"
      />
      <CategoryShowcase categories={categories} />
      <IconBoxes />
    </>
  );
};

export default Homepage;
