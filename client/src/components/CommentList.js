import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import { GET_COMMENTS } from "actions/commentActions";

const useStyles = makeStyles((theme) => ({}));

function CommentList({ post }) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { post },
  });

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderComments = data.comments.map(({ id, content, author }) => (
    <ListItem disableGutters alignItems="flex-start" key={id}>
      <ListItemAvatar>
        <Avatar alt="" src={author.avatarURL} />
      </ListItemAvatar>
      <ListItemText primary={author.name} secondary={content} />
    </ListItem>
  ));

  return (
    <List disablePadding>
      <ListItem disableGutters alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt=""
            src="https://avatars3.githubusercontent.com/u/20374641?v=4"
          />
        </ListItemAvatar>
        <ListItemText
          primary="Abdul Diaz"
          secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet vestibulum lorem. Proin vitae eros non dolor euismod iaculis eu id eros. In hac habitasse platea dictumst. Nulla posuere ornare ultricies. Aliquam diam leo, egestas at turpis ac, rhoncus euismod enim. Vivamus sed magna quis erat ullamcorper imperdiet molestie nec nisl."
        />
      </ListItem>
      {renderComments}
    </List>
  );
}

export default CommentList;
