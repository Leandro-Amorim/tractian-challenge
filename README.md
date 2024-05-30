
<h1 align="center">
  <br>
  <a href="https://tractian-challenge-leandro-amorim.vercel.app/"><img src="https://raw.githubusercontent.com/Leandro-Amorim/tractian-challenge/main/images/screenshot.jpg" alt="Screenshot"></a>
  <br>
  Tractian Front End Challenge
  <br>
</h1>

<h4 align="center">A tree view application made for Tractian's frontend challenge. You can see a working example at <a href="https://tractian-challenge-leandro-amorim.vercel.app/" target="_blank">https://tractian-challenge-leandro-amorim.vercel.app</a>.</h4>

<p align="center">
  <a href="#how-it-works">How it works</a> •
<a href="#improvements-and-performance-optimizations">Improvements and performance optimizations</a> •
  <a href="#setup">Setup</a> •
  <a href="#used-packages">Used packages</a>
</p>

## How it works

* Data acquired from the Tractian API (locations and assets) is parsed as a tree;
* Each element in the tree is filtered according to the search criteria (name, energy sensor and alert status);
* The resulting tree is then flattened into a list so that it can be consumed by the virtualized list component.

## Improvements and performance optimizations

* All rows in the list are memoized to prevent unnecessary rerenders;
* The list is virtualized so that only components being displayed on the screen are rendered;
* Fully responsive layout;
* Buttons to collapse or expand all rows;
* Unit tests (basic snapshot test for the main React component and unit tests for all the functions involved in creating and filtering the tree).

## Setup

### Prerequisites

Make sure you have a working installation of [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/).

### Step by step

* From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Leandro-Amorim/tractian-challenge

# Go into the repository
$ cd tractian-challenge

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Used packages

This project uses the following open source software:

- [Vite](https://vitejs.dev/) - To bootstrap a new React project.
- [Tailwind](https://tailwindcss.com/) - To style UI components.
- [Recoil](https://recoiljs.org/) - To manage the application state.
- [TanStack Query](https://tanstack.com/query) - To obtain API data easily, with caching and revalidation included.
- [React Window](https://github.com/bvaughn/react-window) - To virtualize the elements of the list and make it possible to view a large amount of data.
- [Jest](https://jestjs.io/) - For creating unit tests.