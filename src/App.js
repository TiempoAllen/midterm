import React, { useState } from "react";
import { Box, Collapse } from "@mui/material";
import routes from "./routes";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleIsVisible = () => {
    setIsVisible(true);
  };

  const countPlacesOccurrences = (selectedRoutes) => {
    const placeCount = {};
    for (const route of selectedRoutes) {
      if (routes[route]) {
        for (const place of routes[route]) {
          placeCount[place] = (placeCount[place] || 0) + 1;
        }
      }
    }
    return placeCount;
  };

  const findCommonPlaces = (placeCount) => {
    const commonPlaces = [];
    for (const place in placeCount) {
      if (placeCount[place] > 1) {
        commonPlaces.push(place);
      }
    }
    return commonPlaces;
  };

  const getColoredPlace = (place, commonPlaces) => {
    const isCommon = commonPlaces.includes(place);
    const textColor = isCommon
      ? commonPlaces[0] === place
        ? "red"
        : "blue"
      : "black";
    return <span style={{ color: textColor }}>{place}</span>;
  };

  const handleShowRoute = () => {
    const inputPattern = /^\d{2}[A-Z](,\d{2}[A-Z])*$/;

    if (!inputPattern.test(inputValue)) {
      setOutput("Invalid input format. Please use the correct pattern.");
      return;
    }
    const selectedRoutes = inputValue.split(",").map((code) => code.trim());
    let result = [];

    const placeCount = countPlacesOccurrences(selectedRoutes);
    const commonPlaces = findCommonPlaces(placeCount);

    for (const code of selectedRoutes) {
      if (!routes[code]) {
        result.push(<div key={code}>Jeepney Code not found</div>);
      } else {
        const places = routes[code].map((place, index) => {
          return (
            <span key={index}>
              {index > 0 ? " <-> " : ""}
              {getColoredPlace(place, commonPlaces)}
            </span>
          );
        });

        result.push(
          <div key={code} className="route-box">
            <div className="route-title">{code}</div>
            <div className="route-places">{places}</div>
          </div>
        );
      }
    }
    setOutput(result);
    handleIsVisible();
  };

  return (
    <div className="app">
      <h1>Jeepney Codes</h1>
      <div className="input-group mb-3">
        <input
          style={{ border: "solid 1px gray" }}
          type="text"
          className="form-control"
          placeholder="Enter jeepney code"
          aria-label="Enter jeepney code"
          aria-describedby="button-addon2"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button
          className="btn btn-primary"
          type="button"
          id="button-addon2"
          onClick={handleShowRoute}
        >
          Search
        </button>
      </div>
      <Box
        sx={{
          backgroundColor: "white",
          border: "solid 1px gray",
          borderRadius: "5px",
          height: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          color: "black",
          padding: "10px",
        }}
      >
        {output}
      </Box>

      {/* <Collapse in={isVisible}>
        <Box
          sx={{
            backgroundColor: "white",
            border: "solid 1px gray",
            borderRadius: "5px",
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            color: "black",
            padding: "10px",
          }}
        >
          {output}
        </Box>
      </Collapse> */}
    </div>
  );
};

export default App;
