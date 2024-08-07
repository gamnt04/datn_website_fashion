import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import instance from "../../configs/axios";
import { useNavigate, useLocation } from "react-router-dom";

const useSearch = (initialTerm = "", debounceDelay = 500) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setResults([]);
    setShowResults(false);
    setError("");
  }, []);

  const fetchResults = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      try {
        const response = await instance.get("/products_all", {
          params: { _search: term },
        });
        setResults(response.data.products);
        setShowResults(true);
        setError("");
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Something went wrong. Please try again!");
        setShowResults(true);
      }
    }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults(searchTerm);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm, fetchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      resetSearch();
    }
  }, [location, resetSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleFocus = () => {
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      //setSearchTerm("");
      setShowResults(false);
    }
  };

  return {
    searchTerm,
    results,
    showResults,
    error,
    searchRef,
    handleChange,
    handleFocus,
    handleResultClick,
    handleSubmit,
    resetSearch,
  };
};

export default useSearch;
