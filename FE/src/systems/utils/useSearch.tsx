/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import instance from "../../configs/axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const fetchSuggestions = useCallback(async (searchQuery: any) => {
    if (searchQuery.length > 0) {
      setIsLoading(true);
      try {
        const response = await instance.get("/products_all", {
          params: { _search: searchQuery },
        });
        const products = response.data.products || [];
        setSuggestions(products);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    [fetchSuggestions]
  );

  useEffect(() => {
    debouncedFetchSuggestions(query);
  }, [query, debouncedFetchSuggestions]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    setIsLoading(true);
    setShowSuggestions(true);
  };

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleSearch,
    searchRef,
    isLoading,
    handleInputChange,
  };
};

export default useSearch;
