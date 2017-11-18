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
            // COnnected to DB, pool -1
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

module.exports = router;