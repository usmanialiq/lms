"use strict";

//////////
// Server
//////////
const internalServer = "Internal Error - Something might be broken";

////////////////
// Registration
////////////////
const regGenError = "There seems to be an error while registering new user";
const emailExists = "Email already exists";
const failedToCreate = "Error: Failed to create user.";

/////////
// Login
/////////
const loginGenError = "There seems to be an error while logging user";
const noUser = "User does not exists";
const incorrectPassword = "Incorrect Password!";

/////////
// Users
/////////
const adminOnly = "The resource is restricted to admin only";
const userMismatch = "There seems to be a conflict with user data";
const usersGenError = "There seems to be an error in the users' system";
const userExists = "User already exists";
const getAllUsers = "No users in the system";
const getUserById = "No such user in the system";
const getUserHierarchy = "No children nodes for this user exists";
const deleteUserById = "Failed to delete this user";
const deleteUserNotAllowed = "User deletion is not allowed";

/////////
// Trip
/////////
const tripGenError = "There seems to be an error in the trip's system";
const tripExists = "Trip already exists";
const tripAddError = "Failed: Trip cannot be added";
const getAllTrips = "No trip in the system";
const getTripById = "No such trip in the system";
const updateTripById = "Failed to update this trip";
const deleteAllTrips = "Failed to delete all the trip";
const deleteTripById = "Failed to delete this trip";
const searchTrip = "No trip found on this search";
const searchPayload = "Error in the payload for search";

////////////
// Bookings
/////////
const bookingGenError = "There seems to be an error in the booking's system";
const bookingExists = "Booking already exists";
const bookingAddError = "Failed: Booking cannot be added";
const getAllBookings = "No bookings in the system";
const getBookingById = "No such booking in the system";
const getAllBookingsByUser = "There are no bookings against you.";
const updateBookingById = "Failed to update this booking";
const deleteAllBookings = "Failed to delete all the bookings";
const deleteBookingById = "Failed to delete this booking";

//////////////////////
// Phone Verification
/////////////////////
const phoneGenError = "There seems to be an error in the Phone Numbers system";
const phoneExists = "Phone Number already exists";
const phoneAddError = "Failed: Phone Number cannot be added";
const getAllPhones = "No Phones Numbers in the system";
const getPhoneById = "No such Phone Number in the system";
const updatePhoneById = "Failed to update this Phone Number";
const deletePhoneById = "Failed to delete this Phone Number";

///////////////////
// Forget Password
///////////////////
const forgetPassword = "Failed to request forgetten password";
const emailNotFound = "Make sure to enter email";
const oldPassword = "Enter current password";
const newPassword = "Enter new password";
const fPGenError = "There seems to be an error while generating password";
const passwordInvalid = "Entered password is wrong";
const passwordMismatch = "Passwords do not match";

//////////////////
// Uploading files
//////////////////
const uploadNotFound = "File(s) to upload not found.";

///////////
// General
///////////
const invalidId = "There seems to be error in the fetching parameters";

module.exports = {
    internalServer,
    regGenError,
    emailExists,
    failedToCreate,
    loginGenError,
    noUser,
    incorrectPassword,
    adminOnly,
    userMismatch,
    usersGenError,
    userExists,
    getAllUsers,
    getUserById,
    getUserHierarchy,
    deleteUserById,
    deleteUserNotAllowed,
    tripGenError,
    tripExists,
    tripAddError,
    getAllTrips,
    getTripById,
    updateTripById,
    deleteAllTrips,
    deleteTripById,
    searchTrip,
    searchPayload,
    invalidId,
    bookingGenError,
    bookingExists,
    bookingAddError,
    getAllBookings,
    getBookingById,
    getAllBookingsByUser,
    updateBookingById,
    deleteAllBookings,
    deleteBookingById,
    phoneGenError,
    phoneExists,
    phoneAddError,
    getAllPhones,
    getPhoneById,
    updatePhoneById,
    deletePhoneById,
    uploadNotFound,
    forgetPassword,
    emailNotFound,
    oldPassword,
    newPassword,
    fPGenError,
    passwordInvalid,
    passwordMismatch,
};
