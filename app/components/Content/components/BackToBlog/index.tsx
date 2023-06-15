import { Divider, Button, useTheme } from "@mui/material";
import { Link as RmxLink } from "@remix-run/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { BackToBlogProps } from "./types";

// eslint-disable-next-line no-empty-pattern
export default function BackToBlog({ }: BackToBlogProps) {
  const theme = useTheme();

  return (
    <Divider sx={{ mb: 3 }} light variant="fullWidth" textAlign="center">
      <Button
        component={RmxLink}
        disableRipple
        variant="text"
        color="inherit"
        prefetch="intent"
        sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
        to={"/"}
      >
        {theme.direction === "rtl" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        Back to blog
      </Button>
    </Divider>
  );
}
