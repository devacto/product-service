# cart-api [![Build Status](https://travis-ci.org/devacto/product-service.svg?branch=master)](https://travis-ci.org/devacto/product-service) [![Dependency Status](https://gemnasium.com/badges/github.com/devacto/product-service.svg)](https://gemnasium.com/github.com/devacto/product-service) [![Code Climate](https://codeclimate.com/github/devacto/product-service/badges/gpa.svg)](https://codeclimate.com/github/devacto/product-service) [![Test Coverage](https://codeclimate.com/github/devacto/product-service/badges/coverage.svg)](https://codeclimate.com/github/devacto/product-service/coverage)

A sample microservice written in NodeJS.

## Task

Write an API for a shopping cart that supports adding and removing items, applying discount coupons. The API should calculate total purchase amount.

## Assumption

Valid coupon is hard-coded for now.

## Endpoints

* `GET /cart` to list possible carts.
* `GET /cart/1` to get items and total in a shopping cart.
* `PUT /cart` to create / update shopping cart.

The body of the `PUT` request looks like
```
{"products":[{"name":"Shirt","price":10,"qty":5},{"name":"Pants","price":10,"qty":2}],"discountCode":"VALIDCODE","total":65,"links":[{"self":"/cart/1"}]}
```

The exact `curl` command looks like
```
curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 74e13850-7a9a-395e-cdee-71b03ee2b6f2" -d '{"products":[{"name":"Shirt","price":10,"qty":5},{"name":"Pants","price":10,"qty":2}],"discountCode":"VALIDCODE","total":65,"links":[{"self":"/cart/1"}]}' "https://ss-cart-api.herokuapp.com/cart/1"
```

## Commands

1. To list all end points `./bin/routes.sh`

2. To run unit and acceptance tests `./bin/test.sh`

3. To start the server for development `./bin/dev.sh`

## Database

We need to keep a database of carts.
