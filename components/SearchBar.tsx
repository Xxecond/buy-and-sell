function SearchBar({ setSearchTerm }: { setSearchTerm: (value: string) => void }) {
  return (
    <div className=" flex justify-end mt-5 pr-5">
      <input
        type="search"
        placeholder="Search blogs..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" placeholder:text-black dark:placeholder:text-white placeholder:tracking-tighter lock focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg w-full transition"
      />
    </div>
  );
}

export default SearchBar;
