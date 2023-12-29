const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');


const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://rohanudhwani:rohan@cluster0.w4ufti3.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



const User = require('./models/user');
const { send } = require('process');
const Post = require('./models/post');


app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({
            name,
            email,
            password,
        });

        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        await newUser.save();

        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({ message: "User created successfully. Please check your emmail for verification" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const sendVerificationEmail = async (email, verificationToken) => {
    const transport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohanudhwani2@gmail.com",
            pass: "lshs spvl detp ftsd"
        }
    });

    const mailOptions = {
        from: "threads.com",
        to: email,
        subject: "Email Verification",
        text: `Please click on the link to verify your email: http://192.168.1.106:3000/verify/${verificationToken}`
    }

    try {
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log("error in sending email");
    }
}

app.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (user) {
            user.verified = true;
            user.verificationToken = "";
            await user.save();
            res.status(200).json({ message: "User verified successfully" });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("error in verifying user");
        res.status(500).json({ error: error.message });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

const secretKey = generateSecretKey();

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!existingUser.verified) {
            return res.status(400).json({ message: "User is not verified" });
        }
        if (existingUser.password !== password) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: existingUser._id }, secretKey);
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get("/user/:userId", async (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        User.find({ _id: { $ne: loggedInUserId } })
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((error) => {
                console.log("Error: ", error);
                res.status(500).json("errror");
            });
    } catch (error) {
        res.status(500).json({ message: "error getting the users" });
    }
});


app.post("/follow", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { followers: currentUserId }
        });
        res.status(200).json({ message: "user followed successfully" });
    } catch (error) {
        res.status(500).json({ message: "error following the user" });
    }
})


app.post("/users/unfollow", async (req, res) => {
    const { loggedInUserId, targetUserId } = req.body;
    try {
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: loggedInUserId }
        })
        res.status(200).json({ message: "user unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: "error unfollowing the user" });
    }
})


app.post("/create-post", async (req, res) => {
    try {
        const { content, userId } = req.body;

        const newPostData = {
            user: userId
        }

        if (content) {
            newPostData.content = content;
        }

        const newPost = new Post(newPostData);

        await newPost.save();

        res.status(200).json({ message: "post created successfully" });

    } catch (error) {
        res.status(500).json({ message: "error creating the post" });
        console.log(error);
    }
})



app.post("/posts/:postId/:userId/like", async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await Post.findById(postId).populate("user", "name")

        const updatedPost = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true })

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" })
        }

        updatedPost.user = post.user;

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "error liking the post" });
    }
})


app.put("/posts/:postId/:userId/unlike", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;

    try {
        const post = await Post.findById(postId).populate("user", "name");

        const updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });

        updatedPost.user = post.user;

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ message: "An error occurred while unliking the post" });
    }
});

app.get("/get-posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while getting the posts" });
    }
});

app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        

        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error while getting the profile" });
    }
});