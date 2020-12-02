import { makeStyles } from "@material-ui/core";

import Navigation from "components/Navigation";
import PostList from "components/PostList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.8, 0),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <PostList />
      </main>
      <aside></aside>
    </div>
  );
}

export default App;
