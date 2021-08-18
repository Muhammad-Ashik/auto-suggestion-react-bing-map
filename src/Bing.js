import { loadBingApi, Microsoft } from "./BingMapLoader";

import React from "react";

class Bing extends React.Component {
  componentDidMount() {
    //your bing api key
    const key = "";
    loadBingApi(key).then(() => {
      this.initMap();
    });
  }
  initMap = () => {
    var map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
      /* No need to set credentials if already passed in URL */
      center: new Microsoft.Maps.Location(47.606209, -122.332071),
      zoom: 12,
    });
    Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", function () {
      var options = {
        maxResults: 7,
        map: map,
      };
      var manager = new Microsoft.Maps.AutosuggestManager(options);
      manager.attachAutosuggest(
        "#searchBox",
        "#searchBoxContainer",
        selectedSuggestion
      );
    });
    function selectedSuggestion(suggestionResult) {
      map.entities.clear();
      map.setView({ bounds: suggestionResult.bestView });
      var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
      map.entities.push(pushpin);
      document.getElementById("printoutPanel").innerHTML =
        "Suggestion: " +
        suggestionResult.formattedSuggestion +
        "<br> Lat: " +
        suggestionResult.location.latitude +
        "<br> Lon: " +
        suggestionResult.location.longitude;
    }
    return map;
  };

  render() {
    return (
      <div>
        <div id="printoutPanel"></div>
        <div id="searchBoxContainer">
          <input type="text" id="searchBox" />
        </div>

        <div id="myMap" style={{ width: "100vw", height: "100vh" }}></div>
      </div>
    );
  }
}

export default Bing;
