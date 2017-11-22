var express = require('express');
var pg = require('pg');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


//GET route to get products
router.get('/', function (req, res) {
    console.log('getting prodcuts');
    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'SELECT * FROM "products";';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                    console.log(result.rows);
                }
            });
        }
    });
}); //End GET route to get products


//BEGIN POST ROUTE FOR NEW PRODUCT
router.post('/', function (req, res) {
    var product = req.body;
    console.log(product); 
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // Connected to DB, pool -1
            var queryText = 'INSERT INTO "products" ("name", "costtomake", "directprice", "dealerprice", "distroprice", "upc") VALUES ($1, $2, $3, $4, $5, $6);';
            db.query(queryText, [
                product.name,
                product.costtomake,
                product.directprice,
                product.dealerprice,
                product.distroprice,
                product.upc
            ],
                function (errorMakingQuery, result) {
                    // We have received an error or result at this point
                    done(); // pool +1
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                }); // END QUERY
        }
    }); // END POOL
}); // END POST ROUTE

router.delete('/:pid', function (req, res) {
    var productId = req.params.pid;
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // connected to the db, pool -1
            var queryText = 'DELETE from "products" WHERE "id" = $1;';
            db.query(queryText, [productId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END DELETE ROUTE

// PUT (UPDATE) route
router.put('/:pid', function (req, res) {
    // product/4 will assign req.params.pid = 4;
    var productId = req.params.pid;
    var product = req.body;
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // Connected to the db, pool -1
            var queryText = 'UPDATE "products" SET "name" = $2, "costtomake" =$3, "directprice" = $4, "dealerprice" = $5, "distroprice" = $6, "upc" = $7 WHERE "id" = $1;';
            db.query(queryText, [productId, product.name, product.costtomake, product.directprice, product.dealerprice, product.distroprice, product.upc], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    console.log(result.rows);
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END PUT ROUTE


module.exports = router;