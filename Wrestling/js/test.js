Promise.all([
    fetch('data/wrestler_names.json'),
]).then(function(responses) {
    return Promise.all(responses.map(function(response) {
        return response.json();
    }));
}).then(function(data) {
    body = d3.select("body")
    header = body.append("header")
    header.append("div").classed("logo", true).attr("onClick", "window.location.href = '/Wrestling';")
    header.append("div").classed("name", true).html("Wrester DB")
        // body.append("h1").html("Find your favourite wrestler")
    search = header.append('div').attr("id", "query").classed("autoComplete_wrapper", true)
        .append("input").attr("type", "search").attr("dir", "ltr").attr("spellcheck", "false").attr("autocomplete", "false").attr("autocapitalize", "off").attr("id", "autoComplete")
        // <input id="autoComplete" type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off">


    wrestlerNames = data[0]

    const autoCompleteJS = new autoComplete({
        placeHolder: "Search by Wrestler",
        data: {
            src: wrestlerNames,
            cache: true,
        },
        resultItem: {
            highlight: true
        },
        events: {
            input: {
                selection: (event) => {
                    const ogquery = event.detail.selection.value;
                    run(ogquery)

                    autoCompleteJS.input.value = ogquery;
                }
            }
        }
    });

    app = body.append("div").classed("app-container", true)
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
    var dateRange = addMonths(new Date(currentDate), -1).toISOString().split('T')[0]
        // console.log(dateRange)

    newsKey = 'A2H6ko9vU6fppn1n3OzpfQwSl1PtNogzlNmtGdipXAg'
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", newsKey);


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var newsFrontPage = 'data/newsCatcher.json'
        // newsFrontPage = 'https://api.newscatcherapi.com/v2/search?q=aew OR wwe OR roh OR nxt&page_size=10&lang=en'

    console.log(dateRange)
    Promise.all([
        fetch(newsFrontPage, requestOptions),
        // fetch('https://newsapi.org/v2/everything?domains=tmz.com,youtube.com,bleacherreport.com,cbc.ca,forbes.com,411mania.com,ewrestlingnews.com,tjrwrestling.net,biztok.com,bleedingcool.com,ibtimes.com,nypost.com,espn.com,gameinformer.com,dailymail.co.uk&searchIn=title,description&q=aew+OR+wwe+OR+roh&from=' + dateRange + '&sortBy=popularity&apiKey=' + newsKey + 'a&language=en&pageSize=45')
    ]).then(function(responses) {
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function(data) {
        console.log(data[0].articles)
            // articlesData = data[0].articles
        articlesData = data[0].articles
        articlesData = articlesData.filter(function(d) {
            format = d.media

            return format.substr(format.length - 3) === 'jpg'
        })
        console.log(articlesData)
        news = app.append("div").classed("news", true)
        headline = news.append("div").classed("news-label", true).html("Top News In Wrestling")

        news.append("div").classed("news-container", true)

        articles = news.selectAll("body").data(articlesData).enter().append("div").classed("unique-news", true)
        articles.append("div").classed("article-image", true).style("background", d => "url(" + d.media + ")").style("background-size", "cover").attr("onclick", d => "window.open('" + d.link + "','mywindow')")
        articles.append("div").classed("article-source", true).html(d => d.rights)
        articles.append("div").classed("article-date", true).html(d => d.published_date.split(' ')[0])
        articles.append("div").classed("article-title", true).html(d => d.title)
        articles.append("div").classed("article-description", true).html(d => d.excerpt)


        search.on("keypress", function(e) {
            ogquery = d3.select("#autoComplete").node().value
            console.log(ogquery)
            if (e.charCode === 13) {
                console.log(ogquery)

                run(ogquery)
            }
        })

    })

    function run(ogquery) {
        var searched = d3.select("#autoComplete")
        searched.on("keypress", function(e) {
            ogquery = d3.select("#autoComplete").node().value
            if (e.charCode === 13) {
                run(ogquery)
            }
        })
        youtubeKey = 'AIzaSyDukkqsudKv7UXgixVY839GN1UCrT_Sx6I'
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
        var news = 'data/newsCatcher.json'
            // news = 'data/news.json'
            // youtube = 'data/video.json'
            //    news = 'https://newsapi.org/v2/everything?domains=tmz.com,youtube.com,bleacherreport.com,cbc.ca,forbes.com,411mania.com,ewrestlingnews.com,tjrwrestling.net,biztok.com,bleedingcool.com,ibtimes.com,nypost.com,espn.com,gameinformer.com,dailymail.co.uk&searchIn=title,description&q="' + ogquery + '",' + ogquery + ' &from=' + dateRange + '&sortBy=popularity&apiKey=' + newsKey + 'a&language=en&pageSize=6'
            // news = 'https://api.newscatcherapi.com/v2/search?q=' + ogquery +'&page_size=10&lang=en'
        youtube = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&order=relevance&q=' + ogquery + '&chart=mostPopular&key=' + youtubeKey



        search(query, ogquery, news)

        function search() {

            Promise.all([
                fetch('https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=' + query + '&limit=1'),
                fetch('https://en.wikipedia.org/api/rest_v1/page/media-list/' + query),
                fetch('https://en.wikipedia.org/api/rest_v1/page/related/' + query),
                fetch(news, requestOptions),
                fetch(youtube),
                // fetch('data/video.json')
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
                articlesData = articlesData.filter(function(d) {
                    format = d.media

                    return format.substr(format.length - 3) === 'jpg'
                })
                app = body.append("div").classed("app-container", true)

                background = app.append("div").classed("collage", true)



                background.selectAll("img").data(images).enter().append("div").classed("collage_images", true).style("background", function(d) {

                        return "url(" + d.srcset[0].src + ")"
                    })
                    .style("width", "33.3%")
                    .style("background-size", "cover")
                    .style("background-position-y", "top")
                if (data[0].pages.length > 0) {
                    details = app.append("div").classed("details", true)

                    image = details.append("div").classed("headshot", true).style("background", function() {
                            if (mainData.thumbnail === null) {
                                return "url('images/profile.jpeg')"
                            } else
                                return "url(" + mainData.thumbnail.url.replace("/60px", "/400px") + ")"
                        })
                        .style("background-size", "cover").style("background-position", "top")
                    bio = details.append("div").classed("bio", true)
                    bio.append("div").classed("ring_name", true).html(mainData.title)
                    bio.append("div").classed("description", true).html(mainData.description)
                    bio.append("div").classed("excerpt", true).html(mainData.excerpt + '...<a href="https://en.wikipedia.org/wiki/' + mainData.key + '" target="_blank">Read More</a>')
                }



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
                articles.append("div").classed("article-image", true).style("background", d => "url(" + d.media + ")").style("background-size", "cover").attr("onclick", d => "window.open('" + d.link + "','mywindow')")
                articles.append("div").classed("article-source", true).html(d => d.rights)
                articles.append("div").classed("article-date", true).html(d => d.published_date.split(' ')[0])
                articles.append("div").classed("article-title", true).html(d => d.title)
                articles.append("div").classed("article-description", true).html(d => d.excerpt)

                also = app.append("div").classed("also_interested", true)
                also.append("div").classed("footer-label", true).html("You may also be interested in")

                other = also.append("div").classed("other-wrestler-container", true).selectAll("div").data(otherData).enter().append("div").classed("other-wrestlers", true)
                other.append("div").classed("other-wrestler-headshot", true).style("background", d => "url(" + d.thumbnail.source.replace("/60px", "/400px") + ")").style("background-size", "cover").on("click", function(d, x, i) {
                    document.getElementById("autoComplete").value = x.normalizedtitle

                    ogquery = x.normalizedtitle
                    run(ogquery)

                })
                other.append("div").classed("other-wrestler-name", true).html(d => d.normalizedtitle.substring(0, 18))

            })
        }
    }
    // render()
})