import { useMutation, useQuery } from "@apollo/client";
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CommentOutlined, ThumbUp, ShareOutlined } from "@material-ui/icons";

import PostListItemHeader from "components/PostListItemHeader";
import CommentList from "components/CommentList";

import { GET_USER } from "actions/userActions";
import { LIKE_POST } from "actions/likeActions";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    marginBottom: "2.1rem",
    padding: "1.4rem 2.1rem",
  },
  cardHeader: {
    padding: 0,
    marginBottom: "2.6rem",
  },
  cardHeaderAvatar: {
    marginRight: "1.4rem",
  },
  cardHeaderAction: {
    margin: 0,
  },
  cardSubheader: {
    fontWeight: 500,
    lineHeight: "1.3rem",
    fontSize: "1.1rem",
    letterSpacing: "-0.015em",
  },
  avatar: {
    width: "4.3rem",
    height: "auto",
  },
  authorName: {
    fontWeight: 600,
    fontSize: "1.3rem",
    letterSpacing: "0.012em",
    lineHeight: "1.2rem",
    color: theme.palette.text.primary,
    marginBottom: "0.8rem",
  },
  shareButton: {
    marginLeft: "auto",
  },
  cardContent: {
    padding: 0,
    marginBottom: "2.1rem",
  },
  cardActions: {
    padding: 0,
    marginBottom: "1.4rem",
  },
  iconButton: {
    fontSize: "2rem",
  },
  // divider: {
  //   margin: 0,
  // },
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
      <ThumbUp className={classes.iconButton} />
    </IconButton>
  );

  const commentButton = (
    <IconButton aria-label="view comments">
      <CommentOutlined className={classes.iconButton} />
    </IconButton>
  );

  const shareButton = (
    <IconButton aria-label="share post" className={classes.shareButton}>
      <ShareOutlined className={classes.iconButton} />
    </IconButton>
  );

  return (
    <Card className={classes.root}>
      <PostListItemHeader author={data.author} />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textPrimary">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {likeButton}
        {commentButton}
        {shareButton}
      </CardActions>
      <Divider className={classes.divider} />
      <CommentList post={props.id} />
    </Card>
  );
}

export default PostListItem;
