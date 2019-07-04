## Background

The purpose was to develop a reward system just like https://rewards.astro.com.my/.


## Tech stack
    - Node v10.10.0
    - Express.js
    - MongoDB


## Setup development environment
    - clone repo
    - create an .env file in the root directory of the repo
    - the .env file should have the following variables
        - AWS_ACCESS_KEY_ID
        - AWS_SECRET_ACCESS_KEY
        - S3_BUCKET_NAME
        - DB_URL (i.e. mongodb://localhost:27017/astro)
        - PORT (default is 3000)
        - SUPERUSER
    - run `yarn start`


## Resources
    - Tenant
        - Company
            - Reward
        - Subscriber
        - Promocode


## Schema Definitions
    Schemas were designed based on the query patterns made by the application. Some of the queries made by the portal are:

        - Give me the all active rewards for a tenant
        - Give me the detail of a reward
        - Create a promocode for a subscriber and reward
        etc.


    - Tenant
        - name
        - createdAt
        - updatedAt

    - Company
        - tenant (foreign key)
        - name
        - Logo (image url)
        - website
        - createdAt
        - updatedAt

    - Reward
        - company (foreign key)
        - title
        - subTitle
        - thumbnail (image url)
        - description
        - redemptionPeriodStart
        - redemptionPeriodEnd
        - redemptionType (enum string - Online/Store)
        - locationUrl
        - createdAt
        - updatedAt

    - Subscriber
        - tenant (foreign key)
        - idType
        - idNumber
        - accountNumber
        - createdAt
        - updatedAt

    - Promocode
        - reward (foreign key)
        - subscriber (foreign key)
        - code (uuid/v4 code)
        - createdAt
        - updatedAt


## APIs

### Tenant
    - POST: /v1/tenants
        - required fields
            - name
        - required headers
            - { superuser: '80bcd7cf-2e6c-4c64-adc7-3535944e731c' }

    - PUT, DELETE, GET: /v1/tenants/:id
    - Limitations
        - Currently there is no Auth implemented, tenants end points are protected by just a superuser header
        -  There is no boolean fields to activate or deactivate a tenant


[ *The following end points are a tenant specific, therefore a tenant header is required for all following end points. For example: { headers: { tenant: 'xxxxx' } where 'xxxxx' is the tenant id. In real world, this is be replaced by an Auth system*]

### Company
    - POST: /v1/companies
        - required fields
            - name
            - logo (upload is small image, there is no resizing done by api)
            - website (URL)

    - PUT /v1/companies/:id
        - fields
            - name
            - logo

        - Limitations
            - You can't edit logo

    - PUT, DELETE /v1/companies/:id

### Subscriber
    - POST: /v1/subscribers
        - required fields
            - idType (valid values are 'Passport', 'Police', 'Army', 'Navy', 'Old NIRC', 'MyKad')
            - idNumber
            - accountNumber (must be 10 or 12 digits long)

    - PUT /v1/subscribers/:id
    - PUT, DELETE /v1/subscribers/:id

### Reward
    - POST: /v1/rewards
        - required fields
            - company (id)
            - title
            - subTitle
            - description
            - thumbnail (image url, upload image in exact size, no resizing is done by api)
            - redemptionPeriodStart (YYYY-MM-DD)
            - redemptionPeriodEnd (YYYY-MM-DD)
            - redemptionType (enum string - online/store, default is online)
            - locationUrl (optional, provide value when you choose redemptionType as store)

    - PUT /v1/rewards/:id
        - Limitations
            - You can't edit thumbnail
    - PUT, DELETE /v1/rewards/:id

### Promocode
    - POST: /v1/promocode
        - required fields
            - reward (id)
            - idType (valid values are 'Passport', 'Police', 'Army', 'Navy', 'Old NIRC', 'MyKad')
            - idNumber
            - accountNumber (must be 10 or 12 digits long)
