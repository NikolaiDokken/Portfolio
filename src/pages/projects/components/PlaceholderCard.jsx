import { Box, Skeleton } from "@mui/material";
import GradientCard from "../../../components/GradientCard";

export default function PlaceholderCard() {
    return (
        <GradientCard>
            <Box sx={{ height: "100px", width: "100%", textAlign: "center", padding: 0 }}>
                <Skeleton height={100} width={150} variant="rectangular" sx={{ borderRadius: 2, margin: "0 auto" }} />
            </Box>
            <Box sx={{ textAlign: "center", marginTop: "20px", height: "120px" }}>
                <Skeleton />
                <Skeleton />
            </Box>
        </GradientCard>
    );
}
