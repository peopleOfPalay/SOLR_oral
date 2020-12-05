const SolrNode = require('solr-node');

// Cient
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'movies',
    protocol: 'http'
});
// Lore
console.log("On souhaite supprimer de notre base de donnée les pires films de l'histoire !");
console.log("On va donc rechercher tous les films avec une note inférieur à 1.5/10.");

// Search
const users_ratingQuery = 'fl=title%2C users_rating%2C directors&q=users_rating%3A [* TO 1.5]&rows=10&sort=users_rating asc&wt=json';
client.search(users_ratingQuery, function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    const response = result.response;
    console.log();
    console.log(`Quelle horreur, ${response.numFound} films ont une note inférieur à 1.5/10 !`);
    console.log();
    console.log("Voici les 10 pires films : ");
    if (response && response.docs) {
        response.docs.forEach((doc) => {
            console.log(`   - ${doc.title[0]} (de ${doc.directors[0]})`);
        })
    }

    // Delete
    console.log();
    console.log("Nous allons donc maintenant supprimer tous ces films de notre bd !");
    const stringQuery = 'users_rating:[* TO 1.5]'
    client.delete(stringQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Normalemet tout a été effacé ! :)");
        console.log("Vérifion quand meme !");
        console.log();
    
        // Verification
        client.search(users_ratingQuery, function (err, result) {
            const response = result.response;
            if (response.numFound === 0) {
                console.log(`Victoire, il reste ${response.numFound} film !!!!!`);
            } else {
                console.log(`Oooooops, il reste ${response.numFound} films :/`);
            }
        });
    });
});