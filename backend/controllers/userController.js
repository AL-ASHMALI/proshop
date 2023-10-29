import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/userModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Description: Authenticate user and get token
// Route:       GET /api/users/login
// Access:      public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// Description: Register new user
// Route:       POST /api/users
// Access:      public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400 client error
    throw new Error('Account already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Description: Logout user
// Route:       POST /api/users/logout
// Access:      Private
const logoutUser = asyncHandler(async (req, res) => {
  // to logout we simply delete the cookie created when logging in.
  //to clear the cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Description: Get user profile
// Route:       GET /api/users/profile
// Access:      Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// Description: update user profile
// Route:       PUT /api/users/profile
// Access:      Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// Description: Get users
// Route:       GET /api/users
// Access:      Private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// Description: Get user by ID
// Route:       GET /api/users/:id
// Access:      Private/admin

const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// Description: Delete user
// Route:       DELETE /api/users/:id
// Access:      Private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// Description: Update user
// Route:       PUT /api/users/:id
// Access:      Private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send('update users');
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
