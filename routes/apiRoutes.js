var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {

  let articlesList = [];

  function saved(req, res) {
    let articles = [
      { 
        headline: "Saved Headline 1",
        summary:  "Saved Summary 1",
        url:      "Saved URL 1"
      }, {
        headline: "Saved Headline 2",
        summary:  "Saved Summary 2",
        url:      "Saved URL 2"
      }, {
        headline: "Saved Headline 3",
        summary:  "Saved Summary 3",
        url:      "Saved URL 3"
      }
    ];

    res.render("articles", {
      pageheader: "Saved Articles",
      articles: articles
    });
  }

  function scraped(req, res) {
    let articles = [
      { 
        headline: "Scraped Headline 1",
        summary:  "Scraped Summary 1",
        url:      "Scraped URL 1"
      }, {
        headline: "Scraped Headline 2",
        summary:  "Scraped Summary 2",
        url:      "Scraped URL 2"
      }, {
        headline: "Scraped Headline 3",
        summary:  "Scraped Summary 3",
        url:      "Scraped URL 3"
      }
    ];

    res.render("articles", {
      pageheader: "Scraped Articles",
      articles: articles
    });
  }

  function scrape(req, result) {
    articlesList = [];

    request("https://www.nytimes.com/section/us", function(err, res, html) {
      var $ = cheerio.load(html);

      $(".stream").first().find("div.story-meta").each(function(i, element) {
        let storyId = $(element).closest("li").attr("id");
        let url = $(element).parent().attr("href");
        let headline = $(element).children("h2.headline").text().trim();
        let summary = $(element).children("p.summary").text().trim();

        articlesList.push({
          storyId: storyId,
          headline: headline,
          summary: summary,
          url: url
        });
      });

      result.render("articles", {
        pageheader: "Articles",
        articles: articlesList
      });

    });
  }

  /////////////////////////////////////////////////////////
  // Routes
  app.get("/", function(req, res) {
    console.log("Entered / Route");
    scrape(req, res);

    // res.render("articles", {
    //   pageheader: "Articles",
    //   articles: articlesList
    // });

  });

  app.get("/scraped", function(req, res) {
    console.log("Entered /scraped Route");
    scraped(req, res);
  });

  app.get("/saved", function(req, res) {
    console.log("Entered /saved Route");
    saved(req, res);
  });

};
