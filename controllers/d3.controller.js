app.controller('d3Controller', ['$scope', '$http', function ($scope, $http) {
        
        (function nyc(){
            var width = 480,
                height = 600;
            var projection = d3.geo.transverseMercator()
    .rotate([74 + 30 / 60, -38 - 50 / 60]);
            var path = d3.geo.path()
    .projection(projection);
            
            var svg = d3.select("#nyc").append("svg")
    .attr("width", width)
    .attr("height", height);
        })();    

        function lineChart() {
            
            var activeRates = ['bidOpen'];
            var rates;
            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                height = 500 - margin.left - margin.right,
                width = 960 - margin.top - margin.bottom;
            
            var x = d3.time.scale().range([0, width]);
            
            var y = d3.scale.linear().range([height, 0]);
            
            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            
            var yAxis = d3.svg.axis().scale(y).orient("left");
            
            function ratesLineByValue(rates, value) {
                var line = d3.svg.line().x(function (d) { return x(d.date); }).y(function (d) { return y(d[value]); });
                return line(rates);
            }
            
            function ratesLineByIndex(rates, i) {
                var line = d3.svg.line().x(function (d) { return x(d.date); }).y(function (d) { return y(d[activeRates[i]]); });
                return line(rates);
            }
            
            var svg = d3.select("#chart").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")");
            svg.append("g").attr("class", "y axis");
            
            function getRate(period) {
                svg.selectAll('.line').remove();
                $http.get('/api/rates/' + period).then(function (resp) {
                    
                    rates = resp.data.rates;
                    rates.forEach(function (d) {
                        d.date = d.date * 1000;
                    });
                    x.domain(d3.extent(rates, function (d) { return d.date; }));
                    y.domain([d3.min(rates, function (d) { return Math.min(d.bidOpen, d.bidClose, d.bidHigh, d.bidLow, d.askOpen, d.askClose, d.askHigh, d.askLow); })
                    , d3.max(rates, function (d) { return Math.max(d.bidOpen, d.bidClose, d.bidHigh, d.bidLow, d.askOpen, d.askClose, d.askHigh, d.askLow); })]);
                    
                    svg.select('.x.axis').call(xAxis);
                    
                    svg.select('.y.axis').call(yAxis);
                    
                    for (var i = 0; i < activeRates.length; i++) {
                        svg.append('path').attr('class', 'line').attr('id', activeRates[i]).attr('d', ratesLineByIndex(rates, i));
                    }

                });
            }
            
            $('#period :radio').change(function (e) {
                var period = $(this).val();
                getRate(period);
            });
            
            $('#rates :checkbox').change(function (e) {
                var checkbox = $(this);
                var rate = checkbox.val();
                if (checkbox.is(':checked')) {
                    activeRates.push(rate);
                    svg.append('path').attr('class', 'line').attr('id', rate).attr('d', ratesLineByValue(rates, rate));
                }
                else {
                    activeRates.splice(activeRates.indexOf(rate), 1);
                    svg.select('#' + rate).remove();
                }
            });
            
            getRate('M1');
        }
    }]);
