module.exports = function(app) {

  app.get("/", function(req, res) {
    console.log("Entered / Route");
    let titles = [
      { title: "Article 1" },
      { title: "Article 20" },
      { title: "Article 300" }
    ];

    res.render("all-articles", {
      articles: titles
    });
  });

};
