import ProductCard from "../components/ProductCard";
import { models } from "../data/models";
import CategoryItem from "../components/CategoryItem";

const heroBanner = "/hero-banner.jpg";

const categories = [
  {href: "/spring", name: "Spring collection", imageUrl: "/spring.jpg"},
  {href: "/summer", name: "Summer collection", imageUrl: "/summer.jpg"}
]

const HomePage = () => {
  const featuredProducts = models.filter(
    (model) => model.collection === "featured"
  );

  const newArrivals = models.filter(
    (model) => model.collection === "new"
  );

  return (
    <main className="w-full bg-white text-[#1a1a1a]">

      {/* HERO */}
      <section className="mt-13.5 min-h-[calc(100vh-54px)] w-full bg-cover bg-top flex items-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="w-full px-6 sm:px-10 lg:px-25">
          <div className="flex max-w-xl flex-col items-start">

            <h4 className="pb-3.75 text-xl font-semibold text-[#222]">
              Trade-in-offer
            </h4>

            <h2 className="text-[38px] font-bold leading-tight text-[#222] sm:text-[46px] sm:leading-13.5">
              Super value deals
            </h2>

            <h1 className="text-[42px] font-bold leading-tight text-[#088178] sm:text-[50px] sm:leading-16">
              On all products
            </h1>

            <p className="my-3.75 mb-5 text-base text-[#465b52]">
              Save more with coupons up to 70% off!
            </p>

          </div>
        </div>
      </section>

      <section>
        <div className='relative text-white'>
          <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <h1 className="text-3xl font-bold text-[#222] sm:text-[46px] sm:leading-13.5 text-center mb-4">
              Explore Our Categories
            </h1>
            <p className='text-center text-xl text-gray-700 mb-12'>
              Discover the latest trends in eco-friendly fashion
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
              {categories.map((category) => (
                <CategoryItem category={category} key={category.name} />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FEATURED PRODUCTS */}
      <section className="px-5 py-14 sm:px-10 lg:px-20">

        <div className="mb-7 text-center">
          <h2 className="text-3xl font-bold text-[#222] sm:text-[46px] sm:leading-13.5">
            All Products
          </h2>

          <p className="mt-2 text-base text-[#465b52]">
            Spring Collection New Modern Design
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-20">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </div>

      </section>


      {/* SALE BANNER */}
      <section className="my-10 flex min-h-75 w-full flex-col items-center justify-center bg-[#ebe2e3] px-5 text-center">
        <h4 className="text-base font-semibold text-[#222]">
          Special Offers
        </h4>

        <h2 className="py-3 text-3xl font-bold text-[#222] md:text-4xl">
          Up to{" "}
          <span className="text-[#088178]">
            70% Off
          </span>{" "}
          - All Sweaters & Accessories
        </h2>

        <button className="mt-3 h-12.5 w-50 border border-[#088178] bg-transparent text-lg font-medium text-[#088178] transition-all duration-300 hover:bg-[#088178] hover:text-white">
          Explore More
        </button>
      </section>


      {/* NEWSLETTER */}
      <section className="my-10 flex min-h-45 w-full flex-col items-center justify-between gap-7 bg-[#041e42] px-6 py-10 md:flex-row lg:px-20">
        <div>
          <h4 className="text-[22px] font-bold text-white">
            Sign Up For Newsletters
          </h4>

          <p className="mt-2 text-sm font-semibold text-[#818ea0]">
            Get E-mail updates about our latest shop and{" "}
            <span className="text-[#ffbd27]">
              special offers
            </span>
            .
          </p>
        </div>

        <div className="flex w-full max-w-xl">
          <input
            type="email"
            placeholder="Your email address"
            className="h-12.5 w-full rounded-l-md border border-transparent bg-white px-5 text-base text-[#1a1a1a] outline-none"
          />

          <button className="w-37.5 whitespace-nowrap rounded-r-md bg-[#088178] px-4 text-base font-semibold text-white transition hover:bg-[#066c65]">
            Sign Up
          </button>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
