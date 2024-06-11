import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, HStack, Heading, Input, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import CreatePost from './createPost';

// Define post type
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const POSTS_PER_PAGE = 5; // Number of posts to display per page

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

    // Handle search change
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    // Get posts for current page
    const getPostsForPage = (allPosts: Post[]) => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    };

    // Handle search
    useEffect(() => {
        let currentPosts = posts;
        if (searchQuery) {
        currentPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCurrentPage(1);
        }
        setFilteredPosts(getPostsForPage(currentPosts));
        setTotalPages(Math.ceil(currentPosts.length / POSTS_PER_PAGE));
    }, [searchQuery, posts, currentPage]);

    // Fetch posts
    useEffect(() => {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
            setPosts(response.data);
            setTotalPages(Math.ceil(response.data.length / POSTS_PER_PAGE));
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        }, []);

    // Handling post creation
    const handlePostCreated = useCallback((newPost: Post) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setFilteredPosts((prevPosts) => [newPost, ...prevPosts]);
    }, []);

    // Handling pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    }

    return (
    <Stack className="p-3" marginTop={"auto"} >
            <Stack direction={{ base: 'column', sm: 'column', md: 'row' , lg: 'row' }}
                w={{base:"90%", sm:"80%"}} m={{base:"auto", sm:"auto"}}
                spacing='30px' justify="space-evenly">
            <CreatePost onPostCreated={handlePostCreated} />

            <Box maxW="650px" w={{lg:'100%'}} m={"inherit"}>
                <VStack spacing={6} className="mb-4 pr-0">
                    <Text fontSize="3xl" fontWeight="bold" color="brand.darkGreen" mt={6}>Recent Posts</Text>
                    <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        maxW="300px"
                        width={{ base: "100%", sm: "75%", md: "60%", lg: "45%" }}
                        bg={"brand.white"}
                        borderColor="brand.amber"
                        mt={4}
                        alignSelf={{base:'center', lg:'flex-end'}}
                        _placeholder={{ color: 'gray.500' }}
                    />

                    {/* Display posts */}
                    { loading ? (
                        <Spinner />
                    ) : (
                        <>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <Box key={post.id} borderWidth="1px" borderRadius="lg" bg={"brand.white"} m={"auto"} p={4} w={"100%"}
                                        _hover={{
                                            bg: 'brand.amber', boxShadow: 'md', color: 'brand.white'
                                        }}
                                    >
                                        <Heading as="h2" color="brand.darkGreen" fontSize="xl" fontWeight="bold" mb={2}>
                                            {post.title}
                                        </Heading>
                                        <Text fontSize={['sm', 'md']}>{post.body}</Text>
                                        <Text fontSize="sm" color="teal">{post.userId}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text>No posts found.</Text>
                            )}
                        </>
                    )}
                </VStack>

                {/* Handle pagination */}
                <HStack spacing={4} m={4} justifyContent="center">
                    <Button fontWeight={"normal"} onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                    <Text>Page {currentPage} of {totalPages}</Text>
                    <Button fontWeight={"normal"} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                </HStack>
            </Box>
        </Stack>
    </Stack>
  )
}

export default Posts