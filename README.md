# OpenDicio

Simple and extensible dictionary API for Brazilian Portuguese. I made this mainly to use with [Babel](https://github.com/wmorellato/babel), but it may be useful to someone else. The idea is, somewhere in the future, extend it to something like [Datamuse](https://www.datamuse.com/api/), although it is still far from it. Custom dictionaries can be attached to OpenDicio following a format specified below.

## Demo

You can try OpenDicio in [https://opendicio.herokuapp.com/api/v1](https://opendicio.herokuapp.com/api/v1). Since I'm using Heroku's free tier, it may take a few seconds to bring the app online.

## Usage

Documentation gerenated with [openapi-generator](https://github.com/OpenAPITools/openapi-generator) from the OpenAPI specification in [openapi-spec.json](./docs/openapi-spec.json).

All URIs are relative to *https://opendicio.herokuapp.com/api/v1*

Class | HTTP request | Description
------------ | ------------- | -------------
*Dictionary* | **GET** /mean/{word} | Retrieve the full dictionary entry for a given word.
*Dictionary* | **GET** /syn/{word} | Retrieve synonyms for a given word.


<a name="documentation-for-models"></a>

## Documentation for Models

### Response

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | [**Integer**](integer.md) | Total number of entries found. | [optional] [default to null]
**dicts** | [**List**](string.md) | Dictionaries queried. | [optional] [default to null]
**data** | [**Object**](.md) | Data grouped by each dictionary queried. | [optional] [default to null]

<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.
