var generateDirectBusTable = function(source, destination, buses){
  if(buses.length <= 0)
    return 'No Direct Buses Available between '+source+' and '+destination+'..!!';
  var table = '';
  table += '<table id="directBusTable" class="directCollection">';
  table += ['<tr>',
            '<td> Source </td>', '<td> Destination </td>', '<td> Buses </td>',
            '<td> _Source </td>', '<td> _Destination </td>', '<td> _Buses </td>',
            '</tr>'].join('').replace('_Source', source).replace('_Destination', destination).replace('_Buses', buses.join(', '));
  table += '</table>';
  return table;
};

var generateAlternateBusTable = function(source, destination, buses){
  var table = '';
  table += '<table id="alternateBusTable">';
  table += ['<tr>',
            '<td> Source </td>', '<td> Junction </td>', '<td> Buses </td>','<td> Junction </td>', '<td> Destination </td>', '<td> Buses </td>',
            buses.map(function(route){ 
              var stations = Object.keys(route);
              return '<tr>'+'<td>'+stations[0]+'</td>'+'<td>'+stations[1]+'</td>'+'<td>'+route[stations[0]]+'</td>'+'<td>'+stations[1]+'</td>'+'<td>'+destination+'</td>'+'<td>'+route[stations[1]]+'</td>'+'</tr>'
            }).join(''),
            '</tr>'].join('');
  table += '</table>';
  return table;
};


var getBuses = function(){
  var data_to_send = { source : $('#source').val(), destination : $('#destination').val()};
  var callBack = function(data){
    console.log(data);
    $('#directBuses').html(generateDirectBusTable(data_to_send.source, data_to_send.destination, data.direct));
    $('#alternateBuses').html(generateAlternateBusTable(data_to_send.source, data_to_send.destination, data.routes));
  };
  $.get('getAllBuses', data_to_send , callBack);
};

var getAllStations = function(){
  var callBack = function(data){
    data = data.sort();
    var s = $('#source');
    var d = $('#destination');
    data.forEach(function(stn){
      $('<option />', {value: stn, text: stn}).appendTo(s);
      $('<option />', {value: stn, text: stn}).appendTo(d);
    });
  };
  $.get('all_stations', callBack);
}

$(document).ready(function(){
  getAllStations();
  $('button').click(getBuses);
});
