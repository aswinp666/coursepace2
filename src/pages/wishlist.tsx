import React, { FC, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MainLayout } from '@/components/layout';
import { CourseCardItem } from '@/components/course';
import { Course } from '@/interfaces/course';
// Assuming allAvailableCourses is the correct source of all course data
// and its path is relative to this file. Adjust if necessary.
import { staticCoursesData as allAvailableCourses } from './availablecourses';

const WishlistPage: NextPage = () => {
    const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadWishlist = () => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            const storedWishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]') as string[];
            // Ensure allAvailableCourses is an array and filter it
            // Also, ensure course._id is the correct identifier used in localStorage
            let items: Course[] = [];
            if (Array.isArray(allAvailableCourses)) {
                items = allAvailableCourses
                    .filter((course: any) => storedWishlistIds.includes(course._id.toString()))
                    .map((course: any) => ({
                        ...course,
                        id: course._id, // Map _id to id for CourseCardItem compatibility
                        // Provide default values for missing fields expected by CourseCardItem and Course interface
                        cover: course.cover || '/images/courses/default-course.jpg', // Add a default image
                        rating: course.rating || 0,
                        ratingCount: course.ratingCount || 0,
                        price: course.price || 0, // Assuming price might be missing, though availablecourses.js sets it to 0
                        // category: course.category || 'Uncategorized', // Already present in staticCoursesData
                    }));
            }
            setWishlistCourses(items);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadWishlist();

        // Listen for custom event to reload wishlist
        const handleWishlistUpdate = () => {
            loadWishlist();
        };
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <Container sx={{ py: { xs: 6, md: 8 } }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                        Loading Your Wishlist...
                    </Typography>
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container sx={{ py: { xs: 6, md: 8 } }}>
                <Typography variant="h3" component="h1" sx={{ mb: 6, textAlign: 'center', color: 'primary.main' }}>
                    My Wishlist
                </Typography>
                {wishlistCourses.length > 0 ? (
                    <Grid container spacing={4}>
                        {wishlistCourses.map((course) => (
                            <Grid item xs={12} sm={6} md={4} key={course.id || course._id}> {/* Use course._id if id is not present */}
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
        </MainLayout>
    );
};

export default WishlistPage;
