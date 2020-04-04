// Set up filter default object
const filter = {
    searchText: "",
};

const getFilters = () => filter;

const setFilters = ({ searchText }) => {
    if (typeof searchText === "string") {
        filter.searchText = searchText;
    }
};

export { getFilters, setFilters };
