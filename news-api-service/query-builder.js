samples = require("./samples");

function getCategories(attributes) {
    var categoriesQueryString = "";
    var categories = "";
    if (attributes && attributes.categories) {
        categories = attributes.categories;
        if (categories) {
            for(item in categories){
                console.log("Item = " + categories[item]);
                if (categoriesQueryString.length == 0) {
                    categoriesQueryString = "("
                } else {
                    categoriesQueryString = categoriesQueryString + "|"
                }
                categoriesQueryString = categoriesQueryString + "enriched_text.concepts.text:'" + categories[item] + "'";
            }
        }
    }
    if (categoriesQueryString.length > 0) {
        categoriesQueryString = categoriesQueryString + ")";
    }
    console.log("categoriesQueryString = " + categoriesQueryString);
    return categoriesQueryString;
}


function getSources(attributes) {
    var sourcesQueryString = ""
    var sources = "";
    if (attributes.sources) {
        sources = attributes.sources
        if (sources) {
            for(item in sources){
                console.log("Item = " + sources[item]);
                if (sourcesQueryString.length == 0) {
                    sourcesQueryString = "("
                } else {
                    sourcesQueryString = sourcesQueryString + "|"
                }
                sourcesQueryString = sourcesQueryString + "host:'" + sources[item] + "'";
            }
        }
    }
    if (sourcesQueryString.length > 0) {
        sourcesQueryString = sourcesQueryString + ")";
    }
    return sourcesQueryString;
}


function getQuery(attributes) {
    var categories = getCategories(attributes);
    var sources = getSources(attributes);
    var query = samples.financial_news_query;
    query = query + "," + samples.pub_date;

    var filterValue = "";
    if (attributes.language) {
        filterValue = "language:" + attributes.language;
    } else {
        filterValue = "language:en";
    }
    /*
    if (filterValue.length > 0) {
        filterValue = filterValue + "," + pub_date;
    } else {
        filterValue = pub_date;
    }
    */
    if (categories.length > 0) {
        if (filterValue.length > 0) {
            filterValue = filterValue + "," + categories;
        } else {
            filterValue = categories;
        }
    }
    if (sources.length > 0) {
        if (filterValue.length > 0) {
            filterValue = filterValue + "," + sources;
        } else {
            filterValue = sources;
        }
    }

    var queryObject = {};
    queryObject.query = query;
    queryObject.filter = filterValue;
    queryObject.deduplicate = attributes.deduplicate;
    queryObject.count = attributes.count;
    queryObject.return = attributes.return;
    //console.log("Full query in query builder = " + JSON.stringify(query));
    return queryObject;
}

//getQuery(samples.sample_attributes);
module.exports.getQuery = getQuery;