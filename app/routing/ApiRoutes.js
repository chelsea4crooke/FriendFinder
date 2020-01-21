var friends = require("../data/friends");

module.exports = function(app) {
  https://cors-anywhere.herokuapp.com/
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;
    var bestMatch = {
      name: " ",
      photo: " ",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item){
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name" + userName);
    console.log("User Scores" + userScores);

    var sum = b.reduce((a, b ) => a+ b, 0);
    console.log("some of users scores " + sum);
    console.log("Best match friend difference " + bestMatch.friendDifference);
    console.log("=========================");

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;
      console.log("total difference " + totalDifference);
      console.log("best match friend difference " + bestMatch.friendDifference);

      var bfriendScore = friends[i].scores.reduce((a ,b) => a+ b, 0);
      console.log("total friend score " + bfriendScore);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log("------------------> " + totalDifference);

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      console.log(totalDifference + "total difference");
    }
    console.log(bestMatch);
    friends.push(userData);
    console.log("new user added");
    console.log(userData);
    res.json(bestMatch);
  });
};
