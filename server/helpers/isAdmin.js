import User from "../models/User.js";

export const isAdmin = async (username) => {
  if (username) {
    try {
      const user = await User.findOne({ username: username });
  
      if (!user) {
        console.log('User not found');
        return false;
      }
  
      return user.username === "admin";
    } catch (error) {
      console.error('Error fetching user:', error);
      return false;
    }
  } else {
    console.log('User not found');
    return false;
  }
};
