import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../blogService';
import Avatar from '@mui/material/Avatar';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon  from '@mui/icons-material/Close';

const Navbar = () => {
    const [posts, setPosts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getBlogPosts()
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const post = posts.length > 0 ? posts[0] : null;

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <Link to="/" className="navbar__link">Home</Link>
                </div>
                <div className="navbar__menu-toggle" onClick={handleMenuToggle}>
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
                <div className={`navbar__links ${isMenuOpen ? 'open' : ''}`}>
                    {isMenuOpen && (
                        <button className="navbar__menu-close" onClick={handleMenuToggle}>
                            <CloseIcon />
                        </button>
                    )}
                    <Link to="/create" className="navbar__link" onClick={handleMenuToggle}>Create Blog</Link>
                    <Link to="/list-posts" className="navbar__link" onClick={handleMenuToggle}>My Posts</Link>
                    <Link to="/profile" className="navbar__link" onClick={handleMenuToggle}>Profile</Link>
                    <Link to="/logout" className="navbar__link" onClick={handleMenuToggle}>Logout</Link>
                    {post && (
                        <div className="navbar__user-container">
                            <h3>{post.author_name}</h3>
                            <Link to='/profile'>
                                <Avatar />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
