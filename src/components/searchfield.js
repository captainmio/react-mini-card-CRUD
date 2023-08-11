import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default function SearchField({
  options,
  onSelect,
  placeholder,
  clearSelected
}) {
  const [singleSelections, setSingleSelections] = useState([]);

  const handleSelect = (item) => {
    setSingleSelections(item);
  };

  useEffect(() => {
    onSelect(singleSelections[0]);
  }, [onSelect, singleSelections]);

  useEffect(() => {
    if (singleSelections.length) {
      setSingleSelections([]);
    }
  }, [clearSelected]);

  return (
    <Typeahead
      className="border border-dark rounded"
      id="typeahead"
      onChange={(selected) => handleSelect(selected)}
      options={options}
      placeholder={placeholder}
      selected={singleSelections}
    />
  );
}
