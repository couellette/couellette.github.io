Promise.all([
    fetch('data/data.json')
]).then(function(responses) {
    return Promise.all(responses.map(function(response) {
        return response.json();
    }));
}).then(function(letters) {

    console.log(letters)
    app = d3.select("body").append("div").classed("appContainer", true)
    d3.select("body").append("div").attr("id", "chatContainer");
    // logoSection = app.append("div").classed("logoContainer", true).html("English<sup>英语</sup><br />NOW<sup>现在</sup>")
    beginSection = app.append("div").classed("beginContainer", true)
    appStart = beginSection.selectAll("body").data(letters).enter().append("div")


    appStart.append("div").classed("startButton", true).html("Start<sup>始</sup>").on("click", function(x, d, i) {


        // sound = d[page].letterUpperCase + " " + d[page].letterSound + " " + d[page].words[wordNum].word
        //     // Extract data using plain var assignments
        var letter = "sound/" + d[0].letterLowerCase + "-upper.mp3"
        var sound = "sound/" + d[0].letterLowerCase + "-sound.mp3"
        var firstWord = "sound/" + d[0].letterLowerCase + "-word.mp3"
        var firstSentence = "sound/" + d[0].letterLowerCase + "-short.mp3"
            // Build the text by string concatenation
        var textForTTS = "sound/" + d[0].letterLowerCase + "-sentence.mp3"


        vocalize(textForTTS)

        console.log(d)
        app.remove()
        header = d3.select("body").append("header")
        logo = header.append("div").html("English Now")
        letterSelection = d3.select("body").append('div').classed("letterSelection", true)
        eachLetter = letterSelection.selectAll("div").data(d).enter()
        eachLetter.append("div").classed("eachLetter", true).attr("id", (w, i) => i).html(w => w.letterUpperCase).on("click", function(w, i) {
            // console.log(upper.attr("id"))

            // console.log(w, i)
            // console.log($(this).attr('id'))
            page = $(this).attr('id')
            var letter = "sound/" + i.letterUpperCase;
            var sound = "sound/" + i.letterSound;
            var firstWord = "sound/" + i.words[wordNum].word;
            var firstSentence = "sound/" + i.words[wordNum].sentence;

            // Build the text by string concatenation
            var textForTTS = "sound/" + i.letterLowerCase + "-sentence.mp3"

            vocalize(textForTTS)
            upper.html(i.letterUpperCase).attr("id", page)
            lower.html(i.letterLowerCase)
            word.html(i.words[wordNum].word)

            storyImage.attr("src", "data/img/" + i.letterLowerCase + ".png")
            $(".letterSelection").toggleClass("selected")

            backCheck()
            endCheck()
        })
        letterChoice = header.append("div").classed("select", true).on("click", function() {
            $(".letterSelection").toggleClass("selected")
        })

        book = d3.select("body").append("div").classed("app", true)
        letters = book.append("div").classed("lettersPage", true)
        story = book.append("div").classed("storyPage", true)
        storyImage = story.append("div").classed("storyImage", true).append("img")
        storyText = story.append("div").classed("storyText", true)

        page = 0
        wordNum = 0
        storyImage.attr("src", "data/img/" + d[page].letterLowerCase + ".png").on("click", function() {
            sound = "sound/" + d[page].letterLowerCase + "-short.mp3"
            vocalize(sound)
        })

        console.log(d[page].words[wordNum].sentence)
        image = d[page].words[wordNum].sentence



        var letter = "sound/" + d[page].letterLowerCase + "-upper.mp3"
        var sound = "sound/" + d[page].letterLowerCase + "-sound.mp3"
        var firstWord = "sound/" + d[page].letterLowerCase + "-word.mp3"
        var firstSentence = "sound/" + d[page].letterLowerCase + "-short.mp3"

        // Build the text by string concatenation
        var textForTTS =
            "Let’s learn the letter " + letter + ".\n" +
            "The short sound is " + sound + ".\n" +
            "Here’s a word: " + firstWord + ".\n" +
            firstSentence;

        storyText.html(textForTTS)


        upper = letters.append("div").classed("upper", true).attr("id", "0").html(d[page].letterUpperCase).on("click", function() {
            console.log("clicked " + d[page].letterUpperCase)
            sound = "sound/" + d[page].letterLowerCase + "-upper.mp3"
            vocalize(sound)
        })
        lower = letters.append("div").classed("lower", true).html(d[page].letterLowerCase).on("click", function() {
            console.log("clicked " + d[page].letterLowerCase)
            sound = "sound/" + d[page].letterLowerCase + "-sound.mp3"
            vocalize(sound)
        })
        word = letters.append("div").classed("word", true).html(d[page].words[wordNum].word).on("click", function() {
            console.log("clicked " + d[page].words[wordNum].word)
            sound = "sound/" + d[page].letterLowerCase + "-word.mp3"
            vocalize(sound)
        })
        backCheck()

        letters.append("div").classed("nextButton hide", true).html("Next<sup>下个</sup>").on("click", function() {
            // console.log(i)

            page = parseInt(upper.attr("id")) + 1
            upper.attr("id", page)
                // sound = d[page].letterUpperCase + " " + d[page].letterSound + " " + d[page].words[wordNum].word
                //     // Extract data using plain var assignments
          
            var letter = d[page].letterUpperCase;
            var sound = d[page].letterSound;
            var firstWord = d[page].words[wordNum].word;
            var firstSentence = d[page].words[wordNum].sentence;

            // Build the text by string concatenation
            var textForTTS = "sound/" + d[page].letterLowerCase + "-sentence.mp3"

            vocalize(textForTTS)
            upper.html(d[page].letterUpperCase)
            lower.html(d[page].letterLowerCase)
            word.html(d[page].words[wordNum].word)

            storyImage.attr("src", "data/img/" + d[page].letterLowerCase + ".png")
                // image.remove()
            storyText.html(textForTTS)

 backCheck()
 endCheck()
            // if (page > 0) {
            //       $(".backButton").removeClass("hide")
            // }


        })
        letters.append("div").classed("backButton hide", true).html("Back<sup>上个</sup>").on("click", function() {
                    page = parseInt(upper.attr("id")) - 1

                    upper.attr("id", page)
                    upper.html(d[page].letterUpperCase)
                    lower.html(d[page].letterLowerCase)
                    word.html(d[page].words[wordNum].word)
                    storyImage.attr("src", "data/img/" + d[page].letterLowerCase + ".png")
                        // image.remove()
                    storyText.html(textForTTS)
                    var textForTTS = "sound/" + d[page].letterLowerCase + "-sentence.mp3"

                    vocalize(textForTTS)
                    backCheck()
                    endCheck()

                })
        backCheck()
    })

    function backCheck() {
        console.log("back started")
        console.log($(".upper").attr("id"))
        if ($(".upper").attr("id") === "0") {
            $(".backButton").addClass("hide")
            $(".nextButton").removeClass("hide")
        }else if ($(".upper").attr("id") != "0") {
            $(".backButton").removeClass("hide")
        }


    }

function endCheck(){
     if ($(".upper").attr("id") === "25") {
            console.log("it is ZOOO time")
            $(".nextButton").addClass("hide")
        }
        else {
            $(".nextButton").removeClass("hide")
        }
}

    function vocalize(textForTTS) {
        // console.log(textForTTS);
        // $('#chatContainer').find('audio') 
        $('#chatContainer').empty()

        // Create and append the new audio element
        const $audio = $('<audio>', {
            controls: true,
            autoplay: true
        });

        d3.select($audio[0])
            .append("source")
            .attr("src", textForTTS)
            .attr("type", "audio/mpeg");

        $('#chatContainer').append($audio);

    }
})