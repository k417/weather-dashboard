import React, { Component } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';

interface CurrentWeatherProps {
  currCityId: string
}

class CurrentWeather extends Component<CurrentWeatherProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      weather: {},
    };
  }

  componentDidMount() {
    let currCityId: string = this.props.currCityId;

    fetch("https://bh-weather-data.s3.amazonaws.com/current/" + currCityId + ".json", {})
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            weather: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    const { error, isLoaded, weather } = this.state;

    if (error) {
      return (<div>Error: {error.message}</div>)
    }
    else if (!isLoaded) {
      return (<div> loading . . . </div>)
    } else {
    return(
      <Grid>
        <Paper> Current Weather </Paper>
        <Paper> Temp: {weather.temperature}&#8451; </Paper >
        <Paper> Humidity: {weather.humidity} </Paper>
        <Paper> Pressure: {weather.pressure} </Paper>
        <Paper> Dewpoint: {weather.dewpoint} </Paper>
        <Paper> Wind Direction: {weather.winddirection} </Paper>
        <Paper> Windspeed: {weather.windspeed} </Paper>
      </Grid>
    )
  }
}

}

export default CurrentWeather;
