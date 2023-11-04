$('document').ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('.places').append('<article> <div class="title_box">' + '<h2>' + data[i].name + '</h2>' + '<div class="price_by_night">' + data[i].price_by_night + '</div>' + '</div>' + '<div class="information">' + ' <div class="max_guest">' + data[i].max_guest + '</div>' + '<div class="number_rooms">' + data[i].number_rooms + '</div>' + '<div class="number_bathrooms">' + data[i].number_bathrooms + '</div>' + '</div' + '<div class="description">' + data[i].description + '</div>' + '/article');
      }
    }
  });
});
