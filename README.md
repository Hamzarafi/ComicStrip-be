<h1 align="center">Welcome to Comic-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> This project is a Node.js and Express-based backend service for managing XKCD comic data. It fetches comic details from the XKCD API, handles view counts, and serves the data to the frontend. View counts for each comic are stored in an SQLite database, and the API provides endpoints to retrieve comic details, track views, and get random comics.

**Features:**
- Fetch comic details from the XKCD API.
- Track and store the number of times each comic is viewed.
- Serve comic data to the frontend with view count.
- API to fetch the latest comic, navigate by comic number, or get a random comic.
- Error handling for API requests and database operations.

**Technologies Used:**
- Node.js
- Express
- SQLite for persistent storage
- Axios for API requests
- Deployed with CI/CD pipelines


## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Development

```sh
npm run dev
```

## Author

👤 **Hamza**

* Github: [@hamzarafi](https://github.com/hamzarafi)
