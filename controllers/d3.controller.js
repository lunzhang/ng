app.controller('d3Controller', ['$scope', '$http', function ($scope, $http) {

  //globe
  (function () {
      //global variables
      var winWidth = $(window).width();
      if (winWidth < 400) {
          var width = 180,
              height = 180;
          var projection = d3.geo.orthographic()
          .scale(90)
          .translate([width / 2, height / 2])
          .clipAngle(90)
          .precision(.1);
      } else {
          var width = 360,
              height = 360;
          var projection = d3.geo.orthographic()
          .scale(180)
          .translate([width / 2, height / 2])
          .clipAngle(90)
          .precision(.1);
      }

      var path = d3.geo.path()
          .projection(projection);
      var graticule = d3.geo.graticule();
      //appends svg
      var globe = d3.select("#globe").append("svg")
          .attr("width", width)
          .attr("height", height);
      var g = globe.append("g").attr("zoom", false);
      //appends sphere
      g.append("defs").append("path")
          .datum({ type: "Sphere" })
          .attr("id", "sphere")
          .attr("d", path);
      //appends fill
      g.append("use")
          .attr("class", "fill")
          .attr("xlink:href", "#sphere");
      //loads world map and country names
      queue()
          .defer(d3.json, "/ng/lib/d3/world-110m.json")
          .defer(d3.tsv, "/ng/lib/d3/world-country-names.tsv")
          .defer(d3.csv, "/ng/lib/d3/locations.csv")
          .await(ready);
      //when loaded
      function ready(error, world, names, locations) {
          if (error) throw error;
          //add country names
          var countries = topojson.feature(world, world.objects.countries).features;
          countries = countries.filter(function (d) {
              return names.some(function (n) {
                  if (d.id == n.id) return d.name = n.name;
              });
          }).sort(function (a, b) {
              return a.name.localeCompare(b.name);
          });
          //land
          g.selectAll("path.land")
              .data(countries)
              .enter().append("path")
              .attr("class", "land")
              .attr("d", path)
              .attr("name", function (d, i) {
              return name = d.name;
          })
              .attr("i", function (d, i) {
              return i = i;
          });

          //boundaries
          g.insert("path")
              .datum(topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);

          var inProgress = false;
          var currentCountry;

          g.selectAll("circle")
          .data(locations)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
              return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function (d) {
              return projection([d.lon, d.lat])[1];
          })
          .attr("id", function (d) {
              return d.location;
          })
          .style('fill', '#E43131')
          .style('display', 'none');

          var tip;
          var tooltip = d3.select('#tooltip');
          this.zoomIn = function (i, location) {
              var bounds = path.bounds(countries[i]),
                  dx = bounds[1][0] - bounds[0][0],
                  dy = bounds[1][1] - bounds[0][1],
                  x = (bounds[0][0] + bounds[1][0]) / 2,
                  y = (bounds[0][1] + bounds[1][1]) / 2,
                  scale = .9 / Math.max(dx / width, dy / height),
                  translate = [width / 2 - scale * x, height / 2 - scale * y];
              g.transition()
                  .duration(750)
                  .attr("transform", "translate(" + translate + ")scale(" + scale + ")").each("end", function () {
                  g.attr("zoom", true);
                  currentCountry = countries[i].name;
                  inProgress = false;
                  var circle = '#' + location;
                  g.select(circle).style('display', 'inline');

                  var posX = $(circle).offset().left-100;
                  var posY = $(circle).offset().top - 100;
                  tooltip.style("left", (posX) + "px")
                             .style("top", (posY) + "px")
                              .style("display", 'block');

              });
          };

          this.transition = function (i, location) {
              d3.transition()
              .duration(1000)
              .tween("rotate", function () {
                  var p = d3.geo.centroid(countries[i]),
                      r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                  return function (t) {
                      projection.rotate(r(t));
                      g.selectAll("path").attr("d", path)
                                      .classed("focused", function (d, i) {
                      });
                      g.selectAll("circle")
                      .attr("cx", function (d) {
                          return projection([d.lon, d.lat])[0];
                      })
                      .attr("cy", function (d) {
                          return projection([d.lon, d.lat])[1];
                      });
                  };
              }).transition().each("end", function () {
                  zoomIn(i, location);
              });
          }

          this.zoomOut = function (i, location, datatip) {
              $scope.tip = datatip;
              $scope.$apply();
              if (!inProgress) {
                  if (g.attr("zoom") === "true" && currentCountry != countries[i].name) {
                      tooltip.style("display", 'none');
                      inProgress = true;
                      g.transition()
                          .duration(750)
                          .attr("transform", "translate(0,0) scale(1,1)").each("end", function () {
                          g.selectAll('circle').style('display', 'none');
                          transition(i, location);
                      });
                  }
                  else if (g.attr("zoom") === "false") {
                      inProgress = true;
                      g.selectAll('circle').style('display', 'none');
                      transition(i, location);
                  }
                  else {
                      g.selectAll('circle').style('display', 'none');
                      g.select('#' + location).style('display', 'inline');
                  }
              }
          }

      };

  })();

  //timeline
  (function () {
      var data = [
          {
              times: [
                  { "starting_time": 757287682200, "display" : "circle", "id": "born", "index": 31, "location": "wz", "tip" : "Born in Wz,CN on 11/30/1993" }]
          },
          {
              times: [
                  { "starting_time": 969655282200, "display": "circle", "id": "us", "index": 164, "location": "nyc", "tip" : "Arrived in Nyc,US on 8/22/2000" }]
          },
          {
              times: [
                  { "starting_time": 1224016882200, "display": "circle", "id": "hs", "index": 164, "location": "nyc", "tip" : "Started Bronx Science HS on 9/14/2008" }]
          },
          {
              times: [
                  { "starting_time": 1348260082200, "display": "circle", "id": "college", "index": 164, "location": "sb", "tip" : "Started Stony Brook on 8/21/2012" }]
          },
          {
              times: [
                  { "starting_time": 1435178482200, "display": "circle", "id": "bluum", "index": 164, "location": "nyc", "tip" : "Intern at Bluum on 5/24/2015 to 8/12/2015" }]
          },
          {
              times: [
                  { "starting_time": 1453585282200, "display": "circle", "id": "grad", "index": 164, "location": "sb", "tip" : "Graduated Stony Brook on 12/23/2015" }]
          },
          {
              times: [
                  { "starting_time": 1458679282200, "display": "circle", "id": "fxcm", "index": 164, "location": "nyc", "tip" : "Started Fxcm on 2/22/2016" }]
          }
      ];
      //tooltip
      var tooltip = d3.select('#tooltip');
      var chart = d3.timeline()
             .tickFormat({
          format: d3.time.format("%Y"),
          tickTime: d3.time.years,
          tickInterval: 1,
          tickSize: 3
      })
              .width('1000')
              .beginning(757287682200)
              .ending(1458679282200)
              .mouseover(function (d, i, datum) {
          zoomOut(d.index, d.location,d.tip);
      })
              .mouseout(function (d, i, datum) {

      });
      var timeline = d3.select("#timeline").append("svg").attr("width", '1000')
              .datum(data).call(chart);
  })();

}]);
