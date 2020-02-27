import React from "react";
//import {getOrg} from './api/organizations';
import {getTimeline} from './../ff.js';

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


class Basiccolumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline:[],
    }
  };

  componentDidMount() {
    // const timeline = await getTimeline(); // await would wait until the getTimeline() finishes
    // this.setState({
    //   timeline: timeline
    // });
    this.fetchData();
  };


  fetchData = async () => {
    const tl = await getTimeline();
    this.setState({
      timeline:tl
    })
  };


  render() {
    const {timeline} = this.state;
    const result = timeline.map(org => {
      return {id: timeline.location, number: timeline.length};
    });
    const cols = {
      location: {
        tickInterval: 20
      }
    };
    return (
      <div>
        <Chart height={400} data={result} scale={cols} forceFit>
          <Axis name="location" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="id*number" />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;
