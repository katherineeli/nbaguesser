import React, { Component } from "react";
import "../../node_modules/bulma";
import "../styles/styles.css";
import ReactAutoSuggestDropdown from "react-autosuggest-dropdown-menu";
import players from "./players.js";
import firebase from "./fireBase";

const db = firebase.firestore();

export default class renderPlayer extends Component {
  constructor() {
    super();
    this.chooseDropdownItem = this.chooseDropdownItem.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.state = {
      loading: true,
      player_stats: null,
      player_info: null,
      form_value: "",
      score: 0,
      timeout: false,
      minutes: 3,
      seconds: 0,
      chosenValue: "",
      searchValue: "",
      showDropdown: false,
      list: players,
      disableSkip: false
    };
  }

  setTimeout() {
    this.setState({
      timeout: true,
    });
  }

  async componentDidMount() {
    this.newPlayer();
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  async newPlayer() {
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
      player_stats_json.data[0] === undefined ||
      player_stats_json.data[0]["min"] === undefined ||
      player_stats_json.data[0]["min"].split(":")[0] < 20
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
 //   console.log(this.state);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  componentDidUpdate() {
    if (
      !this.state.timeout &&
      this.state.minutes === 0 &&
      this.state.seconds === 0
    ) {
      this.setState({
        timeout: true,
      });

      if (firebase.auth().currentUser) {
        db.collection("scores")
          .add({
            email: firebase.auth().currentUser.email,
            score: this.state.score,
          })
          .then(function () {
     //       console.log("Document successfully written!");
          })
          .catch(function (error) {
     //       console.error("Error writing document: ", error);
          });
      }
    }
  }

  chooseDropdownItem(e, valueSelected, valueObject) {
    e.preventDefault();
    this.setState({ showDropdown: false, searchValue: valueSelected });
    this.checkInput(valueObject);
  }

  updateSearchValue(e) {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
    this.checkInput(e.target.value);
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  clearSearchValue() {
    this.setState({
      searchValue: "",
    });
  }

  checkInput = (value) => {
    if (value.valueToSearch) {
      value = value.valueToSearch;
    }

    this.setState({
      form_value: value,
    });
    if (
      value.toLowerCase().split(".").join("") ===
      (
        this.state.player_info.first_name +
        " " +
        this.state.player_info.last_name
      )
        .toLowerCase()
        .split(".")
        .join("")
    ) {
      let addScore = this.state.score + 1;
      this.setState({
        form_value: "",
        score: addScore,
      });
      this.newPlayer();
      this.clearSearch();
    }
  };

  clearSearch = () => {
    this.setState({
      searchValue: "",
    });
  };

  skip = () => {
    this.setState({
      disableSkip: true
    });

    setTimeout(() => this.setState({ disableSkip: false }), 2000);

    if (this.state.minutes == 0 & this.state.seconds <= 5){
      this.setState({
        minutes: 0,
        seconds: 0
      });
      return
    }
    this.newPlayer();
    let newSeconds = this.state.seconds - 4;
    if (newSeconds < 0) {
      this.setState(({ minutes}) => ({
        minutes: minutes - 1,
        seconds: 60 + newSeconds,
      }));
    } else {
      this.setState({
        seconds: newSeconds,
      });
    }
  };
  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { minutes, seconds } = this.state;
    // const me = this;
    if (!this.state.timeout) {
      return (
        <div className="content">
          <div className="inputButtons">
            <div className="autocomplete player-input">
              <ReactAutoSuggestDropdown
                list={this.state.list}
                showDropdown={this.showDropdown}
                displayDropdownMenu={this.state.showDropdown}
                chosenValue={this.state.chosenValue}
                chooseDropdownItem={this.chooseDropdownItem}
                updateSearchValue={this.updateSearchValue}
                searchValue={this.state.searchValue}
                highlightColour={"#ff9966"}
              />
            </div>
            <button className="button is-light" onClick={this.skip.bind(this)} disabled = {this.state.disableSkip}>
              Skip
            </button>
            <button className="button is-primary" onClick={this.refreshPage}>
              New Game
            </button>
          </div>
          <div id="show-info">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-4 is-vertical">
                <div className="tile is-child box " id="score">
                  <div className="h4">SCORE</div>
                  <div className="num"> {this.state.score} </div>
                </div>
                <div className="tile is-child box" id="timer">
                  <div className="h4">TIMER</div>
                  <div>
                    {minutes === 0 && seconds === 0 ? (
                      <div className="h4" style={{ color: "#17408B" }}>
                        Busted!
                      </div>
                    ) : (
                      <div className="num" style={{ color: "#17408B" }}>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box" id="stats">
                  {this.state.loading || !this.state.player_info ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="columns is-multiline">
                      <div className="column is-one-fifth">
                        <div className="h3">PTS</div>
                        <div className="stat">
                          {this.state.player_stats.pts}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">REB</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.reb}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">AST</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.ast}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">FG%</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.fg_pct}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">FT%</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.ft_pct}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">TO</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.turnover}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">BLK</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.blk}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">STL</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.stl}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">3PT</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.fg3m}
                        </div>
                      </div>
                      <div className="column is-one-fifth">
                        <div className="h3">3P%</div>{" "}
                        <div className="stat">
                          {this.state.player_stats.fg3_pct}
                        </div>
                      </div>
                      <div className="column is-half">
                        <div className="h3 inline">HEIGHT</div>{" "}
                        <div className="stat inline">
                          {this.state.player_info.height_feet}'
                          {this.state.player_info.height_inches}"
                        </div>
                      </div>
                      <div className="column is-half">
                        <div className="h3 inline">WEIGHT (lbs)</div>
                        <div className="stat inline">
                          {this.state.player_info.weight_pounds}
                        </div>
                      </div>
                      <div className="column is-half">
                        <div className="h3 inline">POSITION</div>
                        <div className="stat inline">
                          {this.state.player_info.position}
                        </div>
                      </div>
                      <div className="column is-half">
                        <div className="h3 inline">CURRENT TEAM</div>
                        <div className="stat inline">
                          {this.state.player_info.team.name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
//      console.log("timed out");
      return (
        <div className="content">
          <div className="h4" style={{ color: "#17408B" }}>
            Busted!
          </div>
          <div className="h4">YOUR FINAL SCORE IS:</div>
          <div className="num"> {this.state.score} </div>
          <div id="centerButton">
            {" "}
            <button
              className="button is-primary newGame"
              onClick={this.refreshPage}
            >
              Play Again
            </button>{" "}
          </div>
        </div>
      );
    }
  }
}
