import { useLoaderData } from "@remix-run/react";
import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { getNode } from "~/api/getNode";
import type { Node } from "~/types";
import { createComment } from "~/api/createComment";
import { Box, Avatar, Typography, Card, CardMedia } from "@mui/material";
import Date from "~/components/Date";
import Title from "~/components/Content/components/Title";
import Comments from "~/components/Content/components/Comments";
import Author from "~/components/Content/components/Author";
import Taxonomies from "~/components/Content/components/Taxonomies";
import Body from "~/components/Content/components/Body";
import useSettings from "~/components/Settings/hooks/use-settings-context";
import BackToBlog from "~/components/Content/components/BackToBlog";

export const meta: MetaFunction = ({ data }: { data: Node }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const settings = useSettings();
  if (!data) {
    return {
      title: "No data",
    };
  }

  const description = data?.excerpt?.replace(/<[^>]*>?/gm, "");
  const twitter = settings.configs?.twitter;
  const author = `${data.author?.node.firstName ?? ""} ${data.author?.node.lastName ?? ""}`;
  const title = `${data.title} - ${author}`;
  const image = data.featuredImage?.node?.mediaDetails?.sizes?.find(
    ({ width }) => Number(width) > 300 && Number(width) < 800
  )?.sourceUrl;

  return {
    title,
    description,
    keywords: data.tags?.nodes.map((tag) => tag.name).join(", "),
    author: author,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:creator": twitter,
    "twitter:site": twitter,
    "twitter:image": image,
    "twitter:card": "summary_large_image",

    "og:type": "website",
    "og:title": title,
    "og:description": description,
    "og:image": image,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  return getNode({ uri: params.uri as string });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  return createComment(values);
};

export default function NodeUri() {
  const {
    __typename,
    title,
    content,
    comments,
    databaseId,
    categories,
    tags,
    author,
    date,
    commentStatus,
    featuredImage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uri,
  } = useLoaderData<Node>();

  return (
    <div>
      <BackToBlog />
      <Title gutterBottom>{title}</Title>
      <Box sx={{ mb: 3 }}>
        <Taxonomies data={tags?.nodes} />
      </Box>
      {author?.node && __typename === "Post" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 5,
          }}
        >
          <Avatar sx={{ marginInlineEnd: 1 }} src={author.node.avatar?.url} />
          <Typography variant="caption">
            {author.node.firstName} {author?.node.lastName} /
          </Typography>
          <Date sx={{ marginInlineStart: 0.5 }} date={date} />
        </Box>
      )}
      {featuredImage?.node.mediaItemUrl && (
        <Card raised sx={{ mb: 4 }}>
          <CardMedia component="img" image={featuredImage.node.mediaItemUrl} />
        </Card>
      )}
      <Body>{content}</Body>
      <Box>
        <Taxonomies
          ChipProps={{ variant: "outlined", sx: { borderRadius: 0 } }}
          data={categories?.nodes}
        />
      </Box>
      <Box sx={{ py: 2 }}>
        <Taxonomies data={tags?.nodes} />
      </Box>
      {author?.node && __typename === "Post" && <Author data={author.node} />}
      <Comments
        sx={{ mt: 6, pb: 6 }}
        databaseId={databaseId}
        comments={comments}
        commentStatus={commentStatus}
      />
    </div>
  );
}
