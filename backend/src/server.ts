import express, { Request, Response } from 'express';
import cors from 'cors';
import multer, { FileFilterCallback } from 'multer';
import jwt from 'jsonwebtoken';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

interface BlogPost {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    date: string;
    author: string;
    category: string;
}

const posts: BlogPost[] = [];

// Storage configuration
const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, './uploads/');
    },
    filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Basic routes
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Auth routes
app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET || '1234',
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Blog post routes with file upload
app.post('/api/posts', upload.single('image'), (req: Request, res: Response) => {
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

        const newPost: BlogPost = {
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
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            message: 'Internal server error while creating post'
        });
    }
});

// Add this new GET endpoint to fetch all posts
app.get('/api/posts', (req: Request, res: Response) => {
    res.json(posts);
});

// Add this with your other routes
app.delete('/api/posts/:id', (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});