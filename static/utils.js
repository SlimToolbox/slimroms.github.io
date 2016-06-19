function get(url) {
  return new Promise(function(resolve) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState == 4 && (req.status == 200 || (!req.status && req.responseText.length)))
        resolve(req.responseText);
    };
    req.open('GET', url, true);
    req.send('');
  });
}

var load_posts = (function() {
  var slim_posts = [];
  var fetched = null;
  return function() {
    return new Promise(function(resolve) {
      if (fetched === null) {
        fetched = false;
        get('data/posts.json').then(function(text) {
          var posts = JSON.parse(text);
          for (var i in posts)
            if (posts.hasOwnProperty(i))
              slim_posts.push({
                'title': posts[i].title,
                'date': posts[i].date,
                'content': posts[i].content.join('\n')
              });
          fetched = true;
          resolve(slim_posts);
        });
      } else if (!fetched) {
        var inter = setInterval(function() {
          if (fetched) {
            clearInterval(inter);
            resolve(slim_posts);
          }
        }, 20);
      } else
          resolve(slim_posts);
    });
  }
})();


var get_post_from_url_name = (function() {
  var slim_posts = {};
  var built = null;
  return function(url_name) {
    return new Promise(function(resolve) {
      if (built === null) {
        built = false;
        load_posts().then(function(posts) {
          for (var i in posts)
            if (posts.hasOwnProperty(i))
              slim_posts[encodeURIComponent(posts[i]['title'].replace(' ', '-'))] = posts[i];
          built = true;
          resolve(slim_posts[url_name] || null);
        });
      } else if (!built) {
        var inter = setInterval(function() {
          if (built) {
            clearInterval(inter);
            resolve(slim_posts[url_name] || null);
          }
        }, 20);
      } else
        resolve(slim_posts[url_name] || null);
    });
  }
})();
