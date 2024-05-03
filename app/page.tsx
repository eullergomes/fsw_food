import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <Search />
      </div>
    </div>
  );
}
