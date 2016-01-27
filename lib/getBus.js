var City = require('./cityInfo.js');
var fs = require('fs');

var getBusData = function(){
  var data = fs.readFileSync('./busRoutes.txt', 'utf-8').split('\r\n');
  data = data.map(function(busInfo){
    busInfo = busInfo.split(':');
    var bus = {};
    bus.busNo = busInfo[0];
    bus.stations = busInfo[1].split(',');
    return bus;
  });
  return data;
};


var main = function(){
  var bangalore = new City();
  var busData = getBusData();
  busData.forEach(function(bus){
    bangalore.addBus(bus.busNo);
    bus.stations.forEach(function(station){
      bangalore.addStation(station);
      bangalore.addStationToBus(bus.busNo, station);
    });
  });
  //==============================================================================//
  
  console.log(bangalore); 
  // console.log('Buses Going From ATTUR are :', bangalore.getAllBusesGoingFrom('ATTUR'));
  // console.log('Buses Going From KEMPEGOWDA BUS STAND are :', bangalore.getAllBusesGoingFrom('KEMPEGOWDA BUS STAND'));

  console.log('Buses Going From KORAMANGALA to KEMEGOWDA BUS STAND are :',bangalore.getAlternateBus('KAKOLU', 'JP NGR. 6TH PHASE'));
  // console.log('Buses Going From KORAMANGALA to SHIVAJINAGAR BUS STAND are :',bangalore.getBus('KORAMANGALA', 'SHIVAJINAGAR BUS STAND'));
  // console.log('Buses Going From ATTUR to KEMPEGOWDA BUS STAND are :',bangalore.getBus('ATTUR', 'KEMPEGOWDA BUS STAND'));
  // console.log('The route of 171 bus is', bangalore.getRoute(171));

  // console.log('Buses Going From KORAMANGALA to KEMEGOWDA BUS STAND are :',bangalore.getAlternateBus('KORAMANGALA', 'KEMPEGOWDA BUS STAND'));
  console.log(bangalore.getHubs(10));
};

main();
