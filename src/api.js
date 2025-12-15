import mockData from './mock-data';


/**
 *
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */


//the following funciton isnt working so im going to try a workaround to see if the tests
//themselves work

// export const extractLocations = (events) => {
//   const extractedLocations = events.map((event) => event.location);
//   const locations = [...new Set(extractedLocations)];
//   return locations;
// };

export const extractLocations = (events) => {
  if (!Array.isArray(events)) return []; // <-- Added this line
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getEvents = async () => {
  return mockData;
};