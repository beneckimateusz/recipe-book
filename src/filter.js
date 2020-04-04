// Set up filter default object
const filter = {
    searchText: "",
};

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filter;

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = ({ searchText }) => {
    if (typeof searchText === "string") {
        filter.searchText = searchText;
    }
};

// Make sure to set up the exports
export { getFilters, setFilters };
