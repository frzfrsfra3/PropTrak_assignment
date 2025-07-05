import { OutlinedInput, Button, MenuItem, Select, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// Custom styled components to match Bayut's style
const BayutButton = styled(Button)({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 'bold',
  color:'white',
  padding: '8px 16px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  }
});

const BayutOutlinedInput = styled(OutlinedInput)({
  borderRadius: '8px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c0c0c0',
  },
});

const BayutSelect = styled(Select)({
  borderRadius: '8px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c0c0c0',
  },
});

const SearchAndFilter = ({
  handleSearchSubmit,
  handleValueChange,
  clearFilter,
  search,
  category,
  lowerLimit,
  upperLimit,
}) => {
  const categories = [
    "all",
    "House",
    "Apartment",
    "Room",
    "Shop Space",
    "Office Space",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <FormControl sx={{ flex: 1 }} variant="outlined">
            <BayutOutlinedInput
              name="search"
              type="text"
              placeholder="Enter location, property type, or keyword"
              value={search}
              onChange={handleValueChange}
              startAdornment={
                <InputAdornment position="start">
                  <SearchRoundedIcon color="action" />
                </InputAdornment>
              }
              sx={{
                '& .MuiInputBase-input': {
                  padding: '12px 14px',
                }
              }}
            />
          </FormControl>
          
          <BayutButton
            variant="contained"
            type="submit"
            color="primary"
            fontColor="white"
            size="large"
            startIcon={<SearchRoundedIcon />}
            sx={{
              backgroundColor: '#00b0ad',
              '&:hover': {
                backgroundColor: '#008a88',
              }
            }}
          >
            Search
          </BayutButton>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <FormControl sx={{ minWidth: 180 }} size="small">
            <BayutSelect
              id="category"
              name="category"
              value={category}
              onChange={handleValueChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option === "all" ? "All Categories" : option}
                </MenuItem>
              ))}
            </BayutSelect>
          </FormControl>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Price</span>
            <TextField
              name="lowerLimit"
              variant="outlined"
              size="small"
              placeholder="Min"
              type="number"
              value={lowerLimit}
              onChange={handleValueChange}
              sx={{ width: 100 }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#fff' }
              }}
            />
            <span className="text-gray-400">to</span>
            <TextField
              name="upperLimit"
              variant="outlined"
              size="small"
              placeholder="Max"
              type="number"
              value={upperLimit}
              onChange={handleValueChange}
              sx={{ width: 100 }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#fff' }
              }}
            />
          </div>

          <BayutButton
            variant="outlined"
            onClick={clearFilter}
            color="inherit"
            size="medium"
            sx={{
              borderColor: '#e0e0e0',
              color: '#666',
              '&:hover': {
                borderColor: '#c0c0c0',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Reset
          </BayutButton>
        </div>
      </form>
    </div>
  );
};

export default SearchAndFilter;