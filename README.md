
## Exchange service

This service use CryptoCompare to track actual prices;

##### URL: https://mdx6s7mkli.execute-api.us-east-1.amazonaws.com/prod



### Endpoints

#### Load All Products

##### Endpoint GET `/v1/products`
No parameters

#### Load Product

##### Endpoint GET `/v1/products/:code[?quote]`
| Parameter | Value  | Required | Default |
| ----------|--------| --------:|---------|
| code      | String | Yes      | -       |
| quote     | String | No       | USD     |

| Parameter | Value | Required | Default

#### Create Product

##### Endpoint POST `/v1/products`

| Parameter   | Value  | Required | Default |
| ------------|--------| --------:|---------|
| code        | String | Yes      | -       |
| name        | String | Yes      | -       |
| price       | Number | Yes      | -       |
| description | Number | No      | -       |


#### Delete Product

##### Endpoint DELETE `/v1/products/:code`
| Parameter   | Value  | Required | Default |
| ------------|--------| --------:|---------|
| code        | String | Yes      | -       |



#### Load Top Products

##### Endpoint GET `/v1/products[?quote]`

| Parameter | Value  | Required | Default |
| ----------|--------| --------:|---------|
| code      | String | Yes      | -       |
| quote     | String | No       | USD     |