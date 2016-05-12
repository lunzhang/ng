app.controller('infoController',['$scope','$interval', function ($scope, $interval) {
    
    //bubble
    (function () {      
        //global variables
        var width = jQuery(document).outerWidth();
        var height = jQuery(document).outerHeight();
        
        var area = width * height;
        if (area < 750000) {
            var numBubble = 10;
        }
        else {
            var numBubble = 22;
        }
        var animator;
        
        $scope.$watch(function () {
            return jQuery(document).outerHeight();
        }, function (value) {
            height = value;
            $scope.bubbles = [];
            addObjects(numBubble);
        });
        
        $scope.$watch(function () {
            return jQuery(document).outerWidth();
        }, function (value) {
            width = value;
            $scope.bubbles = [];
            addObjects(numBubble);
        });
        
        $scope.bubbles = [];
        
        addObjects(numBubble);
        
        //animate the objects in the array
        animator = $interval(function () {
            move($scope.bubbles);
            collision($scope.bubbles);
        }, 30);
        
        //updates bubbles location
        function move(objects) {
            for (var index = 0; index < objects.length; index++) {
                var now = new Date().getTime();
                var object = objects[index];
                var elapsed = (object.timestamp || now) - now;
                var maxX = width - object.size;
                var maxY = height - object.size;
                object.timestamp = now;
                object.x += elapsed * object.velX;
                object.y += elapsed * object.velY;
                if (object.x > maxX) {
                    object.x = maxX;
                    object.velX *= -1;
                }
                else if (object.x < 0) {
                    object.x = 0
                    object.velX *= -1;
                }
                if (object.y > maxY) {
                    object.y = maxY;
                    object.velY *= -1;
                }
                else if (object.y < 0) {
                    object.y = 0;
                    object.velY *= -1;
                }
            }
        };
        
        //check for collision
        function collision(objects) {
            for (var index = 0; index < objects.length; index++) {
                var object = objects[index];
                object.detectCollision(objects);
            }
        };
        
        function addObjects(numBubble) {
            //populate bubbles
            for (var id = 0; id < numBubble; id++) {
                $scope.bubbles.push(createObject(id));
            }
        }
        
        //creates an object
        function createObject(id) {
            var maxVelocity = .1;
            var size = 22;
            var maxX = width - size;
            var maxY = height - size;
            return {
                id: id,
                size: size,
                color: 'white',
                x: (Math.random() * maxX),
                y: (Math.random() * maxY),
                maxVelocity: maxVelocity,
                velX: Math.random() * maxVelocity * (Math.random() < 0.5 ? -1 : 1),
                velY: Math.random() * maxVelocity * (Math.random() < 0.5 ? -1 : 1),
                detectCollision: function (objects) {
                    for (var index = 0; index < objects.length; index++) {
                        var object = objects[index];
                        if (object != this) {
                            var dx = object.x - this.x;
                            var dy = object.y - this.y;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            var maxDistance = object.size / 2 + this.size / 2;
                            if (distance < maxDistance) {
                                while (distance < maxDistance) {
                                    object.x += object.velX;
                                    object.y += object.velY;
                                    this.x += this.velX;
                                    this.y += this.velY;
                                    dx = object.x - this.x;
                                    dy = object.y - this.y;
                                    distance = Math.sqrt(dx * dx + dy * dy);
                                }
                                this.velX *= -1;
                                this.velY *= -1;
                                object.velX *= -1;
                                object.velY *= -1;
                            }
                        }
                    }
                }
            };
        };

    }());
 
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
            .defer(d3.json, "/lib/d3/world-110m.json")
            .defer(d3.tsv, "/lib/d3/world-country-names.tsv")
            .defer(d3.csv, "/lib/d3/locations.csv")
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
