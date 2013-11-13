$(document).ready(function() {
  // Initialize Backbone App here
  // set up model objects
  var app = new App({});
  var server_url = 'http://127.0.0.1:5000';                // Development
  // var server_url = 'http://little-wren.herokuapp.com';  // Production

  // build a view for the top level of the whole app
  var appView = new AppView({model: app});

  var getBuyValue = function() {
    $.get(server_url + '/buy-ticker', function(data) {
      // update market div
      data = data.toFixed(2);
      $('.live_data').addClass('hidden');
      $('.live_data_value').html('$'+data);
      $('.live_data').fadeIn('slow');
    });
  };

  var loadData = function() {
    // TODO: Pull Lowest Chart Time Increment and Earliest Time from Chart Buttons
    $.get(server_url + '/data', function(returnData){
      $('.loading').fadeOut('fast');

      // Create the chart
      $('.chart').highcharts('StockChart', {
        width: '70%',
        credits: {
          enabled: false
        },
        rangeSelector : {
          buttons: [{
            type: 'minute',
            count: 30,
            text: '30m'
          }, {
            type: 'hour',
            count: 1,
            text: '1hr'
          }, {
            type: 'hour',
            count: 3,
            text: '3hr'
          }, {
            type: 'hour',
            count: 12,
            text: '12hr'
          }, {
            type: 'day',
            count: 1,
            text: '1d'
          }, {
            type: 'day',
            count: 3,
            text: '3d'
          }, {
            type: 'day',
            count: 7,
            text: '7d'
          }, {
            type: 'day',
            count: 30,
            text: '30d'
          }],

          inputEnabled: false,

          selected: 3
        },

        series : [{
          name : 'MtGox Bid Price',
          data : returnData.mtgox,
          color: '#d35400',
          type : 'areaspline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
          fillColor : {
            linearGradient : {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops : [[0, '#e67e22'], [1, 'rgba(0,0,0,0)']]
            
          },
          yAxis: 0
        },{
          name : 'BitStamp Bid Price',
          color: '#16a085',
          data : returnData.bitstamp,
          visible: false,
          type : 'spline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 0
        },{
          name : 'BTC China Bid Price',
          color: '#555',
          data : returnData.btcchina,
          visible: false,
          type : 'spline',
          threshold : null,
          tooltip : {
            valueDecimals : 2
          },
          fillColor : {
            linearGradient : {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
          },
          yAxis: 0
        },{
          name : 'Twitter Sentiment (5min)',
          color: '#3498db',
          data : returnData.twitter.five_min,
          cursor: 'pointer',
          type : 'spline',
          point: {
            events: {
              click: function() {
                var timestamp = Math.floor(this.x / 1000);
                // send query to server for twitter data
                $.get(server_url + '/tweets', JSON.stringify(timestamp), function(data) {
                  // remove previous tweets
                    $('.popup ul li').remove();
                  // add data to popup
                  for(var key in data){
                    var timestamp = data[key].timestamp*1000;
                    var username = data[key].username;
                    var text = data[key].text;
                    var sentiment = data[key].sentiment;
                    $('.popup ul').append('<li> \
                                             <span class="username">' +
                                               username +
                                            '</span> \
                                               <span class="timestamp">' + ' ' + moment(timestamp).format('h:mm:ss A') + '</span><br /> \
                                             <section class="tweet">' +
                                              '<span class="text">' + text + '</span>' +
                                            '</section> \
                                             <aside class="sentiment">' + 
                                               sentiment + 
                                            '</aside> \
                                          </li>');
                  }
                  // show popup div
                  $('.popup').removeClass('hidden');
                  $('.transparent_layer').css('display', 'inline');
                  $(document).click(function() {
                    $('.popup ul').scrollTop(0);
                    $('.popup').addClass('hidden');
                    $('.transparent_layer').css('display', 'none');
                  });
                });
              }
            }
          },
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (10min)',
          color: '#2980b9',
          data : returnData.twitter.ten_min,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (30min)',
          color: '#2980b9',
          data : returnData.twitter.thirty_min,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (1hr)',
          color: '#2980b9',
          data : returnData.twitter.one_hour,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (3hr)',
          color: '#2980b9',
          data : returnData.twitter.three_hour,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (6hr)',
          color: '#2980b9',
          data : returnData.twitter.six_hour,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (12hr)',
          color: '#2980b9',
          data : returnData.twitter.twelve_hour,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (1day)',
          color: '#2980b9',
          data : returnData.twitter.one_day,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        },{
          name : 'Twitter Sentiment (3day)',
          color: '#2980b9',
          data : returnData.twitter.three_day,
          visible: false,
          type : 'spline',
          tooltip : {
            valueDecimals : 2
          },
          yAxis: 1
        }
        ],
        xAxis: {
          // ordinal: false
        },
        yAxis: [{
          labels: {
            format: '${value}',
            style: {
              'font-size': '1.5em'
            }
          },
          title: {
            text: 'Buy Value (USD)',
            style: {
              color: '#222',
              'font-size': '1.3em',
              'letter-spacing': '0.1em',
              'text-transform': 'uppercase'
            }
          }
        }, // Primary Axis
          {   // Secondary Axis
            opposite: true,
            labels: {
              style: {
                'font-size': '1.5em'
              }
            },
            title: {
              text: 'Sentiment',
              style: {
                color: '#222',
                'font-size': '1.3em',
                'letter-spacing': '0.1em',
                'text-transform': 'uppercase'
              }
            }
          }]
        });
    });
  };

  getBuyValue();  // update market ticker
  setInterval(getBuyValue, 60000); // update buy value every minute
  loadData();

  // Show / Hide Data
  $('input').click(function() {
    var type = $(this).attr('type');
    var name = $(this).attr('name');
    var chart = $('.chart').highcharts();
    var series = null;

    if(type === 'checkbox'){
      if(name === 'mtgox_buy') {
        series = chart.series[0];
      } else if(name === 'bitstamp_buy'){
        series = chart.series[1];
      } else if(name === 'btcchina_buy'){
        series = chart.series[2];
      } else {
        alert(name + ' not implemented yet!');
        return;
      }
    } else if(type === 'radio'){
      // set all twitter data visible to false
      // TODO: determine which series is shown and set only that to false
      chart.series[3].setVisible(false, false);
      chart.series[4].setVisible(false, false);
      chart.series[5].setVisible(false, false);
      chart.series[6].setVisible(false, false);
      chart.series[7].setVisible(false, false);
      chart.series[8].setVisible(false, false);
      chart.series[9].setVisible(false, false);
      chart.series[10].setVisible(false, false);
      chart.series[11].setVisible(false, false);

      // set selected radio button to visible
      var value = $(this).attr('value');
      if(value === '5'){ // tweets groups by 5 mins
        series = chart.series[3];
      }else if(value === '10'){ // tweets grouped by 10 mins
        series = chart.series[4];
      }else if(value === '30'){ // tweets grouped by 30 mins
        series = chart.series[5];
      }else if(value === '60'){ // tweets grouped by 60 mins
        series = chart.series[6];
      }else if(value === '180'){ // tweets grouped by 3 hours
        series = chart.series[7];
      }else if(value === '360'){ // tweets grouped by 6 hours
        series = chart.series[8];
      }else if(value === '720'){ // tweets grouped by 12 hours
        series = chart.series[9];
      } else if(value === '1440'){ // tweets grouped by 1 day 
        series = chart.series[10];
      } else if(value === '4320'){ // tweets grouped by 3 days
        series = chart.series[11];
      } else {
        alert('Not implemented yet!');
      }

    }
    
    var isShown = series.visible;
    // TODO:need to redraw chart to fit new scale
    series.setVisible(!isShown, true);

  });

  // Apply the theme
  var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
});