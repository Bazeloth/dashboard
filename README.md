# Introduction

This is an assignment from AI Infrasolutions. 

## Installation instructions

Install dependencies first:

```
npm install
```

Then start the dev server:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Choices

The assigment was to create a dashboard that displays data using a mocked API. A real API would use a browser fetch to retrieve data from an endpoint. This is why the `useSensor` hook returns a promise so it can easily be replaced with an actual browser fetch.

### Technical choices

- I added Tailwind CSS to help with styling.
- I added Prettier to help with code formatting.
- I added comments to parts that needed some extra clarification, however the code should be self-explanatory by default.

### UI
- An error message is shown if something goes wrong during data retrieval. Additionally, a red border was added to the sensor card to add a visual indicator for the visually impaired.
- The UI is responsive and adjusts to different screen sizes and is WCAG compliant.

### Other
- I did not add any unit tests but i would if this were a real project.
- I left in reportWebVitals and setupTests.ts files for future use, but as of right now they are not used.