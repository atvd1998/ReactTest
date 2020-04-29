import React, { Component } from 'react';
import './App.css';
const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gaTau: [],
      chuyenDi: [],
    };
    this.getChuyenDi = this.getChuyenDi.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://k.vnticketonline.vn/api/GTGV/LoadDmGa'
      );
      console.log(response.data);
      await this.setState((prevState) => ({
        gaTau: [...prevState.gaTau, ...response.data],
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async getChuyenDi(gaDi, gaDen) {
    try {
      const response = await axios.get(
        'https://k.vnticketonline.vn/api/GTGV/LoadDmTau?maGaDen=' +
          gaDen +
          '&maGaDi=' +
          gaDi +
          '&ngayDi=2020-04-29'
      );

      await this.setState((prevState) => ({
        chuyenDi: [...prevState.chuyenDi, ...response.data],
      }));
      console.log(response.data);
      console.log(this.state.chuyenDi);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.state.gaTau.map((gaden) => {
              this.getChuyenDi('DNA', gaden.MaGa);
            });
          }}
        >
          Lấy dữ liệu
        </button>
        <ul>
          {this.state.gaTau.map((ga) => {
            return <li key={ga.Id}>{ga.TenGa}</li>;
          })}
        </ul>
      </div>
    );
  }
}
