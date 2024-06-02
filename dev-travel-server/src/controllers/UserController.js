import userdb from "../models/User"

import { createPasswordHash } from "../services/auth";


class UserController {
    async index(req, res) {
        try {
            const { name, email } = req.body;
            userdb.find({}, (err, usuarios) => {
                if (err) {
                    return res.status(500).json({ error: "deu bo" });
                }
                return res.status(200).send(usuarios);
            });
        } catch (error) {
            return res.status(500).json({ error: "deu outro bo" });
        }
    }

    async create(req, res) {
        try {
            const { nome, email, password } = req.body;

            userdb.findOne({ email: email }, async (err, usuarios) => {
                if (usuarios) {
                    return res.status(500).json({ message: `User ${email} already exists.` });
                }

                const encryptedPassword = await createPasswordHash(password);

                const newUser = {
                    nome: nome,
                    email: email,
                    password: encryptedPassword
                }


                userdb.insert(newUser, (err, usuarios) => {
                    if (err) {
                        return res.status(500).json({ error: "deu bo" });
                    }
                    return res.status(201).json(usuarios);
                });

            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            userdb.findOne({ _id: id }, (err, usuarios) => {
                if (err) {
                    return res.status(500).json({ error: `No users with id ${id}` });
                }
                if (!usuarios) {
                    return res.status(500).json({ error: `No users with id ${id}` });
                }
                return res.status(200).send(usuarios);
            });
        } catch (error) {
            return res.status(500).json({ error: "Internal error" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const newdata = req.body;
            userdb.update({ _id: id }, { $set: newdata }, {}, (err, usuarios) => {
                if (err) {
                    return res.status(500).json({ error: `Ocorreu algum erro interno` });
                }
                if (!usuarios) {
                    return res.status(404).json({ error: `No users with id: ${id}` });
                }
                return res.json(usuarios);

            });
        } catch (error) {

        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;
            userdb.remove({ _id: id }, {}, (err, usuarios) => {
                if (err) {
                    return res.status(500).json({ error: `Ocorreu algum erro interno` });
                }
                if (!usuarios) {
                    return res.status(404).json({ error: `No users with id: ${id}` });
                }
                return res.status(200).json();
            });
        } catch (error) {

        }
    }

}


export default new UserController();