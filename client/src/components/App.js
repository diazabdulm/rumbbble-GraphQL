import { makeStyles } from "@material-ui/core";

import Navigation from "components/Navigation";
import PostList from "components/PostList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // padding: theme.spacing(3.5),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 3.5),
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
