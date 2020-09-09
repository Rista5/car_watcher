const { Router } = require('express');
const { User } = require('../../models')
const validate = require('./../../middleware/validate');
const {createUserSchema, updateUserSchema} = require('./../../requests');

const router = Router();


router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email']
        });

        return res.status(200).send(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(500).send({message: 'Bad request'});
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        return res.status(200).send(user);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.post('/', validate(createUserSchema), async (req, res) => {
    try {
        const user = req.body;

        const savedUser = await User.create(user);

        res.status(200).send(savedUser);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.put('/:id', validate(updateUserSchema), async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;

        if (!id || !user) {
            return res.status(500).send({message: 'Bad request'});
        }

        const savedUser = await User.findByPk(id);

        if (!savedUser) {
            return res.status(404).send({message: 'User not found'});
        }

        const keys = Object.keys(user);
        keys.forEach(k => {
            savedUser[k] = user[k];
        });

        await savedUser.save();

        return res.status(200).send(savedUser);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

module.exports = router;