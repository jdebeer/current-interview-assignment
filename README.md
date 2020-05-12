# current-interview-assignment
A small API with two endpoints for tracking user visit locations.

## context:
Current uses a location service provider to help match where a user is when they use their
Current card. This reduces fraud and leads to a more intelligent receipt. This is implemented by being notified whenever a user enters a venue, and then when the card is used, matching the merchant string we receive from Visa with a recently entered venue.

## running it
1. clone this repo
2. copy the `.env.example` file into a new file `.env` which sits next to it
3. add the actual connection string for your Postgres database to the `.env` file
4. run the `init-db.sql` query after initializing your Postgres database (you can skip this if your db has a schema that is compatible with this one)
5. run `npm install` in the root directory
6. run `npm run start-dev` for local development and `npm start` for production

_That's it! Please create an issue on this Github repository to report an error._

## access
* This api is available at the public URL: 

`https://current-interview-assignment.herokuapp.com/`

_this is automatically secured with HTTPS_

## use
### GET /visit
This endpoint expects one of two viable sets of GET parameters when called:

#### Query by visitId
Request shape:
```
{
  visitId: 'a-valid-v4-uuid-corresponding-to-an-exising-visit-record'
}
```

#### Query by userId and some search string
The search string is queried against the _last five_ visit records recorded for the given user, specifically the `name` property. Results will include all location names that fuzzy-match with the given search string, with a threshold of `0.5`.

For more about the fuzzy matching algorithm we employ, see here: <https://github.com/aceakash/string-similarity#readme> 

Request shape:
```
{
  userId: 'a-valid-user-id-corresponding-to-the-user-whose-visits-you-want',
  searchString: 'name of the visited location here' 
}
```

#### Response
Returns an array of up to five matching results of the form:
```
[
  {
      "id": "auto-generated-v4-uuid-here",
      "userId": "user-id-here",
      "name": "the name of some location",
      "createdAt": "2020-05-12T21:25:21.958Z",
      "updatedAt": "2020-05-12T21:25:21.958Z"
  },
  {
      "id": "auto-generated-v4-uuid-here",
      "userId": "user-id-here",
      "name": "the name of some other location",
      "createdAt": "2020-05-12T21:08:14.411Z",
      "updatedAt": "2020-05-12T21:08:14.411Z"
  },
  ...
]
```

Notes:
1. Currently, querying by `visitId` returns only one result, but still comes in the form of an array holding the visit (arrival) object
2. If all three parameters are passed, the endpoint will default to returning one result
matching the `visitId`

### POST /visit
expects a JSON body of the shape:
```
{
  userId: 'user-id-here', // ideally, this is a V4 UUID & GUID in the user records scope
  name: 'name of the visited location here' 
}
```

and returns a JSON body:
```
{
  visitId: 'the-id-of-the-visit-record-just-created' // this is a V4 UUID
}
```

where `visitId` is the auto-generated V4 UUID generated for the given visit (arrival) object


## testing
_Testing is yet to be setup for this repo._