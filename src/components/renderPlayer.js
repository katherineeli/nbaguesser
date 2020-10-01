import React, { Component } from "react";

class renderPlayer extends Component {
  state = {
    loading: true,
    player_stats: null,
    player_info: null,
  };

  async componentDidMount() {
    const stats_url =
      "https://www.balldontlie.io/api/v1/season_averages?season=2018";
    const info_url = "https://www.balldontlie.io/api/v1/players";

    let randomPlayerID = Math.floor(Math.random() * 493) + 1;
    let player_stats = await fetch(
      stats_url + "&player_ids[]=" + randomPlayerID
    );
    let player_info = await fetch(info_url + "/" + randomPlayerID);

    let player_stats_json = await player_stats.json();
    let player_info_json = await player_info.json();
    while (
      player_stats_json.data[0]["min"].split(":")[0] < 20 ||
      player_stats_json.data[0]["min"] === undefined
    ) {
      randomPlayerID = Math.floor(Math.random() * 493) + 1;
      player_stats = await fetch(stats_url + "&player_ids[]=" + randomPlayerID);
      player_info = await fetch(info_url + "/" + randomPlayerID);

      player_stats_json = await player_stats.json();
      player_info_json = await player_info.json();
    }
    this.setState({
      loading: false,
      player_stats: player_stats_json.data[0],
      player_info: player_info_json,
    });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        {this.state.loading || !this.state.player_info ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div>{this.state.player_stats.pts}</div>
            <div>{this.state.player_stats.reb}</div>
            <div>{this.state.player_stats.ast}</div>
            <div>{this.state.player_stats.fg_pct}</div>
            <div>{this.state.player_stats.turnover}</div>
            <div>{this.state.player_stats.blk}</div>
            <div>{this.state.player_stats.stl}</div>
            <div>{this.state.player_stats.fg3m}</div>
            <div>{this.state.player_stats.fg3_pct}</div>
            <div>{this.state.player_info.height_feet}'{this.state.player_info.height_inches}"</div>
            <div>{this.state.player_info.weight_pounds}</div>
            <div>{this.state.player_info.position}</div>
          </div>
        )}
      </div>
    );
  }
}
export default renderPlayer;
