// TITLE
// -----
// Products page




// Packages
// --------


// NPM PACKAGES
import React, { useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";









// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import Header from "components/Header";






// REDUX STORE
import { useGetProductsQuery } from "state/api";








// MAKING PRODUCT COMPONENT SO IT CAN BE USED IN BELOW PRODUCTS
// we could have made it separate component but this is also fine
const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat,
}) => {
    // just for seemore in product card
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();



    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >
            {/* for knowing what is cardContent and cardaction look at MUI doc */}
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>

                {/* Rating component is provided by material ui itself . Making it ourself is hard. we can look at my project of movieInfo for own Rating component */}
                <Rating value={rating} readOnly />

                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>

            {/* Collapse the info if isExpanded is false */}
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300],
                }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>
                        Yearly Sales This Year: {stat.yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};



const Products = () => {
    // REDUCER
    // -------

    // imp: isLoading is provided by redux toolkit Query  provide itself . isLoading is imp for checking we got the data or not from backend
    // destructuring inloading and data from useGetProductsQuery
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width:1000px)");



    return (



        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products." />

            {/* redux isLoading sometimes  mistakely shows false value so use data or isLoading */}
            {data || !isLoading ? (
                // grid is preferred for 2d items and flex is preferred for 1d items
                // google search gridtemplateColumn syntax . its easy
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        // & >div means we are targetting this div or immediate div
                        // span : 4 means each child component expand to all 4 grid or takes the whole width of screen
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >

                    {/* mapping our data to Product component we created below */}
                    {/* look at syntax below , memorize it */}
                    {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    );
}

export default Products;




// note:
// -----