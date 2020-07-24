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
      stations: [],
      cities: {},
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
    let tempcities = this.state.cities;
    tempcities[event.target.name].isChecked = event.target.checked;
    this.setState({ cities: tempcities });
  }

  componentDidMount() {
    fetch("https://bh-weather-data.s3.amazonaws.com/stations.json", {
    })
      .then(res => res.json())
      .then(
        (result) => {
          var stations = new Array<{}>();
          for (let city of result) {


            stations.push({ id: city.id, name: city.name, isChecked: false })

          }
          console.log(stations)

          const initVal = {};
          const cities = stations.reduce((obj: any, item: any) => {
            return {
              ...obj,
              [item['id']]: item,
            };
          }, initVal);


          this.setState({
            isLoaded: true,
            stations: stations,
            cities: cities,
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
    const { error, isLoaded, stations, cities } = this.state;

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
                    {stations.map((station: any) => (
                      <FormControlLabel
                        control={<Checkbox checked={cities[station.id].isChecked} onChange={this.handleChange} name={station.id} />}
                        label={station.name}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>Uncheck a city to remove it</FormHelperText>
                </FormControl>
              </Paper>
            </Modal>
          </Grid>
          <GridList cols={1} >
            {stations.map((station: any) => (
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
