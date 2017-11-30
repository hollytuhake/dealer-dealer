var express = require('express');
var pg = require('pg');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


//This GET route will get the dealers
router.get('/', function (req, res) {
    console.log('getting dealers');
    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'SELECT * FROM "dealers";';
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
}); //End GET route to get dealers


router.post('/', function (req, res) {
    var dealer = req.body; // This the data we sent
    console.log(dealer); // Has a name and cost
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // Connected to DB, pool -1
            var queryText = 'INSERT INTO "dealers" ("name", "discount", "country", "state", "city", "notes", "shippingpref", "shippingcontact", "marketingcontact", "paymentcontact", "streetaddress", "leadsource") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
            db.query(queryText, [
                dealer.name, 
                dealer.discount, 
                dealer.country,
                dealer.state, 
                dealer.city,
                dealer.notes,
                dealer.shippingpref,
                dealer.shippingcontact,
                dealer.marketingcontact,
                dealer.paymentcontact,
                dealer.streetaddress, 
                dealer.leadsource
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

// PUT (UPDATE) route
router.put('/:did', function (req, res) {
    // product/4 will assign req.params.did = 4;
    var dealerId = req.params.did;
    var dealer = req.body;
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // Connected to the db, pool -1
            var queryText = 'UPDATE "dealers" SET "name" = $2, "discount" =$3, "country" = $4, "state" = $5, "city" = $6, "notes" = $7, "shippingpref" = $8, "shippingcontact" = $9, "marketingcontact" = $10, "paymentcontact" = $11, "streetaddress" = $12, "leadsource" = $13, "user_id" = $14, WHERE "id" = $1;';
            db.query(queryText, [
                dealerId,
                dealer.name,
                dealer.discount,
                dealer.country,
                dealer.state,
                dealer.city,
                dealer.notes,
                dealer.shippingpref,
                dealer.shippingcontact,
                dealer.marketingcontact,
                dealer.paymentcontact,
                dealer.streetaddress,
                dealer.leadsource,
                dealer.user_id], 
                function (errorMakingQuery, result) {
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

router.delete('/:did', function (req, res) {
    console.log('in Delete Dealer in Router');
    var dealerId = req.params.did;
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // connected to the db, pool -1
            var queryText = 'DELETE from "dealers" WHERE "id" = $1;';
            db.query(queryText, [dealerId], function (errorMakingQuery, result) {
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

module.exports = router;