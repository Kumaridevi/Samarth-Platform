let router = require('express').Router();
let circleProcessor = require('./circleProcessor');

// Efective HTTP GET /circles
// Returns all the circles in the system with pagination as specified in query parameter
// router.get("/", function(req, res) {
//     res.json([]);
// })


// Effective API URL is HTTP GET /circles/:entityname
// Finds circles related with specified entity name
router.get('/:entityname', function(req, res) {

    try {
        console.log(req.params);
        circleProcessor.getCircle(req.params,

            function(data) {

              // console.log("inget circle");
              // console.log("circles : ", data);
                res.json(data);
                console.log(data);

            },
            function(err) {
                res.json(err);
            });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});

// adding relation
// HTTP POST /circles/:circlename/relation/, with POST body container relationship name, and enity with which this relation has to be established
// router.post('/:circlename/relation/',
router.post('/circlerelation',
    function(req, res) {
        try {
            circleProcessor.createRelation(req, function(err) {
                console.log(err);
            }, function(result) {
                console.log(result);
            });
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
        }
    });

// creating circles in graph and mongo
// Effective URL is HTTP POST /circles/
// router.post('/', function(req, res) {
router.post('/', function(req, res) {
    try {
        circleProcessor.circlePost(req.body,
            function(err) {
                if (err) {

                    res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
                }
            });
    } // end try
    catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    } // end c
});

module.exports = router;
