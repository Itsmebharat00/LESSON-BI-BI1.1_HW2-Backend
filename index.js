/** @format */

const { initializingDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
initializingDatabase();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const newHotel = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const saveHotels = await hotel.save();
    console.log("New Hotel Data:", saveHotels);
  } catch (error) {
    throw error;
  }
}

createHotel(newHotel);

// // 1. Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel.

// async function updateHotelById(hotelId, dataToUpdate) {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
//       new: true,
//     });
//     console.log(updatedHotel);
//   } catch (error) {
//     console.log("Error in updating hotel by ID:", error);
//   }
// }

// // updateHotelById("687fa8a471647be586dcb8d6", { checkOutTime: "11:00 AM" });

// // 2. Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. Take the hotel which has the name "Sunset Resort" and update its rating to 4.2. Console the updated hotel.

// async function updateHotelByName(hotelName, dataToUpdate) {
//   try {
//     const updatedHotel = await Hotel.findOneAndUpdate(
//       { name: hotelName },
//       dataToUpdate,
//       {
//         new: true,
//       }
//     );
//     console.log(updatedHotel);
//   } catch (error) {
//     console.log("Error in updating hotel by ID:", error);
//   }
// }
// // updateHotelByName("Sunset Resort", { rating: 4.2 });

// // 3. Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. Take the hotel which has the phone number "+1299655890" and update its phone number  to "+1997687392". Console the updated hotel details.

// async function updateHotelByPhone(phoneNumber, dataToUpdate) {
//   try {
//     const updatedHotel = await Hotel.findOneAndUpdate(
//       { phoneNumber: phoneNumber },
//       dataToUpdate,
//       { new: true }
//     );
//     console.log(updatedHotel);
//   } catch (error) {
//     console.log("Error in updating hotel by phone number:", error);
//   }
// }

// // updateHotelByPhone("+1299655890", { phoneNumber: "+1997687392" });

// // 1. Create a function deleteHotelById that accepts a hotel ID and deletes the hotel data from the db. Take any hotel id from your database and delete the records of that hotel.

// async function deleteHotelById(hotelId) {
//   try {
//     const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
//     console.log("The hotel is deleted:", deletedHotel);
//   } catch (error) {
//     console.log("Error in hotel deletion:", error);
//   }
// }

// // deleteHotelById("687937775f7d13d808068396");

// // 2. Create a function deleteHotelByPhoneNumber that accepts a hotel's phone number and deletes the hotel data from the db. Take any hotel phone number from your database and delete the records of that hotel.

// async function deleteHotelByPhoneNumber(hotelNumber) {
//   try {
//     const deletedHotel = await Hotel.findOneAndDelete({
//       phoneNumber: hotelNumber,
//     });
//     console.log("The hotel is deleted:", deletedHotel);
//   } catch (error) {
//     console.log("Error in hotel deletion:", error);
//   }
// }

// // deleteHotelByPhoneNumber("+1234555890");

// LESSON BE: BE4.1_HW2

// 1. Create an API with route "/hotels" to read all hotels from the Database. Test your API with Postman.

async function readAllHotels() {
  try {
    const allHotels = await Hotel.find();
    return allHotels;
  } catch (error) {
    console.log("Error in fetching hotels:", error);
    throw error;
  }
}

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    console.log("Error in fetching hotels:", error);
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// 2. Create an API with route "/hotels/:hotelName" to read a hotel by its name. Test your API with Postman.

async function readHotelByName(hotelName) {
  try {
    const hotelByName = await Hotel.find({ name: hotelName });
    return hotelByName;
  } catch (error) {
    console.log("Error in fetching hotel by name:", error);
    throw error;
  }
}
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel.length != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    console.log("Error in fetching hotel by name:", error);
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

// 3. Create an API with route "/hotels/directory/:phoneNumber" to read a hotel by phone number. Test your API with Postman.

async function readHotelByPhoneNumber(hotelPhoneNumber) {
  try {
    const hotelByPhone = await Hotel.find({
      phoneNumber: hotelPhoneNumber,
    });
    return hotelByPhone;
  } catch (error) {
    console.log("Error in fetching hotel by phone number:", error);
    throw error;
  }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
    if (hotel.length != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    console.log("Error in fetching hotel by phone number:", error);
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

// 4. Create an API with route "/hotels/rating/:hotelRating" to read all hotels by rating. Test your API with Postman.

async function readHotelByRating(hotelRating) {
  try {
    const hotelByRating = await Hotel.find({ rating: hotelRating });
    return hotelByRating;
  } catch (error) {
    console.log("Error in fetching hotel by rating:", error);
    throw error;
  }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await readHotelByRating(req.params.hotelRating);
    if (hotel.length != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotels found for this rating." });
    }
  } catch (error) {
    console.log("Error in fetching hotel by rating:", error);
    res.status(500).json({ error: "Failed to fetch hotels by rating." });
  }
});

// 5. Create an API with route "/hotels/category/:hotelCategory" to read all hotels by category. Test your API with Postman.

async function readHotelByCategory(hotelCategory) {
  try {
    const hotelByCategory = await Hotel.find({ category: hotelCategory });
    return hotelByCategory;
  } catch (error) {
    console.log("Error in fetching hotel by category:", error);
    throw error;
  }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await readHotelByCategory(req.params.hotelCategory);
    if (hotel.length != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No hotels found for this category." });
    }
  } catch (error) {
    console.log("Error in fetching hotel by category:", error);
    res.status(500).json({ error: "Failed to fetch hotels by category." });
  }
});

// LESSON BE: BE4.2_HW2

// 1. Create an API with route "/hotels" to create a new hotel data in the Database. Test your API with Postman.

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const savedHotel = await hotel.save();
    return savedHotel;
  } catch (error) {
    console.log("Error in creating hotel:", error);
    throw error;
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body);
    res.status(201).json({
      message: "Hotel added successfully",
      hotel: savedHotel,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

// LESSON BE: BE4.3_HW2

// 1. Create an API with route "/hotels/:hotelId" to delete a hotel data by their ID in the Database. Test your API with Postman.

async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.hotelId);
    if (deletedHotel) {
      res.status(200).json({ message: "Hotel deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

// LESSON BE: BE4.4_HW2

// 1. Create an API to update a hotel data by their ID in the Database. Update the rating of an existing hotel. Test your API with Postman.

async function updateHotelRatingById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    console.log("Error in updating hotel rating:", error);
    throw error;
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotelRatingById(
      req.params.hotelId,
      req.body
    );

    if (updatedHotel) {
      res.status(200).json({
        message: "Hotel rating updated successfully",
        hotel: updatedHotel,
      });
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel rating" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
