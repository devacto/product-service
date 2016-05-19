# product-service [![Build Status](https://travis-ci.org/devacto/product-service.svg?branch=master)](https://travis-ci.org/devacto/product-service) [![Dependency Status](https://gemnasium.com/badges/github.com/devacto/product-service.svg)](https://gemnasium.com/github.com/devacto/product-service)

A sample microservice written in NodeJS using `restify` among other things.

## Task

Write an API for a shopping cart that supports adding and removing items, applying discount coupons. The API should calculate total purchase amount.

## Assumption

A cart is identified by `timestamp`. Valid coupon is hard-coded for now.

## Endpoints

* `GET    /cart?12569537329` to get items and total in a shopping cart.
* `PUT    /cart` to create / update shopping cart.
* `PATCH  /cart` to modify some items in a shopping cart.
* `DELETE /cart` to delete cart.

* `GET    /admin/carts` to view a list of carts in the system.

## Request body

```
{
  "timestamp": "12569537329",
  "products": [
    {
      "id": 1,
      "quantity": 1
    },
    {
      "id": 2,
      "quantity": 2
    }
  ],
  "coupon": "TESTCOUPON"
}
```

## Response body

```
{
  "errors": [
    "Product 326 is not found."
  ]
}
```

```
{
  "cart": {
    "timestamp": "12569537329",
  }
}
```

## Database

We need to keep a database of:
1. carts
2. some sample products

## Return codes

* 200(OK) - Operation successful.
* 201(Created) - Item created.

## Technical checklist

- [x] Setup project.
- [ ] Setup unit and acceptance tests.
- [x] Setup Travis CI and put a badge.
- [x] Deploy to Heroku.
- [ ] Setup dependency management using david-dm and put a badge.
- [ ] Setup code coverage using Coveralls.io and put a badge.
