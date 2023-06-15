import { Chip } from "@mui/material";
import { Link } from "@remix-run/react";

import type { TaxonomiesProps } from "./types";
export default function Taxonomies({ data, ChipProps }: TaxonomiesProps) {
  return (
    <>
      {data?.map(({ uri: to, name }) => (
        <Chip
          key={`${to}_${name}`}
          {...(to && {
            component: Link,
            to,
            prefetch: "intent",
            clickable: true,
          })}
          label={name}
          size="small"
          {...ChipProps}
          sx={{ marginInlineEnd: 0.5, ...ChipProps?.sx }}
        />
      ))}
    </>
  );
}
