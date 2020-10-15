import React, { Component } from "react";
import '../../node_modules/bulma';

export default class renderPlayer extends Component {
  state = {
    loading: true,
    player_stats: null,
    player_info: null,
    form_value: "",
    score: 0
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
      player_stats_json.data[0] === undefined || player_stats_json.data[0]["min"] === undefined || player_stats_json.data[0]["min"].split(":")[0] < 20 
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
      player_info: player_info_json
    });
    console.log(this.state)
  }

  checkInput = e => {
    console.log(this.state.player_info)
    this.setState({
      form_value: e.target.value
    })
      if (e.target.value.toLowerCase() === (this.state.player_info.first_name + " " + this.state.player_info.last_name).toLowerCase()) {
        let addScore = this.state.score + 1
        this.setState({
          form_value: "", 
          score: addScore
        })
        this.componentDidMount()
      }
  }

  render() {
    return (
    <div className="content">
      <div id="show-info">
        <form id="guess-player">
          <input id="player-input" type="text" onChange = {this.checkInput} value={this.state.form_value}/> 
        </form>
        <button className= "button is-light" onClick = {this.componentDidMount.bind(this)}>Skip</button>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-4" id="stats">
              {this.state.loading || !this.state.player_info ? (
                <p>Loading...</p>
              ) : (
              <div className="columns is-multiline">
                <div className="column is-one-fifth">
                  <div className="h3">PTS</div><div className="stat">{this.state.player_stats.pts}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">REB</div> <div className="stat">{this.state.player_stats.reb}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">AST</div> <div className="stat">{this.state.player_stats.ast}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">FG%</div> <div className="stat">{this.state.player_stats.fg_pct}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">FT%</div> <div className="stat">{this.state.player_stats.ft_pct}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">TO</div> <div className="stat">{this.state.player_stats.turnover}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">BLK</div> <div className="stat">{this.state.player_stats.blk}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">STL</div> <div className="stat">{this.state.player_stats.stl}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">3PT</div> <div className="stat">{this.state.player_stats.fg3m}</div>
                </div>
                <div className="column is-one-fifth">
                  <div className="h3">3P%</div> <div className="stat">{this.state.player_stats.fg3_pct}</div>
                </div>
                <div className="column is-half">
                  <div className="h3 inline">
                    HEIGHT</div> <div className="stat inline">{this.state.player_info.height_feet}'
                    {this.state.player_info.height_inches}"
                  </div>
                </div>
                <div className="column is-half">
                  <div className="h3 inline">WEIGHT (lbs)</div><div className="stat inline">{this.state.player_info.weight_pounds}</div>
                </div>
                <div className="column is-half">
                  <div className="h3 inline">POSITION</div><div className="stat inline">{this.state.player_info.position}</div>
                </div>
                <div className="column is-half">
                  <div className="h3 inline">CURRENT TEAM</div><div className="stat inline">{this.state.player_info.team.name}</div>
                </div>
              </div>
            )}
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <div className="h4">Score:</div>
              <div className="num"> {this.state.score} </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
