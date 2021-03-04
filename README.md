# somebirdsColorAndSizeSelection
Shoe color &amp; size selection service

## API

### Create / POST

#### Endpoint: `/shoes`

#### Request Body:
```
{ "name": string,
  "model": number,
  "color": [numbers],
  "quantity": [{"size": number, "quantity": number}]
}
```

#### Request Body Example:
```
{
    "name": "Test Shoe",
    "model": 107,
    "size" : [4, 5, 6],
    "color": [1, 2, 3],
    "quantity": [{"size": 4, "color": 1, "quantity": 10}, {"size": 5, "color": 2, "quantity": 10}, {"size": 6, "color": 3, "quantity": 10}]
}
```

### Read / GET

#### Endpoints:

GET colors of shoe: `/shoes/:shoeId/colors`
GET sizes of shoe: `/shoes/:shoeId/sizes`
GET quantity of each size of certain color shoe: `/shoes/:shoeId/colors/:colorId/quantities`

#### Response Example for `/shoes/7/colors`:
```
[{"id":4,"name":"Cosmos","shoe_color":"Dark Slate Blue","sole_color":"Indigo","shoe_hex":"#483D8B","sole_hex":"#4B0082","limited":false},{"id":6,"name":"Blue Burst","shoe_color":"Deep Sky Blue","sole_color":"Navy","shoe_hex":"#00BFFF","sole_hex":"#000080","limited":false},...]
```
#### Response Example for `/shoes/5/sizes`:
```
[{"id":7,"size":8},{"id":8,"size":8.5},{"id":9,"size":9},...]
```
#### Response Example for `/shoes/7/colors/5/quantities`:
```
[{"size_id":7,"quantity":0},{"size_id":8,"quantity":0},{"size_id":9,"quantity":3},{"size_id":10,"quantity":0},{"size_id":11,"quantity":7},...]
```

### Update / PATCH

#### Endpoint: `/shoes:shoeId`

#### Request Body:
```
{ "name": string,
  "model": number,
  "color": number,
  "size": number,
  "quantity": number
}
```
#### Request Body Example:
```
{
    "name": "Testing Shoe",
    "model": 99,
    "size" : 16,
    "color": 6,
    "quantity": 200
}
```

### Delete / DELETE

#### Endpoint: `/shoes:shoeId`

## Repo Setup
### Run npm install
```
npm install
```
### Environment Variables
Create a .env file within repo root directory and add
```
DEV_DB_HOST=localhost
```

### MySQL Database Setup
```
npm run db:seed
```
This will create a database called fec_somebirds_shoeinventory

*in order to seed the database, there must be a 'student' account with create, insert, and drop permissions.
To create this login account with all the available permissions (for simplicity), log in to MySQL on an administrative account and run the following commands
```
CREATE USER 'student'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'student'@'localhost';
```

### Build Bundle Using Webpack
Run the following to generate the bundle.js file that is needed to generate our color & size selection component
```
npm run build
```

### After Set Up
Run the following to initiate the server
```
npm run start
```
and point your browser to **localhost:3001**