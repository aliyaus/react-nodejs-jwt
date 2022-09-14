const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const jwtSecret = 'secret123';

// const whitelist = ['http://localhost:3000', 'http://myprodwebsite.prod.io'];
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)
        callback(new Error('Not allowed by CORS'));
    }
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());

const port = process.env.PORT || 5000;

const testUserObj = {
    name: "Selena Quintanilla",
    email: "selenaquintanilla@nodejs.com",
    isAdmin: true,
}

const getAuth = (req, cb) => {
    console.log(req.body)
    const { username, password } = req.body;
    if (username === "test" && password === "test") {
        const token = jwt.sign(testUserObj, jwtSecret, {
            expiresIn: '300s'
        })
        cb({
            token: token,
            status: 'success',
            user: testUserObj
        });
    } else {
        cb({
            status: "failed",
            message: "Unable to login..please check your credentials!"
        })
    }
}

const getUserItems = (req, cb) => {
    if (req.name === "Selena Quintanilla") {
        cb(["Como la flor", "Si una vez", "No Me Queda Mas"])
    } else {
        cb(["No music found.../:"]);
    }
}

// middleware function to check for session cookie on protected requests/routes
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['cookie'];
    const token = authHeader && authHeader.split('=')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.name = decoded.name;
        console.log("request made by: ", req.name)
        next();
    })
}

app.get("/items", verifyToken, (req, res, next) => {
    getUserItems(req, data => {
        res.json(data);
    })
});

app.post("/auth", (req, res, next) => {
    getAuth(req, data => {
        if (data.status === "success") {
            res.status(200)
                .cookie('token', data.token, { httpOnly: true, sameSite: "strict" })
                .json({ message: 'success', user: data.user })
        } else {
            res.status(401).json(data)
        }
    })
})

app.get("/logout", verifyToken, (req, res, next) => {
    res.clearCookie("token")
        .status(200)
        .json({ message: "logged out!" })
})

app.listen(port, () => {
    console.log("react-nodejs-jwt server running on port: ", port);
});
