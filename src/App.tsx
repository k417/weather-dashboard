import React, { Component } from 'react';
import './App.css';
import {
  Button,
  Grid,
  GridList,
  GridListTile,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Checkbox,
  Modal
} from '@material-ui/core';

import * as _ from "underscore";

import CitySection from "./components/CitySection";


class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);


    this.state = {
      error: null,
      isLoaded: false,
      stations: {},
      modalIsOpen: false,
    };
  }
  handleOpen = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  handleChange = (event: any) => {
    let temp = this.state.stations;
    temp[event.target.name].isChecked = event.target.checked;
    this.setState({ stations: temp });
  }

  componentDidMount() {
    fetch("https://bh-weather-data.s3.amazonaws.com/stations.json", {
    })
      .then(res => res.json())
      .then(
        (result) => {
          var resultArray = new Array<{}>();
          for (let city of result) {


            resultArray.push({ id: city.id, name: city.name, isChecked: false })

          }

          const initVal = {};
          const stations = resultArray.reduce((obj: any, item: any) => {
            return {
              ...obj,
              [item['id']]: item,
            };
          }, initVal);


          this.setState({
            isLoaded: true,
            stations: stations,
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
    const { error, isLoaded, stations } = this.state;

    if (error) {
      return (<div>Error: {error.message}</div>)
    }
    else if (!isLoaded) {
      return (<div> loading . . . </div>)
    } else {
      return (
        <Grid container
          justify="center"
          alignItems="stretch">

          <Grid container
            justify="space-around"
            alignItems="stretch">

            <div>Weather Report 2000</div>
            <Button onClick={this.handleOpen}>+ Add City</Button>

            <Modal
              open={this.state.modalIsOpen}
              onClose={this.handleClose}
            >
              <Paper>
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Select cities to display</FormLabel>
                  <FormGroup>
                    {_.map(stations, (station: any) => {
                      return <FormControlLabel
                        control={<Checkbox checked={stations[station.id].isChecked} onChange={this.handleChange} name={station.id} />}
                        label={station.name}
                      />
                    })}
                  </FormGroup>
                  <FormHelperText>Uncheck a city to remove it</FormHelperText>
                </FormControl>
              </Paper>
            </Modal>
          </Grid>
          <GridList cols={1} >
            {_.map(stations, (station: any) => (
              <GridListTile key={station.id} hidden={!station.isChecked} >
                <div>
                  <CitySection currCityId={station.id} currCityName={station.name} />
                </div>
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      )
    }
  }
}

export default App;
