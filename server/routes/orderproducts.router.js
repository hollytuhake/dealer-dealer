var express = require('express');
var pg = require('pg');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    console.log('getting orders');
    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'SELECT * FROM "orders";';
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
}); //End GET route to get orders

router.post('/', function (req, res) {
    console.log('in order router');

    var orderProduct = req.body; // data sent
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // Connected to DB, pool -1
            var queryText = 'INSERT INTO "order_products" ("quantity", "order_id","product_id") VALUES ($1, $2, $3);';
            db.query(queryText, [
                orderProduct.quantity,
                orderProduct.order_id,
                orderProduct.product_id
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

// router.delete('/:id', function (req, res) {
//     var orderproductId = req.params.id;
//     // Attempt to connect to the database
//     pool.connect(function (errorConnectingToDb, db, done) {
//         if (errorConnectingToDb) {
//             // There was an error and no connection was made
//             console.log('Error connecting', errorConnectingToDb);
//             res.sendStatus(500);
//         } else {
//             // connected to the db, pool -1
//             var queryText = 'DELETE from "order_products" WHERE "id" = $1;';
//             db.query(queryText, [orderproductId], function (errorMakingQuery, result) {
//                 // We have received an error or result at this point
//                 done(); // pool +1
//                 if (errorMakingQuery) {
//                     console.log('Error making query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }
//             }); // END QUERY
//         }
//     }); // END POOL
// }); // END DELETE ROUTE

// router.post('/', function (req, res) {
//     console.log('in order router');

//     var order = req.body; // data sent
//     console.log(order);
//     // Attempt to connect to the database
//     pool.connect(function (errorConnectingToDb, db, done) {
//         if (errorConnectingToDb) {
//             // There was an error and no connection was made
//             console.log('Error connecting', errorConnectingToDb);
//             res.sendStatus(500);
//         } else {
//             // Connected to DB, pool -1
//             var queryText = 'INSERT INTO "orders" ("dateordered", "dealer_id","quotedlead", "shipdate", "notes", "discounts") VALUES ($1, $2, $3, $4, $5, $6);';
//             db.query(queryText, [
//                 order.dateordered,
//                 order.dealer_id,
//                 order.quotedlead,
//                 order.shipdate,
//                 order.notes,
//                 order.discounts,
//             ],
//                 function (errorMakingQuery, result) {
//                     // We have received an error or result at this point
//                     done(); // pool +1
//                     if (errorMakingQuery) {
//                         console.log('Error making query', errorMakingQuery);
//                         res.sendStatus(500);
//                     } else {
//                         res.sendStatus(201);
//                     }
//                 }); // END QUERY
//         }
//     }); // END POOL
// }); // END POST ROUTE

// // PUT (UPDATE) route
// router.put('/:oid', function (req, res) {
//     var orderId = req.params.oid;
//     var order = req.body;
//     // Attempt to connect to the database
//     pool.connect(function (errorConnectingToDb, db, done) {
//         if (errorConnectingToDb) {
//             // There was an error and no connection was made
//             console.log('Error connecting', errorConnectingToDb);
//             res.sendStatus(500);
//         } else {
//             // Connected to the db, pool -1
//             var queryText = 'UPDATE "orders" SET "dateordered" = $2, "dealer_id" = $3, "quotedlead" = $4, "shipdate" = $5, "notes" = $6, "discounts" = $7 WHERE "id" = $1;';
//             db.query(queryText, [orderId, order.dateordered, order.dealer_id, order.quotedlead, order.shipdate, order.notes, order.discounts], function (errorMakingQuery, result) {
//                 // We have received an error or result at this point
//                 done(); // pool +1
//                 if (errorMakingQuery) {
//                     console.log('Error making query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else {
//                     console.log(result.rows);
//                     res.send(result.rows);
//                 }
//             }); // END QUERY
//         }
//     }); // END POOL
// }); // END PUT ROUTE

module.exports = router;