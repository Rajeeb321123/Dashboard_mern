// TITLE
// -----
// Transactions PAGE




// Packages
// --------


// NPM PACKAGEs
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";








// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";





// REDUX STORE





const Transactions = () => {
  



    
    
    
    
    
    
      
    // USESTATES
    // ---------
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    
    // sort is a object
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    // imp: we are going take our live input separate than search and when we click search we want to make seach value = searchInput and search input empty 
    const [searchInput, setSearchInput] = useState("");

    // REDUCER
    // -------
    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        // sort object is changed to json 
        sort: JSON.stringify(sort),
        search,
      });
      console.log(data)
    
    
    // Column for datagrid
    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "userId",
          headerName: "User ID",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "CreatedAt",
          flex: 1,
        },
        {
          field: "products",
          headerName: "# of Products",
          flex: 0.5,
          sortable: false,
          renderCell: (params) => params.value.length,
        },
        {
            // cost isnot sortable in reality beacuse we are setting cost as string in database for easy of search
          field: "cost",
          headerName: "Cost",
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
      ];
    
    
    
    // INSTANCES 
    // ---------
    const theme = useTheme();
    

    
    
    
      return (
        <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            // row count in accordance to total data
            rowCount={(data && data.total) || 0}

            // option for row per page
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            // below is just boilarplate code
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}

            // use doc and googleSearch
            // we have created our custom toolbar
            components={{ Toolbar: DataGridCustomToolbar }}
            // Props for our toolbar
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      </Box>
      );
    }
    
    export default Transactions;
    
    
    
    
    // note:
    // -----
    // Most imp part of this project :
// Server side Pagination
// IMP for large volume of data in real project
// We only show few customers out of many at one time 
// but when we want to sort differently we dont have have full data in front end so we need server side pagination 
// we need to update both server and page no in frontend with each changes eg changes like sorting by date 