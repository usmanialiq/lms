# Tour Karao - APIs


## Requirements

- Install MongoDB
- Install Node.js
- Install Yarn Package

## Configuration Files

- .eslintrc.js
- .gitignore
- package.json

## Quick start

- Install dependencies: `npm install` or `yarn install` (Yarn Recommended)
- Start the server: `npm run start:dev` or `yarn start:dev`
- DEV URL: `localhost:3001`

## File Structure

Within this repo you'll find the following directories and files:

```
ws_server

├── .eslintrc.js
├── .gitignore
├── LICENSE.txt
├── package.json
├── README.md
├── bin
    └── www
└── app
	├── config
	│	├── keys.js
	|	└── passport.js
	├── constants
        │   └── messages
        │       ├── errors.js
	│	├── index.js
	│	└── success.js
	├── db
	│	└── connection.js
	├── functions
	│	├── bookings.js
	│	├── users.js
	│	└── venues.js
        ├── models
	│	├── Booking.js
	│	├── User.js
	│	└── Venue.js
	├── operations
	│	├── email
	│		└── index.js
	│	└── upload
	│		└── cloudinary.js
        ├── routes
	│	└── index.js
        ├── services
	│	├── auth.js
	│	├── bookings.js
	│	├── index.js
	│	├── users.js
	│	└── venues.js
        ├── utils
	│	├── expiry.js
	│	└── pinGenerate.js
        ├── validation
	│	├── booking.js
	│	├── index.js
	│	├── is-empty.js
	│	├── login.js
	│	├── register.js
	│	└── venue.js
```

## Author

- Name: Muhammad Usma Ali
- Email: usman.ali@findmyadventure.pk
