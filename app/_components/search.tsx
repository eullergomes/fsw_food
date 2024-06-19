"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../_lib/utils";

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex w-full gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button type="submit" size="icon" className={cn("", className)}>
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
