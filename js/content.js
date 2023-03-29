Promise.all([
        d3.json("/data/websiteContent.json"),
        d3.text("/data/codePreview.js")
    ])
    .then(function([websiteContent, codePreview]) {


        body = d3.select("body")

        // menu
        menu = body.append("header")
        menuContainer = menu.append("div")
            .classed("menu-container", true)
        menuLink = menuContainer.selectAll("a")
            .data(websiteContent.pageLinks)
            .enter()
        menuLink.append("a")
            .classed("menu-text", true)
            .attr("id", d => d.id)
            .attr("href", d => d.link)
            .html(d => d.label)

        // banner

        videoBanner = body.append("video")
            .attr("playsinline", "")
            .attr("autoplay", "")
            .attr("muted", "")
            .attr("loop", "")
            .attr("id", "bgvid")
            .selectAll("body")
            .data([websiteContent])
            .enter()
        videoBanner.append("bgvid")
            .attr("src", d => d.videoBanner.bannerVideo)
            .attr("type", "video/mp4")

        bannerOverlay = body.append("div")
            .classed("front-page-banner", true)
            .selectAll("body")
            .data([websiteContent])
            .enter()
        checkOutVideo = bannerOverlay.append("a")
            .classed("conference-presentation", true)
            .attr("href", d => d.videoBanner.youtubeLink)
            .attr("target", "_blank")
            .html(d => d.videoBanner.youtubeText)

        bannerDetails = bannerOverlay.append("ul")
            .classed("front-page-banner-content", true)
        bannerDetails.append("h1")
            .html(d => d.header.h1)
        bannerDetails.append("h2")
            .append("li")
            .classed("banner-cta", true)
            .html(d => d.header.h2)

        // skills section

        skillsSection = body.append("section")
            .classed("skills-parent", true)
            .append("div")
            .attr("id", "expertise")
            .classed("skills-container", true)
            .selectAll("body")
            .data([websiteContent])
            .enter()
        skillsSection.append("h1")
            .attr("id", "white")
            .html(d => d.expertise.headline)
        skillsSection.append("div")
            .classed("skills-cta", true)
            .html(d => d.expertise.intro)
        skillTiles = skillsSection.append("ul")
            .selectAll("li")
            .data(websiteContent.expertise.content)
            .enter()
        uniqueSkillTiles = skillTiles.append("li")
            .classed("skills", true)
            .append("div")
            .classed("skills-detail", true)

        uniqueSkillTiles.append("img")
            .attr("src", d => d.img)
        uniqueSkillTiles.append("h2")
            .html(d => d.title)
        uniqueSkillTiles.append("div")
            .classed("skill-intro", true)
            .html(d => d.headline)
        uniqueSkillTiles.append("div")
            .classed("skill-explained", true)
            .html(d => d.content)


        // Portfolio
        portfolioSection = body.append("section")
            .classed("skills-parent", true)
            .attr("id", "portfolio")
            .append("div")
            .attr("id", "expertise")
            .classed("skills-container", true)
            .selectAll("body")
            .data([websiteContent])
            .enter()
        portfolioSection.append("h1")
            .attr("id", "white")
            .html(d => d.portfolio.headline)
        portfolioSection.append("div")
            .classed("skills-cta", true)
            .html(d => d.portfolio.intro)

        portfolioContainer = portfolioSection.append("div")
            .selectAll("div")
            .data(websiteContent.portfolio.content)
            .enter()
            .append("div")

        portfolioContainer.append("h2")
            .html(d => d.company)
        portfolioContainer.append("sup")
            .html(d => d.intro)
        portfolioItems = portfolioContainer.append("ul")
            .selectAll("li")
            .data(d => d.experience)
            .enter()
            .append("li")
            .attr("onclick", d => "window.open('" + d.url + "', '_blank');")
            .attr("id", d => d.id)
            .classed("portfolio-item", true)
        portfolioDetails = portfolioItems.append("div")
            .classed("skills-detail", true)
        portfolioDetails.append("h2")
            .style("height", "69px")
            .append("img")
            .attr("src", d => d.logo)
        portfolioDetails.append("div")
            .classed("portfolio-description", true)
            .html(d => d.title)

        //timeline

        timelineSection = body.append("section")
            .classed("section section--grey", true)
            .attr("id", "section-timeline")
            .append("article")
            .attr("id", "pro-history")
            .selectAll("body")
            .data([websiteContent])
            .enter()
        timelineHeadline = timelineSection.append("section")
            .classed("skills-container", "true")
            .append("h1")
            .html(d => d.timeline.headline)
        timelineHeadline.append("p")
            .classed("skills-cta", true)
            .attr("id", "history")
            .html(d => d.timeline.intro)

        timelineItems = timelineSection.append("ul")
            .classed("timeline", true)
            .selectAll("li")
            .data(d => d.timeline.history)
            .enter()
            .append("li")
            .classed("timeline-event", true)
        timelineItems.append("div")
            .classed("timeline-icon", true)
            .style("background-image", d => "url('" + d.logo + "'), linear-gradient(white, white)")
            .append("i")
            .classed("icon icon-timeline-standards", true)
        timelineDetails = timelineItems.append("div")
            .classed("timeline-label", true)
        timelineDetails.append("p")
            .append("em")
            .html(d => d.role)
        timelineDetails.append("h3")
            .html(d => d.company)
        timelineDetails.append("p")
            .append("line")
            .html(d => d.duration)
        timelineDetails.append("p")
            .html(d => d.description.replace(/  /g, "<p>"))

        d3.select(".timeline")
            .append("li")
            .classed("timeline-line", true)

        startTimeline()


        code = d3.select("#code")
        jsonView = body.append("section")
            .classed("json-container", true)
        codeView = body.append("section")
            .classed("code-container", true)
        code.on("click", function() {
            codeView.append("div")
                .classed("code-header", true).append("div")
                .classed("code-label", true)
                .html("content.js")
            jsonView.append("div")
                .classed("code-header", true)
                .append("div")
                .classed("code-label", true)
                .html("websiteContent.json")
            json = jsonView.append("pre")
                .attr("id", "json-view")
            code = codeView.append("pre")
                .attr("id", "code-view")
            body.append("div")
                .classed("instructions", true)
                .html("Press the <b>esc key</b> to remove code view")
            d3.select(".json-container")
                .style("display", "inline")
            d3.select(".code-container")
                .style("display", "inline")
            json.html(syntaxHighlight(JSON.stringify(websiteContent, null, 2)))
            code.html(syntaxHighlight(codePreview))
            codify()

            function codify() {
                (function() {
                    var pre = document.getElementsByTagName('pre'),
                        pl = pre.length;
                    console.log(pl)
                    console.log(pre)
                    for (var i = 0; i < pl; i++) {
                        pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
                        var num = pre[i].innerHTML.split(/\n/).length * 1.55;
                        for (var j = 0; j < num; j++) {
                            var line_num = pre[i].getElementsByTagName('span')[0];
                            line_num.innerHTML += '<span>' + (j + 1) + '</span>';
                        }
                    }
                })();
            }

        })


        // contactDetails

        footer = body.append("footer")

        social = footer.append("div").classed("social", true).selectAll("a")
            .data(websiteContent.social)
            .enter()

        social.append("div").style("background-image", d => "url(" + d.thumbnail + ")").attr("onclick", d => "window.open('" + d.url + "', '_blank');")

        footer.append("div").classed("footer-content", true).html(new Date().getFullYear() + " | Online Portfolio of Corey Ouellette")

        function syntaxHighlight(json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                d3.select(".json-container")
                    .style("display", "none")
                d3.select(".code-container")
                    .style("display", "none")
                d3.selectAll(".line-number").remove()
                d3.selectAll(".instructions").remove()
            }
        };

    });