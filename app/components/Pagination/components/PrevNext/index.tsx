import { IconButton, Tooltip, Box, useTheme } from "@mui/material";
import { useQueryParams, NumberParam, StringParam } from "use-query-params";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import type { PrevNextProps } from "./types";

export default function PrevNext({ pageInfo, sx }: PrevNextProps) {
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;
  const theme = useTheme();

  const [, setQuery] = useQueryParams({
    limit: NumberParam,
    after: StringParam,
    before: StringParam,
  });

  return (
    <Box sx={sx}>
      <IconButton
        disabled={!hasPreviousPage}
        onClick={() => {
          setQuery({
            before: startCursor,
            after: undefined,
          });
        }}
      >
        <Tooltip title="Previous page">
          {theme.direction === "rtl" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </Tooltip>
      </IconButton>
      <IconButton
        disabled={!hasNextPage}
        onClick={() => {
          setQuery({
            after: endCursor,
            before: undefined,
          });
        }}
      >
        <Tooltip title="Next page">
          {theme.direction === "rtl" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </Tooltip>
      </IconButton>
    </Box>
  );
}
