function githubStars(repo, callback) {
  var cacheKey = 'gh_stars_' + repo;
  var cached = localStorage.getItem(cacheKey);

  fetch('https://api.github.com/repos/' + repo)
    .then(function(response) {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then(function(data) {
      var stars = data.stargazers_count;
      if (stars != null) {
        localStorage.setItem(cacheKey, stars);
        callback(stars);
      } else {
        callback(cached || '–');
      }
    })
    .catch(function() {
      callback(cached || '–');
    });
}
