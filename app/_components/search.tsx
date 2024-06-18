"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  // const handleKeyPress:KeyboardEventHandler<HTMLInputElement> = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearchSubmit(e);
  //   }
  // }

  return (
    <form className="flex w-full gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChance}
        // onKeyDown={handleKeyPress}
        value={search}
      />
      <Button type="submit" size="icon">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
