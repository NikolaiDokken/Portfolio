import { Divider, useTheme } from "@mui/material";

const MainDivider = () => {
    const theme = useTheme();

    return (
        <Divider
            sx={{ borderRadius: "1px", backgroundColor: theme.palette.primary.main, height: "2px", mb: 2, mt: "4px" }}
        />
    );
};
const SubDivider = () => {
    return <Divider sx={{ borderRadius: "1px", mb: 1 }} />;
};

export { MainDivider, SubDivider };
