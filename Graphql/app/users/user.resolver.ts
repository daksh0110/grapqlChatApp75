import  User  from "./user.schema"
import { hashPassword ,comparePassword} from "../comman/services/hashing.password";
import { Sign } from "crypto";
export const resolvers1 = {
    Query: {
      users: async () => {
        try {
          return await User.find();
        } catch (error) {
          throw new Error("Error fetching users: " + error);
        }
      },
      user: async (_: any, { id }: { id: string }) => {
        try {
          const user = await User.findById(id);
          if (!user) {
            throw new Error("User not found");
          }
          return user;
        } catch (error) {
          throw new Error("Error fetching user: " + error);
        }
      },
    },
  
    Mutation: {
      Signup: async (
        _: any,
        { name, email, password }: { name: string; email: string; password: string }
      ) => {
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("User already exists with this email");
          }
  
          // You should hash the password here using bcryptjs or similar
          const newUser = new User({ name, email, password:await hashPassword(password) });
          await newUser.save(); // Save the user to the database
          return newUser; // Return the created user
        } catch (error) {
          throw new Error("Error creating user: " + error);
        }
      },
      Signin:async(
        _:any,{email,password}:{email:string,password:string})=>{
            try {
                const user = await User.findOne({
                    email,
                    });
                    if (!user) {
                    throw new Error("User not found");
                    }
                    const isMatch = await comparePassword(password, user.password);
                    if (!isMatch) {
                    throw new Error("Invalid credentials");
                    }
                    
                    return user;
            } catch (error) {
                throw new Error("Error signing in: " + error);
            }
        }
      
    },
  };