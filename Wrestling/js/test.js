
body = d3.select("body")
header = body.append("header")
header.append("div").classed("logo", true)
header.append("div").classed("name", true).html("Wrester DB")
body.append("h1").html("Find your favourite wrestler")
search = header.append('div').classed("query", true).append("input").attr("id", "search-bar").attr("placeholder", "search")
app = body.append("div").classed("app-container", true)

search.on("keypress", function(e) {
    ogquery = d3.select("#search-bar").node().value
    if (e.charCode === 13) {
        run(ogquery)
    }
})


function run(ogquery) {
   var searched = d3.select("#search-bar").attr("id","searched")
   searched.on("keypress", function(e) {
    ogquery = d3.select("#searched").node().value
    if (e.charCode === 13) {
        run(ogquery)
    }
})

    query = titleCase(ogquery).replace(/ /g, "_")
    app.remove()
    d3.select("h1").remove()



    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '1');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${parseInt(currentDay)+1}`;


    function addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }
    // Subtract 2 months from 31 Jan 2017 -> 30 Nov 2016
    var dateRange = addMonths(new Date(currentDate), -1).toISOString().split('T')[0]
        // console.log(dateRange)

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    news = 'data/news.json'
    youtube = 'data/video.json'
    search(query, ogquery, news)
    function search() {

        Promise.all([
            fetch('https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=' + query + '&limit=1'),
            fetch('https://en.wikipedia.org/api/rest_v1/page/media-list/' + query),
            fetch('https://en.wikipedia.org/api/rest_v1/page/related/' + query),
            fetch(news),
            fetch(youtube)
       ]).then(function(responses) {
            return Promise.all(responses.map(function(response) {
                return response.json();
            }));
        }).then(function(data) {
            videos = data[4].items
            d = data
            images = d[1].items
            images = images.filter(d => Boolean(d.srcset))
            images = images.filter(function(d) {
                    format = d.srcset[0].src
      
                    return format.substr(format.length - 3) === 'jpg'
                })

            mainData = data[0].pages[0]
            otherData = data[2].pages.filter(item => Boolean(item.thumbnail))
            otherData = otherData.filter(d => d.normalizedtitle.trim().split(/\s+/).every(e => e.length >= 2))
            extraData = d.slice(1)
            articlesData = data[3].articles

            app = body.append("div").classed("app-container", true)

            background = app.append("div").classed("collage", true)



            background.selectAll("img").data(images).enter().append("div").classed("collage_images", true).style("background", function(d) {

                    return "url(" + d.srcset[0].src + ")"
                })
                .style("width", "33.3%")
                .style("background-size", "cover")
                .style("background-position-y", "top")

            details = app.append("div").classed("details", true)

            image = details.append("div").classed("headshot", true).style("background", "url(" + mainData.thumbnail.url.replace("/60px", "/400px") + ")").style("background-size", "cover").style("background-position", "top")
            bio = details.append("div").classed("bio", true)
            bio.append("div").classed("ring_name", true).html(mainData.title)
            bio.append("div").classed("description", true).html(mainData.description)
            bio.append("div").classed("excerpt", true).html(mainData.excerpt + '...<a href="https://en.wikipedia.org/wiki/' + mainData.key + '" target="_blank">Read More</a>')



            relatedVideos = app.append("div").classed("video-container", true)

            videoHeadline = relatedVideos.append("div").classed("videos-label", true).html("Top Related Videos")

            relatedVideos.append("div").classed("related-videos-container", true)
            videosClip = relatedVideos.selectAll("body").data(videos).enter().append("div").classed("related-videos", true)
            videosClip.append("div").classed("video-image", true).style("background", d => "url(" + d.snippet.thumbnails.medium.url + ")").style("background-size", "cover").style("background-position", "center").attr("onclick", d => "window.open('https://www.youtube.com/watch?v=" + d.id.videoId + "','mywindow')")
            videosClip.append("div").classed("video-channel", true).html(d => d.snippet.channelTitle)
            videosClip.append("div").classed("video-date", true).html(d => d.snippet.publishTime.split('T')[0])
            videosClip.append("div").classed("video-source", true).html(d => d.snippet.title.replace(/#(\S+)/gi, '<a target="_blank" href="https://www.youtube.com/results?search_query=$1">#$1</a>').replace(/@(\S+)/gi, '<a target="_blank" href="https://www.youtube.com/@$1">@$1</a>'))



            news = app.append("div").classed("news", true)
            headline = news.append("div").classed("news-label", true).html("Top Headlines")

            news.append("div").classed("news-container", true)

            articles = news.selectAll("body").data(articlesData).enter().append("div").classed("unique-news", true)
            articles.append("div").classed("article-image", true).style("background", d => "url(" + d.urlToImage + ")").style("background-size", "cover").attr("onclick", d => "window.open('" + d.url + "','mywindow')")
            articles.append("div").classed("article-source", true).html(d => d.source.name)
            articles.append("div").classed("article-date", true).html(d => d.publishedAt.split('T')[0])
            articles.append("div").classed("article-title", true).html(d => d.title)
            articles.append("div").classed("article-description", true).html(d => d.description)

            also = app.append("div").classed("also_interested", true)
            also.append("div").classed("footer-label", true).html("You may also be interested in")

            other = also.append("div").classed("other-wrestler-container", true).selectAll("div").data(otherData).enter().append("div").classed("other-wrestlers", true)
            other.append("div").classed("other-wrestler-headshot", true).style("background", d => "url(" + d.thumbnail.source.replace("/60px", "/400px") + ")").style("background-size", "cover").on("click", function(d, x, i) {
                document.getElementById("searched").value = x.normalizedtitle

                ogquery = x.normalizedtitle
                run(ogquery)

            })
            other.append("div").classed("other-wrestler-name", true).html(d => d.normalizedtitle.substring(0, 18))

        })
    }
}