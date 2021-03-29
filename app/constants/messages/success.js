"use strict";
/////////////////
// Registeration
/////////////////
const regSuccess = "Account has been successfully created. Kindly Login!";

////////
// Login
////////
const loginSuccess = "User has been logged-in";

////////
// Users
////////
const userUpdated = "User has been updated";
const userPasswordUpdated = "New password has been updated";
const userVerified = "User with this email exists";
const userDeleted = "User has been deleted";

/////////
// Book
/////////
const bookAdded = "Book has been added";
const bookUpdated = "Book has been updated";
const bookDeleted = "Book has been removed";
const booksDeleted = "All the books have been removed";
const bookImageUpload = "Image(s) for the book have been uploaded";

///////////
// Issue
///////////
const issueAdded = "Issue has been added";
const issueUpdated = "Issue has been updated";


///////////////////
// Forget Password
///////////////////
const forgetPassword = "You will shortly receive an email with a code, if not received in inbox, check spam folder";

module.exports = {
    regSuccess,
    loginSuccess,
    userUpdated,
    userPasswordUpdated,
    userVerified,
    userDeleted,
    bookAdded,
    bookUpdated,
    bookDeleted,
    booksDeleted,
    bookImageUpload,
    issueAdded,
    issueUpdated,
    forgetPassword,
};
