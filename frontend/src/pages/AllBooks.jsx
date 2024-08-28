import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import SearchBar from '../components/searchBar';
import axios from "axios";
import Loader from "./Loader";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/v1/get-all-books`
        );
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    const searchResult = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(searchResult);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="h-auto px-12 py-8 bg-zinc-900">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
