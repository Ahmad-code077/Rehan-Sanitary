export type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className=''>
      <div className='flex items-center'>
        <input
          type='text'
          id='search'
          placeholder='Search Item Here....'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-6 py-2 sm:w-96 text-lg border border-black  focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out text-black bg-transparent rounded-3xl'
        />
      </div>
    </div>
  );
};

export default SearchBar;
