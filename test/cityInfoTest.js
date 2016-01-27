var City = require('../cityInfo.js');
var should = require('should');

describe('Bangalore', function(){
  describe('addStation', function(){
    it('should add the given station into the stations group', function(){
      var bangalore = new City();
      bangalore.should.have.property('stations').which.is.an.Object();
      should.deepEqual(bangalore.stations, {});
      bangalore.addStation('Koramangala');
      should.deepEqual(bangalore.stations, { 'Koramangala' : []});
    });
  });

  describe('addBus', function(){
    it('should add the given bus no into the buses group', function(){
      var bangalore = new City();
      bangalore.should.have.property('buses').which.is.an.Object();
      should.deepEqual(bangalore.buses, {});
      bangalore.addBus(1);
      should.deepEqual(bangalore.buses, { '1' : []});
    });
  });

  describe('addStationToBus', function(){
    it('should add the given station to the specified bus no', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addStation('Koramangala');
      bangalore.addStationToBus(1, 'Koramangala');
      should.deepEqual(bangalore.buses, { '1' : ['Koramangala']});
      should.deepEqual(bangalore.stations, { 'Koramangala' : [1]});
    });
  });

  describe('getAllBusesGoingFrom', function(){
    it('should give the list of all the buses going from a specific station', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addBus('2');
      bangalore.addBus('3');
      bangalore.addStation('Koramangala');
      bangalore.addStationToBus(1, 'Koramangala');
      bangalore.addStationToBus(2, 'Koramangala');
      bangalore.addStationToBus(3, 'Koramangala');
      should.deepEqual(bangalore.getAllBusesGoingFrom('Koramangala'), [1, 2, 3]);
    });

    it('should give an empty list if no bus is going from the given station', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addBus('2');
      bangalore.addBus('3');
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStationToBus(1, 'Attur');
      should.deepEqual(bangalore.getAllBusesGoingFrom('Koramangala'), []);
    });
  });

  describe('getBus', function(){
    it('should give the list of buses going from source to destination', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStationToBus(1, 'Attur');
      bangalore.addStationToBus(1, 'Koramangala');
      should.deepEqual(bangalore.getBus('Attur', 'Koramangala'), [1]);
      should.deepEqual(bangalore.getBus('Koramangala', 'Attur'), [1]);
    });

    it('should give an empty list if there is no bus avilable from source to destination', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      should.deepEqual(bangalore.getBus('Attur', 'Koramangala'), []);
      should.deepEqual(bangalore.getBus('Koramangala', 'Attur'), []);
    });

    it('should give the list of all the buses going from source to destination', function(){
       var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addBus('2');
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStationToBus(1, 'Attur');
      bangalore.addStationToBus(1, 'Koramangala');
      bangalore.addStationToBus(2, 'Attur');
      bangalore.addStationToBus(2, 'Koramangala');
      should.deepEqual(bangalore.getBus('Attur', 'Koramangala'), [1, 2]);
      should.deepEqual(bangalore.getBus('Koramangala', 'Attur'), [1, 2]);
    });
  });

  describe('getRoute', function(){
    it('should give the route of the bus from source to destination including all the inbetween stations', function(){
      var bangalore = new City();
      bangalore.addBus('1');
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStation('Hogenakkal');
      bangalore.addStation('Gaganchukki Falls');
      bangalore.addStation('Majestic');

      bangalore.addStationToBus(1, 'Koramangala');
      bangalore.addStationToBus(1, 'Attur');
      bangalore.addStationToBus(1, 'Hogenakkal');
      bangalore.addStationToBus(1, 'Gaganchukki Falls');
      bangalore.addStationToBus(1, 'Majestic');
  
      should.deepEqual(bangalore.getRoute(1), ['Koramangala', 'Attur', 'Hogenakkal', 'Gaganchukki Falls', 'Majestic']);
    });
  });

  describe('getAlternateBus', function(){
    it('should give the alternate buses going from a source to destination', function(){
      var bangalore = new City();
      bangalore.addBus(1);
      bangalore.addBus(2);
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStation('Hogenakkal');
      bangalore.addStationToBus(1, 'Koramangala');
      bangalore.addStationToBus(1, 'Attur');
      bangalore.addStationToBus(2, 'Attur');
      bangalore.addStationToBus(2, 'Hogenakkal');

      should.deepEqual(bangalore.getAlternateBus('Koramangala', 'Hogenakkal'), [{'Koramangala' : [1], 'Attur' : [2]}]);
    });
  });

  describe('getHubs', function(){
    it('should give all the stations from which maximum buses are going thorugh it', function(){
      var bangalore = new City();
      bangalore.addBus(1);
      bangalore.addBus(2);
      bangalore.addBus(3);
      bangalore.addBus(4);
      bangalore.addBus(5);
      bangalore.addBus(6);
      bangalore.addBus(7);
      bangalore.addStation('Koramangala');
      bangalore.addStation('Attur');
      bangalore.addStation('Hogenakkal');
      bangalore.addStationToBus(1, 'Koramangala');
      bangalore.addStationToBus(1, 'Attur');
      bangalore.addStationToBus(2, 'Attur');
      bangalore.addStationToBus(2, 'Hogenakkal');
      bangalore.addStationToBus(3, 'Hogenakkal');
      bangalore.addStationToBus(4, 'Hogenakkal');
      bangalore.addStationToBus(6, 'Hogenakkal');
      bangalore.addStationToBus(7, 'Hogenakkal');
      bangalore.addStationToBus(5, 'Koramangala');
      bangalore.addStationToBus(6, 'Koramangala');
      bangalore.addStationToBus(7, 'Koramangala');

      var expected = ['Hogenakkal', 'Koramangala'];
      bangalore.getHubs(2).should.containDeep(expected);
    });
  
  });
});
