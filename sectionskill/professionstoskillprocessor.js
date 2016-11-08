var neo4j = require('neo4j');

console.log("About to connect to neo4j DB ");
try {

var db = new neo4j.GraphDatabase('http://localhost:7474');
} catch (err) {
    console.log("Error in obtaining db connection to neo4j ", err);
}
// var db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


professionskill = function(skillname, candidateid, successCB, errorCB) {

    console.log("----------------------------", skillname, candidateid);
    db.cypher({
        query: 'MATCH (c:Candidate{name:{candidateid}})-[r:working_as]->(p:Profession) MATCH (p)-[rel:PRIMARY]->(sk:Skill{name:{skillname}}) RETURN count(rel) as x',
        params: {
            candidateid: candidateid,
            skillname: skillname
        }
    }, function(err, results) {
        if (err) {
            errorCB(err);
            //console.log(err);
        } else {
            //console.log("inside professionskill ****************");
            // var value = results[0];
            var v = results[0].x;

            //console.log("@@@@@@@@@@@@@@@@@@@@@@@@",);
            successCB(v);

        }
    });
}

module.exports = {
    professionskill: professionskill
}
