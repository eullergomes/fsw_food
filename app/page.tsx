import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <Search />
      </div>

      <div className="px-5 py-6">
        <CategoryList />
      </div>

      <div className="px-5-pt6">
        <Image
          src="/banner-promo-pizza.png"
          alt="Até 30% de desconto em pizzas"
          height={0}
          width={0}
          className="object-cotain h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>
    </div>
  );
}
