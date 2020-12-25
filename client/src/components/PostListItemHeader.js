import { makeStyles, Avatar, CardHeader, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

function PostListItemHeader({ author }) {
  const classes = useStyles();

  const renderAvatar = (
    <Avatar
      aria-label="avatar"
      src={author.avatarURL}
      className={classes.avatar}
    />
  );

  const renderActionIcon = (
    <IconButton aria-label="post settings" className={classes.cardHeaderAction}>
      <MoreVert className={classes.iconButton} />
    </IconButton>
  );

  const props = {
    avatar: renderAvatar,
    action: renderActionIcon,
    title: author.name,
    subheader: "testing",
    className: classes.cardHeader,
    titleTypographyProps: { className: classes.authorName },
    subheaderTypographyProps: { className: classes.cardSubheader },
    classes: {
      action: classes.cardHeaderAction,
      avatar: classes.cardHeaderAvatar,
    },
  };

  return <CardHeader {...props} />;
}

export default PostListItemHeader;
