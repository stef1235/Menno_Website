import React, { useState, useEffect, useRef, ClipboardEvent } from 'react';
import { useAuth } from './contexts/AuthContext';
import { type Editor } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import * as DOMPurify from 'dompurify';

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 p-2 mb-4 flex flex-wrap gap-2">
            <select
                onChange={(e) => {
                    const level = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
                    editor.chain().focus().toggleHeading({ level }).run();
                }}
                className="px-3 py-1 border rounded-md"
                value={
                    [1, 2, 3, 4, 5, 6].find((level) =>
                        editor.isActive('heading', { level })
                    ) || ''
                }
            >
                <option value="">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
            </select>

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 border rounded-md ${editor.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
            >
                Bold
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 border rounded-md ${editor.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
            >
                Italic
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`px-3 py-1 border rounded-md ${editor.isActive('underline') ? 'bg-gray-200' : ''
                    }`}
            >
                Underline
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 border rounded-md ${editor.isActive('bulletList') ? 'bg-gray-200' : ''
                    }`}
            >
                Bullet List
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1 border rounded-md ${editor.isActive('orderedList') ? 'bg-gray-200' : ''
                    }`}
            >
                Ordered List
            </button>
        </div>
    );
};

const AdminBlog: React.FC = () => {
    interface Post {
        id: string;
        title: string;
        content: string;
        author: string;
        category: string;
        imageUrl?: string;
        date: string;
    }

    interface PastedImage {
        id: string;
        dataUrl: string;
    }

    const [posts, setPosts] = useState<Post[]>([]);
    const { token } = useAuth();
    const formRef = useRef<HTMLFormElement>(null);
    const [pastedImages, setPastedImages] = useState<PastedImage[]>([]);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline
        ],
        content: '',
        onUpdate: ({ editor }) => {
            if (contentRef.current) {
                contentRef.current.value = editor.getHTML();
            }
        }
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            // Get content from editor
            const content = editor?.getHTML() || '';
            formData.set('content', content);

            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create blog post');
            }

            const data = await response.json();
            console.log('Created post:', data);

            // Reset form using ref
            if (formRef.current) {
                formRef.current.reset();
            }

            // Reset editor after successful submission
            editor?.commands.setContent('');

            alert('Blog post successfully created!');
            await fetchPosts();
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Weet je zeker dat je deze blog post wilt verwijderen?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Refresh the posts list after successful deletion
            await fetchPosts();
            alert('Blog post succesvol verwijderd!');
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Er is een fout opgetreden bij het verwijderen van de blog post.');
        }
    };

    const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
        const items = e.clipboardData?.items;

        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                e.preventDefault();

                const file = items[i].getAsFile();
                if (!file) continue;

                // Convert image to base64
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (!event.target?.result) return;

                    const imageId = `img-${Date.now()}`;
                    const dataUrl = event.target.result.toString();

                    // Add image to state
                    setPastedImages(prev => [...prev, { id: imageId, dataUrl }]);

                    // Insert image placeholder in textarea
                    const textarea = contentRef.current;
                    if (!textarea) return;

                    const startPos = textarea.selectionStart;
                    const endPos = textarea.selectionEnd;
                    const text = textarea.value;
                    const imagePlaceholder = `[Image ${imageId}]\n`;

                    textarea.value =
                        text.substring(0, startPos) +
                        imagePlaceholder +
                        text.substring(endPos);

                    // Update cursor position
                    textarea.selectionStart =
                        textarea.selectionEnd =
                        startPos + imagePlaceholder.length;
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#006039] mb-8">Blog Beheer</h1>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-8 bg-white p-8 rounded-lg shadow mb-8"
                    encType="multipart/form-data"
                >
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006039] focus:ring-[#006039] text-lg p-3"
                            placeholder="Voer een titel in..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                            Content
                        </label>
                        <div className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus-within:border-[#006039] focus-within:ring-1 focus-within:ring-[#006039]">
                            <MenuBar editor={editor} />
                            <div className="p-4">
                                <EditorContent editor={editor} onPaste={handlePaste} />
                            </div>
                            <textarea
                                ref={contentRef}
                                name="content"
                                hidden
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            className="mt-2 block w-full text-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#006039] file:text-white hover:file:bg-[#004c2d]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#006039] text-white py-4 px-6 rounded-md hover:bg-[#004c2d] transition-colors text-lg font-medium mt-6"
                    >
                        Blog Post Toevoegen
                    </button>
                </form>

                {pastedImages.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Geplakte afbeeldingen:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {pastedImages.map(img => (
                                <div key={img.id} className="relative group">
                                    <img
                                        src={img.dataUrl}
                                        alt="Pasted content"
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            setPastedImages(prev =>
                                                prev.filter(i => i.id !== img.id)
                                            );
                                            if (contentRef.current) {
                                                contentRef.current.value =
                                                    contentRef.current.value.replace(
                                                        `[Image ${img.id}]\n`,
                                                        ''
                                                    );
                                            }
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500">Nog geen blog posts beschikbaar.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post: Post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                {post.imageUrl && (
                                    <div className="relative h-48">
                                        <img
                                            src={`http://localhost:3001${post.imageUrl}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-[#006039] mb-2 line-clamp-1">
                                        {post.title}
                                    </h2>
                                    <div
                                        className="prose prose-sm max-w-none text-gray-600 mb-4 overflow-hidden"
                                        dangerouslySetInnerHTML={{
                                            __html: typeof DOMPurify.sanitize === 'function'
                                                ? DOMPurify.sanitize(post.content)
                                                : post.content
                                        }}
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            {new Date(post.date).toLocaleDateString('nl-NL', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlog;