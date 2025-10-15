import { body, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

export const validateUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  handleValidation
];

export const validateTrip = [
  body("title").notEmpty().withMessage("Title is required"),
  body("startDate").isDate().withMessage("Start date is required"),
  body("endDate").isDate().withMessage("End date is required"),
  handleValidation
];

export const validateDestination = [
  body("name").notEmpty().withMessage("Name is required"),
  body("country").notEmpty().withMessage("Country is required"),
  handleValidation
];

export const validateJournal = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  handleValidation
];
