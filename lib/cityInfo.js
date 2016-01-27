var City = function(){
  this.stations = {};
  this.buses = {};
};

City.prototype = {
  addStation : function(station){
    this.stations[station] = this.stations[station] ? this.stations[station] : [];
  },

  addBus : function(busNo){
    this.buses[busNo] = [];
  },
  
  addStationToBus : function(busNo, station){
    this.buses[busNo].push(station);
    this.stations[station].push(busNo);
  },

  getAllBusesGoingFrom : function(station){
    return this.stations[station];
  },

  getBus : function(source, destination){
    var busesFrom = this.getAllBusesGoingFrom(source);
    var busesTo = this.getAllBusesGoingFrom(destination);
    return busesFrom.filter(function(busNo){
      return (busesTo.indexOf(busNo) >= 0);
    });
  },

  getRoute : function(busNo){
    return this.buses[busNo]; 
  },

  getHubs : function(count){
    var allStations = Object.keys(this.stations);
    var self = this;
    var hubs = allStations.sort(function(stn1, stn2){ return self.stations[stn1].length - self.stations[stn2].length;});
    return hubs.slice(hubs.length - count);
  },

  getAlternateBus : function(source, destination){
    // var routes = [];
    // var self = this; 
    // self.getAllBusesGoingFrom(source).forEach(function(s_bus){
      // var s_stations = self.getRoute(s_bus);
      // self.getAllBusesGoingFrom(destination).forEach(function(d_bus){
        // self.getRoute(d_bus).forEach(function(stop){
          // if(s_stations.indexOf(stop) >= 0){
            // var r = {};
            // r[source] = s_bus;
            // r[stop] = d_bus;
            // routes.push(r);
          // }
        // })
      // });
    // });
    // return routes;
    
    var self = this;
    var hubs = self.getHubs(15);
    var routes = [];
    for(var i = 0; i < hubs.length; i++){
      var allBusesGoingFromSourceToHub = self.getBus(source, hubs[i]);
      var allBusesGoingFromHubToDestination = self.getBus(hubs[i], destination);
      if((allBusesGoingFromSourceToHub.length > 0) &&  (allBusesGoingFromHubToDestination.length > 0)){
        var r = {};
        r[source] = allBusesGoingFromSourceToHub;
        r[hubs[i]] = allBusesGoingFromHubToDestination;
        routes.push(r);
      }
    };
    return routes;
  }
};

module.exports = City;
