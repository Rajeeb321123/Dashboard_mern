
// OUR OUWN CUSTOM COLUM MENU IN ADMIN PAGE:for only showing FILTER AND HIDE
import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
  } from "@mui/x-data-grid";
  
  const CustomColumnMenu = (props) => {

    // these are default props from mui grid
    const { hideMenu, currentColumn, open } = props;
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>
    );
  };
  
  export default CustomColumnMenu;