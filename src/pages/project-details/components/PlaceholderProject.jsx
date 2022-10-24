import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Row from "../../../components/Row";

export default function PlaceholderProject() {
    const navigate = useNavigate();
    return (
        <Box>
            <Button onClick={() => navigate("/projects")} startIcon={<ArrowBackIosIcon />}>
                Go Back
            </Button>
            <Typography variant="h2" fontWeight={"bold"} sx={{ mr: 1 }}>
                <Skeleton />
            </Typography>

            <Row>
                <Typography variant="h3" sx={{ mr: 1 }}>
                    <Skeleton width={200} />
                </Typography>
                <Skeleton variant="rounded" width={40} height={40} />
            </Row>
            <Stack spacing={2}>
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="rounded" height={100} />
                <Skeleton variant="rounded" height={100} />
                <Skeleton variant="rounded" height={100} />
            </Stack>
        </Box>
    );
}
