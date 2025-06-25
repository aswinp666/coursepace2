import React, { FC, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// No need to import MainLayout here anymore if _app.tsx handles it globally
// import { MainLayout } from '@/components/layout'; // This import can be removed
import { CourseCardItem } from '@/components/course';
import { Course } from '@/interfaces/course';
import { staticCoursesData as allAvailableCourses } from './availablecourses';

const WishlistPage: NextPage = () => {
    const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadWishlist = () => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            const storedWishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]') as string[];
            let items: Course[] = [];
            if (Array.isArray(allAvailableCourses)) {
                items = allAvailableCourses
                    .filter((course: any) => storedWishlistIds.includes(course._id.toString()))
                    .map((course: any) => ({
                        ...course,
                        id: course._id, // Map _id to id for CourseCardItem compatibility
                        cover: course.cover || '/images/courses/default-course.jpg',
                        rating: course.rating || 0,
                        ratingCount: course.ratingCount || 0,
                        price: course.price || 0,
                    }));
            }
            setWishlistCourses(items);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadWishlist();

        const handleWishlistUpdate = () => {
            loadWishlist();
        };
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    // Directly return the content of the page, as MainLayout is handled by _app.tsx
    if (loading) {
        return (
            // Removed <MainLayout> wrapper
            <Container sx={{ py: { xs: 6, md: 8 } }}>
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Loading Your Wishlist...
                </Typography>
            </Container>
            // Removed </MainLayout> wrapper
        );
    }

    return (
        // Removed <MainLayout> wrapper
        <Container sx={{ py: { xs: 6, md: 8 } }}>
            <Typography variant="h3" component="h1" sx={{ mb: 6, textAlign: 'center', color: 'primary.main' }}>
                My Wishlist
            </Typography>
            {wishlistCourses.length > 0 ? (
                <Grid container spacing={4}>
                    {wishlistCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id || course._id}>
                            <CourseCardItem item={course} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                    <Typography variant="h5" component="p">
                        Your wishlist is empty.
                    </Typography>
                    <Typography variant="subtitle1" component="p" sx={{ mt: 1, color: 'text.secondary' }}>
                        Add some courses you love to see them here!
                    </Typography>
                </Box>
            )}
        </Container>
        // Removed </MainLayout> wrapper
    );
};

export default WishlistPage;
