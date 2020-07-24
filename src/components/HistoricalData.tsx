import React, { Component } from 'react';
import {
Chart,
} from "react-google-charts";

interface HistoricalDataProps {
  currCityId: string
}

class HistoricalData extends Component<HistoricalDataProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      historicalData: [],
    };
  }

  componentDidMount() {
    let currCityId: string = this.props.currCityId;

    fetch("https://bh-weather-data.s3.amazonaws.com/historical/" + currCityId + ".json", {})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            historicalData: result.data
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

  render() {
    const { error, isLoaded, historicalData } = this.state;

    if (error) {
      return (<div>Error: {error.message}</div>)
    }
    else if (!isLoaded) {
      return (<div> loading . . . </div>)
    } else {

      var historicalDataForChart = new Array(['x', 'temperature', 'dewpoint', 'windspeed']);

      for (let datum of historicalData) {

        historicalDataForChart.push([datum.time, datum.temperature, datum.dewpoint, datum.windspeed])

      }

      return (
          <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={historicalDataForChart}
            options={{
              hAxis: {
                title: 'Time',
              },
              vAxis: {
                title: 'Value',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
      )
    }
  }
}

export default HistoricalData;
