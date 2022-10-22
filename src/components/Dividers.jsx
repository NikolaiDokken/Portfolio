import { Divider } from "@mui/material";

const MainDivider = () => {
    return <Divider sx={{ borderRadius: "1px", backgroundColor: "cyan", height: "2px", mb: 2, mt: "4px" }} />;
};
const SubDivider = () => {
    return <Divider sx={{ borderRadius: "1px", mb: 1 }} />;
};

export { MainDivider, SubDivider };
