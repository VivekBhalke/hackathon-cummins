import { prisma } from "../db/db.js";

export const registerUser = async (req, res) => 
{  
    const { name, email, password } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    console.log(name)
    console.log(email)
    // Check if user already exists
    const userExists = await prisma.user.upsert({
        where: { email : email },
        update: { email, name },
        create: { email, name },
      });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    res.status(201).json({ message: "User created successfully", user });
};

