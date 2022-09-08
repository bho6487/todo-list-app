import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const FilterButton = ({ name, isPressed, setFilter }) => {
  return (
    <Button
      variant={isPressed ? "contained" : "outlined"}
      // spacing={3}
      type="button"
      aria-pressed={isPressed}
      onClick={() => {
        setFilter(name);
      }}
    >
      <Box component="span" sx={{ display: "inline" }}>
        {name}
      </Box>
    </Button>
  );
};

export default FilterButton;
