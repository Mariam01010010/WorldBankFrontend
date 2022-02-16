import React from "react";
import Graph from "./Graph";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      compareData: this.props.compareData,
      comparison: this.props.compareData.length > 0,
    };
  }

  sortIncomingData = (data) => {
    let set = -1;
    let sortedData = [];
    let checkYear = "";
    data.forEach((element) => {
      if (checkYear !== element.indicatorname) {
        set++;
        sortedData.push([]);
      }

      sortedData[set].push(element);
      checkYear = element.indicatorname;
    });

    sortedData = sortedData.map((set) => {
      return set.sort((a, b) => (a.year < b.year ? -1 : 1));
    });

    return sortedData;
  };

  renderLineChart = (data) => {
    if (data.length > 2) {
      let altData = data.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      return <Graph data={altData} />;
    } else if (data.length === 1) {
      return (
        <h3>
          {data[0].indicatorname} for {data[0].countryname} was{" "}
          {Number(data[0].value).toLocaleString()} in {data[0].year}
        </h3>
      );
    }
  };

  renderComparison = (data, compareData) => {
    if (data.length > 2) {
      let altData = data.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      let altCompareData = compareData.map((item) => {
        item.value = Number(item.value);
        return item;
      });
      return <Graph data={altData} compareData={altCompareData} />;
    } else if (data.length === 1) {
      return (
        <div>
          <h3>
            {data[0].indicatorname} for {data[0].countryname} was{" "}
            {Number(data[0].value).toLocaleString()} in {data[0].year}
          </h3>
          <h3>
            {compareData[0].indicatorname} for {compareData[0].countryname} was{" "}
            {Number(compareData[0].value).toLocaleString()} in{" "}
            {compareData[0].year}
          </h3>
        </div>
      );
    }
  };

  renderIncomingData = () => {
    const { data, compareData, comparison } = this.state;
    const sortedData = this.sortIncomingData(data);
    if (comparison) {
      const sortedCompareData = this.sortIncomingData(compareData);
      return sortedData.map((set, i) => {
        return (
          <div key={i} className="rendered-data">
            {this.renderComparison(set, sortedCompareData[i])}
          </div>
        );
      });
    } else {
      return sortedData.map((set, i) => {
        return (
          <div key={i} className="rendered-data">
            {this.renderLineChart(set)}
          </div>
        );
      });
    }
  };

  render() {
    const { data, compareData, comparison } = this.state;
    return (
      <main>
        <header className="main-header">
          <div className="header-buttons">
            <div className="header-search-button">
              <Link to="/home">
                <Button variant="primary" onClick={() => this.props.setData()}>
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <h1 className="results-title">
          {comparison
            ? `${data[0].countryname} Vs. ${compareData[0].countryname}`
            : data[0].countryname}
        </h1>
        <div className="results-content">{this.renderIncomingData()}</div>
      </main>
    );
  }
}

export default Results;
