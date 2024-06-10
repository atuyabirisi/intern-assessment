import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import CreatePost from './createPost';

// Define post type
interface Post {
  id: number;
  title: string;
  body: string;
  userID: number | string;
}

const POSTS_PER_PAGE = 10; // Number of posts to display per page

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: currentPage,
                        _limit: POSTS_PER_PAGE
                    }
                });
                setPosts(response.data);
                const totalPosts = response.headers['x-total-count'];
                setTotalPages(Math.ceil(totalPosts / POSTS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, [currentPage]);

    // handling pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

  return (
    <Stack className="p-3" marginTop={"auto"}>
        <Heading as="h1">
            Posts
        </Heading>
        <Stack direction={['column', 'row']} spacing='30px' justify="space-evenly">
            <CreatePost />

            <Box maxW="700px">
                <VStack spacing={4} className="mb-4">
                    <Text fontSize="2xl" fontWeight="bold">Posts</Text>
                    {posts.map((post) => (
                        <Box key={post.id} borderWidth="1px" borderRadius="lg" p={4}
                        _hover={{ bg: 'brand.darkGreen', boxShadow: 'md', color: 'brand.white' }}>
                            <Heading as="h2" fontSize="xl" fontWeight="bold">{post.title}</Heading>
                            <Text>{post.body}</Text>
                            <Text fontSize="sm" color="teal">{post.userID}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>

            {/* Handle pagination */}
            <HStack className='p-4 m-5' justifyContent="center">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </HStack>
        </Stack>
    </Stack>
  )
}

export default Posts