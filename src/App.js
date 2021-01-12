import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/form";
import moment from "moment";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  //search country
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"), //getting info from api
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries"), //getting country info
      ])

      .then((responseArr) => {
        //if successful
        setLatest(responseArr[0].data); //set to latest
        setResults(responseArr[1].data); //using the country api
      })

      .catch((err) => {
        console.log(err); //if not then display the error
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString(); //convert to a string

  //filtering out country
  const filterCountries = results.filter((item) => {
    return item.country.toLowerCase().includes(searchCountries.toLowerCase());
  });

  const countries = filterCountries.map((data, i) => {
    //looping
    return (
      <Card
        key={i}
        bg="secondary"
        text="white"
        className="text-center"
        style={{ margin: "22px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>Deaths: {data.deaths}</Card.Text>
          <Card.Text>Recovered: {data.recovered}</Card.Text>
          {/* <Card.Text>Today's cases: {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths: {data.todayDeaths}</Card.Text> */}
          <Card.Text>Active: {data.active}</Card.Text>
          <Card.Text>Population: {data.population}</Card.Text>
          <Card.Text>Critical: {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [
    {
      columns: 3,
      query: "min-width:500px",
    },
    {
      columns: 3,
      query: "min-width: 900px;",
    },
  ];

  return (
    <div style={{ background: "#ccdce9" }}>
      <br />
      <h2 style={{ textAlign: "center" }}> Covid-19 Live Stats</h2>
      <br />
      <CardDeck>
        <Card
          bg="dark"
          text="white"
          className="text-center"
          style={{ margin: "30px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {moment(lastUpdated).calendar()}</small>
          </Card.Footer>
        </Card>

        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "30px" }}
        >
          <Card.Body>
            <Card.Title>Death</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {moment(lastUpdated).calendar()}</small>
          </Card.Footer>
        </Card>

        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "30px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {moment(lastUpdated).calendar()}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br></br>
      {/* SEARCH BAR */}
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
