import { useMutation, useQuery } from "@apollo/client";
import {
  makeStyles,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  CommentOutlined,
  MoreVert,
  ThumbUpOutlined,
  ShareOutlined,
} from "@material-ui/icons";

import { GET_USER } from "actions/userActions";
import { LIKE_POST } from "actions/likeActions";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    marginBottom: "2.1rem",
    padding: "1.4rem 2.1rem",
  },
  cardHeader: {
    padding: 0,
  },
  avatar: {
    width: "4.3rem",
    height: "auto",
    marginRight: "1.4rem",
  },
  authorName: {
    fontWeight: 600,
    fontSize: "1.3rem",
    letterSpacing: "0.012em",
    lineHeight: "1.1rem",
    color: theme.palette.text.primary,
  },
  shareButton: {
    marginLeft: "auto",
  },
}));

function PostListItem(props) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_USER);
  const [likePost] = useMutation(LIKE_POST);

  if (loading) return "Loading...";
  if (error) throw Error(error.message);

  const handleLikePost = () => {
    likePost({
      variables: { post: props.id },
      optimisticResponse: {
        __typename: "Mutation",
        createLike: {
          post: {
            __typename: "Post",
            id: props.id,
            numLikes: props.numLikes + 1,
          },
        },
      },
    });
  };

  const likeButton = (
    <IconButton aria-label="like post" onClick={handleLikePost}>
      <ThumbUpOutlined />
    </IconButton>
  );

  const commentButton = (
    <IconButton aria-label="view comments">
      <CommentOutlined />
    </IconButton>
  );

  const shareButton = (
    <IconButton aria-label="share post" className={classes.shareButton}>
      <ShareOutlined />
    </IconButton>
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="avatar"
            src={props.author.avatarURL}
            className={classes.avatar}
          />
        }
        action={
          <IconButton aria-label="post settings">
            <MoreVert />
          </IconButton>
        }
        title={props.author.name}
        subheader={"testing"}
        className={classes.cardHeader}
        titleTypographyProps={{ className: classes.authorName }}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {likeButton}
        {commentButton}
        {shareButton}
      </CardActions>
      <Divider variant="middle" />
    </Card>
  );
}

export default PostListItem;
