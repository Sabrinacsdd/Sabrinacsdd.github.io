

var changeScene = (i) => {

    curDate = dateSet[i];
    index = i;
    d3.select('#showDate')
        .text(curDate.substring(0, 4))

    var data = getData(curDate);

    //update x y domain
    x.domain(data.map(function (d) { return d.OS; }));
    y.domain([0, 100]);

    //update x y axis
    xAxis.call(d3.axisBottom(x).tickFormat(function (d) { return d; }));
    yAxis.call(d3.axisLeft(y).tickFormat(x => `${x}%`));

    // chart.text(curDate)
    // clearTimeout(timeIndex1);
    // clearTimeout(timeIndex2);
    //remove annotations
    d3.selectAll('.labels').remove();
    
    var join = chart.selectAll("rect")
        .data(data);


    join.enter()
        .append("rect")
        .merge(join)
        .on("mousemove", function (d) {
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.OS) + "<br>" + (d.value) + "%");
        })
        .on("mouseout", function (d) { tooltip.style("display", "none"); })
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .attr("x", function (d) { return x(d.OS); })
        // .attr("y", function (d) { return y(0); })
        .attr("width", x.bandwidth())
        // .attr("height", function (d) { return height - y(0); })
        .attr("class", function (d) { return d.OS; })
        .attr("fill", " #6a5acd")
        .on('end', () => {
            //add annotations accordingly
            if (curDate == dateSet[0]) {
                drawAnnotation('SymbianOS', 'Leading position');
                drawAnnotation('iOS', 'iphone4 release');
                d3.select('#conclusion')
                    .text('Before the Android world ruled Smartphones, one of the most widely-adopted operating systems for phones was the Symbian OS. The platform was popular up until 2010 when Google’s Android gave it a run for its money. In February 2011, after Nokia’s newly appointed CEO announced that the company was partnering with Microsoft to develop Nokia devices running Windows, the Symbian platform gradually dropped. Developers deserted the ecosystem rapidly.')
            }
            if (curDate == dateSet[1]) {
                drawAnnotation('iOS', 'iphone5 release');
                drawAnnotation('Android', 'Surpass SymbianOs');
                d3.select('#conclusion')
                    .text('Android and iOs start to have more market share than SymbianOs.     Nokia releases the Nokia 808 PureView,later confirmed (in January 2013) to be the last Symbian smartphone.')

            }
            if (curDate == dateSet[2]) {
                drawAnnotation('BlackBerry', 'BlackBerry 10 release');
                drawAnnotation('Android', 'Leading position');
                d3.select('#conclusion')
                    .text('Android start taking the lead position in mobile OS market share. BlackBerry releases their new operating system for smartphones, BlackBerry 10. Google releases Android KitKat 4.4.')
            }
            if (curDate == dateSet[3]) {
                drawAnnotation('iOS', 'Apple watch release');
                drawAnnotation('Android', 'Leading position');
                d3.select('#conclusion')
                    .text('Android takes the leading position in mobile market share. Google releases Android 6.0 "Marshmallow". BlackBerry announces that there are no plans to release new APIs and software development kits for BlackBerry 10, and future updates would focus on security and privacy enhancements only.')
            }
            if (curDate == dateSet[4]) {
                drawAnnotation('iOS', 'Stable market share');
                drawAnnotation('Android', 'Leading position');
                d3.select('#conclusion')
                    .text('Today, Android is the most widely used mobile operation system. iOS has the second largest installed base worldwide on smartphones, but the largest profits, due to aggressive price competition between Android-based manufacturers.')
            }
        });
    // .on("mousemove", function (d) {
    //     tooltip
    //         .style("left", d3.event.pageX - 50 + "px")
    //         .style("top", d3.event.pageY - 70 + "px")
    //         .style("display", "inline-block")
    //         .html((d.OS) + "<br>" + (d.value) + "%");
    // })
    // .on("mouseout", function (d) { tooltip.style("display", "none"); });

    join
        .exit().remove();

    // join.enter().merge(join)
    //     .transition() // and apply changes to all of them
    //     .duration(1000)
    //     .attr("y", function (d) { return y(d.value); })
    //     .attr("height", function (d) { return height - y(d.value); })

    // join.update().remove();


    //annotations
    var drawAnnotation = (target, text) => {
        //draw annotation on target bar
        data.forEach(d => {
            if (d.OS == target) {
                const annotation = [{
                    note: {
                        label: text,
                        wrap: x.bandwidth() + 10
                    },
                    connector: {
                        end: "arrow",
                    },
                    x: x(d.OS) + x.bandwidth() / 2,
                    y: y(d.value),
                    dy: -30,
                    dx: 30
                }]
                const makeAnno = d3.annotation()
                    .annotations(annotation)
                svg
                    .append("g")
                    .attr('class', 'labels')
                    .call(makeAnno)
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
            }
        })
    }


}

var checkClick = (cb) => {
    active[cb.id] = cb.checked;
    if (index == -1) {
        index = 0;
    }
    changeScene(index);
}

var reset = () => {
    d3.selectAll("input")
        .property('checked', true);
    for (var i in active) {
        active[i] = true;
    }
    // chart.text(curDate)
    clearTimeout(timeIndex1);
    clearTimeout(timeIndex2);
    index = -1;
    d3.selectAll('.labels').remove();
    d3.selectAll("rect")
        .remove();
    xAxis.selectAll('*').remove();
    yAxis.selectAll('*').remove();
    d3.select('#conclusion')
        .text(' ')
    d3.select('#showDate')
        .text('Please use the "next" button to follow narrative visualization or use the number button to choose any slide you want.');
    // changeScene(0);
}
