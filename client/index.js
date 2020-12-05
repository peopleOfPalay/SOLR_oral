const SolrNode = require('solr-node');
const movies = require('../server/mydata/movie.json');

var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'movies',
    protocol: 'http'
});

// Search
const users_ratingQuery = {
    users_rating: '[* TO 1.5]'
};

// Build a search query var
const searchQuery = client.query()
    .q(users_ratingQuery)
    .addParams({
        wt: 'json',
        fl: 'title',
        indent: true
    });

client.search(searchQuery, function (err, result) {
    if (err) {
        console.log(err);
        return;
    }

    const response = result.response;
    console.log(response);

    if (response && response.docs) {
        response.docs.forEach((doc) => {
            console.log(doc);
        })
    }
});