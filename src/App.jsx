import React from "react";
import youtube from "./api/youtube";
import { Grid } from "@material-ui/core";

import { SearchBar, VideoDetail, VideoList } from "./components";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  };

  componentDidMount() {
    this.handleSubmit("4k");
  }

  handleSubmit = async searchTerm => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResult: 5,
        key: "AIzaSyCScoohS6FJ2nvu8ISflNND9pDORPANWdo",
        q: searchTerm
      }
    });
    console.log(response.data.items);
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={this.state.selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
