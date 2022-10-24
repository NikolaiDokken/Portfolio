import { Box, Skeleton } from "@mui/material";
import Row from "../../../components/Row";

export default function PlaceholderRow() {
    return (
        <Row additionalSx={{ mb: 1 }}>
            <Skeleton variant="rectangular" width={50} height={50} sx={{ mr: 2, borderRadius: "5px" }} />

            <Box sx={{ flex: 1 }}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </Box>
        </Row>
    );
}
