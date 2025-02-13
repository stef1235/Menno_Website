"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const posts = [];
// Storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
// Basic routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Auth routes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET || '1234', { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
// Blog post routes with file upload
app.post('/api/posts', upload.single('image'), (req, res) => {
    try {
        console.log('Received request:', {
            body: req.body,
            file: req.file
        });
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }
        const newPost = {
            id: Date.now().toString(),
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
            date: new Date().toISOString(),
            author: 'Admin',
            category: req.body.category || 'Uncategorized'
        };
        posts.unshift(newPost);
        console.log('Created new post:', newPost);
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            message: 'Internal server error while creating post'
        });
    }
});
// Add this new GET endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});
// Add this with your other routes
app.delete('/api/posts/:id', (req, res) => {
    try {
        const postId = req.params.id;
        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Remove the post from the array
        posts.splice(postIndex, 1);
        console.log(`Post ${postId} deleted successfully`);
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});
// Serve uploaded files
app.use('/uploads', express_1.default.static((0, path_1.join)(__dirname, '../uploads')));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
