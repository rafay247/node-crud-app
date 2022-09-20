var Userdb = require('../model/model');

module.exports = {

    // create and save new user
    create: async (req, res) => {
        // validate request
        if (!req.body) {
            res.status(400).send({ message: "Content can not be emtpy!" });
            return;
        }
        const params = req.body;

        // new user
        const user = new Userdb(params)
        // save user in the database
        await user.save()
            .then(data => {
                //res.send(data)
                res.redirect('/add-user');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });


    },
    // retrieve and return all users/ retrive and return a single user
    find: async (req, res) => {

        if (req.query.id) {
            const id = req.query.id;

            await Userdb.findById(id)
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: "Not found user with id " + id })
                    } else {
                        res.send(data)
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: "Erro retrieving user with id " + id })
                })

        } else {
            await Userdb.find()
                .then(user => {
                    res.send(user)
                })
                .catch(err => {
                    res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
                })
        }


    },

    // Update a new idetified user by user id
    update: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" })
        }

        const id = req.params.id;
        await Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error Update user information" })
            })
    },

    // Delete a user with specified user id in the request
    delete: async (req, res) => {
        const id = req.params.id;

        await Userdb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
                } else {
                    res.send({
                        message: "User was deleted successfully!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    }
}
