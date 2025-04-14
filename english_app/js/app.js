one = "sk"
two = "aHlmz9hSwF"
three = "XAFgy1NSaj"
four = "T3BlbkFJXkZh"
five = "VKAYJsobz"
six = "lEnj0L3"
apiKEY = one + "-" + two + three + four + five + six

console.log("its working")
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
            var letter = d[0].letterUpperCase;
            var sound = d[0].letterSound;
            var firstWord = d[0].words[0].word;
            var firstSentence = d[0].words[0].sentence;

            // Build the text by string concatenation
            var textForTTS =
                "Let’s learn the letter " + letter + ".\n" +
                "The short sound is " + sound + ".\n" +
                "Here’s a word: " + firstWord + ".\n" +
                firstSentence;


            vocalize(textForTTS)
            // upper.html(d[0].letterUpperCase)
            // lower.html(d[0].letterLowerCase)
            // word.html(d[0].words[wordNum].word)

            // storyImage.attr("src", "data/img/" + d[0].letterLowerCase + ".png")
                // image.remove()
            // storyText.html(textForTTS)



        console.log(d)
        app.remove()
        header = d3.select("body").append("header")
        logo = header.append("div").html("English Now")
        letterSelection = d3.select("body").append('div').classed("letterSelection", true)
        eachLetter = letterSelection.selectAll("div").data(d).enter()
        eachLetter.append("div").classed("eachLetter", true).attr("id", (w, i) => i).html(w => w.letterUpperCase).on("click", function(w, i) {
            console.log(w, i)
            var letter = i.letterUpperCase;
            var sound = i.letterSound;
            var firstWord = i.words[wordNum].word;
            var firstSentence = i.words[wordNum].sentence;

            // Build the text by string concatenation
            var textForTTS =
                "Let’s learn the letter " + letter + ".\n" +
                "The short sound is " + sound + ".\n" +
                "Here’s a word: " + firstWord + ".\n" +
                firstSentence;


            vocalize(textForTTS)
            upper.html(i.letterUpperCase)
            lower.html(i.letterLowerCase)
            word.html(i.words[wordNum].word)

            storyImage.attr("src", "data/img/" + i.letterLowerCase + ".png")
$(".letterSelection").toggleClass("selected")

        })
        letterChoice = header.append("div").classed("select", true).on("click", function() {
                $(".letterSelection").toggleClass("selected")
            })
            // letterChoice.append("div").html("A")
            // letterChoice.append("div").html("B")
            // letterChoice.append("div").html("C")
        book = d3.select("body").append("div").classed("app", true)
        letters = book.append("div").classed("lettersPage", true)
        story = book.append("div").classed("storyPage", true)
        storyImage = story.append("div").classed("storyImage", true).append("img")
        storyText = story.append("div").classed("storyText", true)

        page = 0
        wordNum = 0
        storyImage.attr("src", "data/img/" + d[page].letterLowerCase + ".png").on("click", function() {
            sound = d[page].words[wordNum].sentence
            vocalize(sound)
        })

        console.log(d[page].words[wordNum].sentence)
        image = d[page].words[wordNum].sentence

        function imageRedraw() {

            // var settings = {
            //     "url": "https://api.openai.com/v1/images/generations",
            //     "method": "POST",
            //     "timeout": 0,
            //     "headers": {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer " + apiKEY
            //     },
            //     "data": JSON.stringify({
            //         "model": "dall-e-3",
            //         "prompt": "Ghibli Studios style of: " + d[page].words[wordNum].sentence,
            //         "n": 1,
            //         "size": "1024x1024"
            //     }),
            // };

            // $.ajax(settings).done(function(response) {
            //     genImage = response.data[0].url
            //     image = letters.append("div").classed("image", true)
            //     picture = image.append("img").classed("genImage", true).attr("src", genImage).on("click", function() {
            //         console.log("clicked " + d[page].words[wordNum].sentence)
            //         sound = d[page].words[wordNum].sentence
            //         vocalize(sound)
            //     })
            // });

        }

        imageRedraw()

        var letter = d[page].letterUpperCase;
        var sound = d[page].letterSound;
        var firstWord = d[page].words[wordNum].word;
        var firstSentence = d[page].words[wordNum].sentence;

        // Build the text by string concatenation
        var textForTTS =
            "Let’s learn the letter " + letter + ".\n" +
            "The short sound is " + sound + ".\n" +
            "Here’s a word: " + firstWord + ".\n" +
            firstSentence;

        storyText.html(textForTTS)


        upper = letters.append("div").classed("upper", true).html(d[page].letterUpperCase).on("click", function() {
            console.log("clicked " + d[page].letterUpperCase)
            sound = d[page].letterUpperCase
            vocalize(sound)
        })
        lower = letters.append("div").classed("lower", true).html(d[page].letterLowerCase).on("click", function() {
            console.log("clicked " + d[page].letterLowerCase)
            sound = d[page].letterSound
            vocalize(sound)
        })
        word = letters.append("div").classed("word", true).html(d[page].words[wordNum].word).on("click", function() {
            console.log("clicked " + d[page].words[wordNum].word)
            sound = d[page].words[wordNum].word
            vocalize(sound)
        })


        letters.append("div").classed("nextButton", true).html("Next<sup>下个</sup>").on("click", function() {

            page = page + 1
                // sound = d[page].letterUpperCase + " " + d[page].letterSound + " " + d[page].words[wordNum].word
                //     // Extract data using plain var assignments
            var letter = d[page].letterUpperCase;
            var sound = d[page].letterSound;
            var firstWord = d[page].words[wordNum].word;
            var firstSentence = d[page].words[wordNum].sentence;

            // Build the text by string concatenation
            var textForTTS =
                "Let’s learn the letter " + letter + ".\n" +
                "The short sound is " + sound + ".\n" +
                "Here’s a word: " + firstWord + ".\n" +
                firstSentence;


            vocalize(textForTTS)
            upper.html(d[page].letterUpperCase)
            lower.html(d[page].letterLowerCase)
            word.html(d[page].words[wordNum].word)

            storyImage.attr("src", "data/img/" + d[page].letterLowerCase + ".png")
                // image.remove()
            storyText.html(textForTTS)

            imageRedraw()
            if (page > 0) {
                letters.append("div").classed("backButton", true).html("Back<sup>上个</sup>").on("click", function() {

                    page = page - 1
                    upper.html(d[page].letterUpperCase)
                    lower.html(d[page].letterLowerCase)
                    word.html(d[page].words[wordNum].word)

                })
            }

        })
    })

    function vocalize(textForTTS) {
    console.log(textForTTS);
// $('#chatContainer').find('audio') 
$('#chatContainer').empty() 
// $('#chatContainer').append($audio);
    fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + apiKEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini-tts",
                voice: "alloy",
                instructions: "Speak as if you're teaching 5 year old Chinese kids how to speak English.  Speak in a slow, easy to understand, positive tone...",
                input: textForTTS,
                response_format: "mp3"
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch audio");
            return response.blob();
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);

            // --- STOP AND REMOVE ANY PREVIOUS AUDIO BEFORE STARTING NEW ---
            // Find any existing <audio> tags in #chatContainer
            $('#chatContainer').find('audio').each(function() {
                this.pause();
                this.currentTime = 0;
            });
            // Clear them from the container (optional, if you just want one player)
            $('#chatContainer').empty();
            // -------------------------------------------------------------

            // Create and append the new audio element
            const $audio = $('<audio>', {
                controls: true,
                autoplay: true
            });

            d3.select($audio[0])
                .append("source")
                .attr("src", audioUrl)
                .attr("type", "audio/mpeg");

            $('#chatContainer').append($audio);
        })
        .catch(error => {
            console.error("Error fetching audio:", error);
        });
}
})