/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import instance from "../../configs/axios";
const useSearch = (initialTerm = "", debounceDelay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults(searchTerm);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const fetchResults = debounce(async (term) => {
    if (!term.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await instance.get("/products_all", {
        params: { _search: term }, // Gửi từ khóa tìm kiếm
      });
      setResults(response.data.data.docs);
      setShowResults(response.data.data.docs.length > 0);
      setError("");
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Something went wrong. Please try again!");
      setShowResults(false);
    }
  }, debounceDelay);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value); // Cập nhật searchTerm
    fetchResults(value); // Gọi hàm tìm kiếm ngay lập tức
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  const handleFocus = () => {
    if (searchTerm.trim() && results.length > 0) {
      setShowResults(true);
    }
  };
  const handleResultClick = () => {
    setSearchTerm("");
    setShowResults(false);
  };
  return {
    searchTerm,
    results,
    showResults,
    error,
    handleChange,
    handleBlur,
    handleFocus,
    handleResultClick,
  };
};

export default useSearch;