import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 1,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "rgb(190, 49, 174)",
  },
}));

export default function IconBasket({ count, clickFunction }) {
  return (
    <div onClick={() => clickFunction()}>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={count} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </div>
  );
}
