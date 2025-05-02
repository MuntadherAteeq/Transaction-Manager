"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PlusCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutocompleteInputProps {
  suggestions: string[];
  onAddItem?: (item: string) => void;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  [key: string]: any;
}

export function AutocompleteInput(props: AutocompleteInputProps) {
  const {
    suggestions: initialSuggestions,
    onAddItem,
    placeholder = "Type to search...",
    onChange,
    value: controlledValue,
    className,
    readOnly = false,
  } = props;
  const [isControlled] = useState(controlledValue !== undefined);
  const [inputValue, setInputValue] = useState(controlledValue || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update input value if controlled component
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  // Filter suggestions based on input value
  useEffect(() => {
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        suggestion.toLowerCase() !== inputValue.toLowerCase()
    );
    setFilteredSuggestions(filtered);
    setActiveSuggestionIndex(0);
  }, [inputValue, suggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isControlled) {
      setInputValue(value);
    }

    if (onChange) {
      onChange(value);
    }

    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow up/down to navigate suggestions
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
    // Handle enter to select suggestion or add new item
    else if (e.key === "Enter") {
      e.preventDefault();

      if (filteredSuggestions.length > 0 && showSuggestions) {
        selectSuggestion(filteredSuggestions[activeSuggestionIndex]);
      } else if (inputValue.trim() !== "") {
        addNewItem();
      }
    }
    // Handle escape to close suggestions
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    if (!isControlled) {
      setInputValue(suggestion);
    }

    if (onChange) {
      onChange(suggestion);
    }

    setShowSuggestions(false);
  };

  const addNewItem = () => {
    const newItem = inputValue.trim();

    if (newItem && !suggestions.includes(newItem)) {
      const updatedSuggestions = [...suggestions, newItem];
      setSuggestions(updatedSuggestions);

      if (onAddItem) {
        onAddItem(newItem);
      }

      if (!isControlled) {
        setInputValue(newItem);
      }

      if (onChange) {
        onChange(newItem);
      }
    }

    setShowSuggestions(false);
  };

  const isNewItem =
    inputValue.trim() !== "" &&
    !suggestions.some(
      (suggestion) => suggestion.toLowerCase() === inputValue.toLowerCase()
    );

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        {...props}
      />

      {showSuggestions &&
        (inputValue.trim() !== "" || filteredSuggestions.length > 0) && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-md max-h-60 overflow-auto"
          >
            {filteredSuggestions.length > 0 ? (
              <ul className="py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() => selectSuggestion(suggestion)}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-muted flex items-center justify-between",
                      index === activeSuggestionIndex && "bg-muted"
                    )}
                  >
                    <span>{suggestion}</span>
                    {index === activeSuggestionIndex && (
                      <Check className="h-4 w-4 text-muted-foreground" />
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {isNewItem && (
              <div
                className="px-4 py-2 cursor-pointer hover:bg-muted border-t flex items-center gap-2"
                onClick={addNewItem}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add "{inputValue}"</span>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
