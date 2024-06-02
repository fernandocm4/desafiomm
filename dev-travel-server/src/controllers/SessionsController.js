import jwt from "jsonwebtoken";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

import userdb from "../models/User"

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;

        try {
            userdb.findOne({ email: email },  async (err, usuarios) => {
                if (err) {
                    return res.status(500).json({ error: `No usefrs with id ` });
                }
                if (!usuarios) {
                    return res.status(500).json({ error: `No users with id ` });
                }

                
    
                const passwordChecked = await checkPassword(usuarios.password, password);
                
                if (!passwordChecked) {
                    return res.status(401).json({ error: "password invalid." });
                }
                
                const { id } = usuarios;

                //return res.status(200).json(usuarios._id);
                
                return res.json({
                    user: {
                        id: usuarios._id,
                        email
                    },
                    token: jwt.sign({ id }, authConfig.secret, {
                        expiresIn: authConfig.expiresIn,
                    })
                });
    
            });
        } catch (error) {
            console.log(error);
        }



    }
}

export default new SessionsController();