import {
  Post as PostDto,
  PostToCommentConnection,
  CommentToCommentConnection,
  Maybe,
} from "~/types/wordpress_types";

export type Post = {
  slug: string;
  title: string;
} & PostDto;

export type Query = {
  limit?: number | null;
  after?: string | null;
  before?: string | null;
};

export type Comments =
  | Maybe<PostToCommentConnection>
  | Maybe<CommentToCommentConnection>;
