import React, { Component } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import CurrentWeather from "./CurrentWeather";
import HistoricalData from "./HistoricalData";

interface CitySectionProps {
  currCityId: string,
  currCityName: string,
}

class CitySection extends Component<CitySectionProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      historicalData: [],
    };
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid>
            <Paper>
              {this.props.currCityName}
            </Paper>
          </Grid>
          <CurrentWeather currCityId={this.props.currCityId} />
        </Grid>
        <Grid item xs={6}>
          <HistoricalData currCityId={this.props.currCityId} />
        </Grid>
      </Grid>
    )
  }
}

export default CitySection;
