// src/utils/realEstateFields.js

export const realEstateInitialValues = {
    title: "",
    price: "",
    description: "",
    streetName: "",
    city: "",
    state: "",
    country: "",
    countryCode: "",
    category: "",
    type: "",
    area: "",
    floors: "",
    facing: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [],
  };
  
  export const propertyCategories = [
    "House",
    "Apartment",
    "Room",
    "Shop Space",
    "Office Space",
  ];
  
  export const propertyTypes = ["Rent", "Sale"];
  
  export const propertyFacingOptions = [
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ];
  
  export const amenitiesOptions = [
    "WiFi",
    "AC",
    "Parking",
    "Furnished",
    "Elevator",
    "Swimming Pool",
  ];