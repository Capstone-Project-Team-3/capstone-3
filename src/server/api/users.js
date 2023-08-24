const express = require('express')
const usersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const { JWT_SECRET } = process.env;


const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    updateUser,
    getUserById,
    deleteUser
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', requireAdmin, async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.get('/:id', requireUser, async ( req, res, next ) => {
    try {
        const user = await getUserById(req.params.id);
            const prefix = 'Bearer ';
            const auth = req.header('Authorization');
        const requestedUserId = req.params.id;
        const token = auth.slice(prefix.length);
        const { id } = jwt.verify(token, JWT_SECRET);
                console.log(id)
                console.log(requestedUserId)

        if (id != requestedUserId) {
        return res.status(403).send('Access denied');
        } 
        res.send({user})
    } catch({name, message}) {
        next ({name, message})
    }
});

usersRouter.patch('/:id', requireUser, async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body)
        if(user) {
            res.send(user)
        }
        else {
            next({
                name: 'updateUser error',
                message: 'gg you suck'
            })
        }
    } catch(err) {
        next(err)
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

usersRouter.delete('/:id', requireAdmin,  async (req, res, next) => {
    try {
        const deleteUsers = await deleteUser(req.params.id)
        if (!deleteUsers) {
            res.send("Deleted Successfully!")
        } else {
            res.send("Somthing Went Wrong... Unsuccessfull!")
        }
    } catch(err) {
        next(err)
    }
});

module.exports = usersRouter;