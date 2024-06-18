import Image from "next/image";
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { SearchIcon } from 'lucide-react';
import Search from "./search";

const SearchDesk = () => {
  return (
    <div className="hidden h-[450px] items-center justify-between gap-8 bg-primary px-5 md:flex lg:px-24">
      <div className="space-y-4">
        <div>
          <h2 className="text-5xl font-bold text-white">Está com fome?</h2>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
        </div>
        <div className="flex gap-2 rounded-xl bg-white p-5">
          <Search />
        </div>
      </div>

      <div>
        <Image src="/soup.png" alt="logo" width={390} height={300} />
      </div>
    </div>
  );
};

export default SearchDesk;
