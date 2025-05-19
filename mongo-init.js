// Initialize the ruda-wrona database
db = db.getSiblingDB('ruda-wrona');

// Create the sections collection if it doesn't exist and insert the main section
db.sections.insertOne({
  path: "/dzialy/glowna",
  name: "Główna"
});