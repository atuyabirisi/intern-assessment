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
    const [isHovered, setIsHovered] = useState(false);

    // Handle search change
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    // Handle search
  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: currentPage,
                        _limit: POSTS_PER_PAGE
                    }
                });
                setPosts(response.data);
                const totalPosts = parseInt(response.headers['x-total-count'], 10);
                setTotalPages(Math.ceil(totalPosts / POSTS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            // Simulate loading delay
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPosts();
    }, [currentPage]);

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
                            {filteredPosts.map((post) => (
                                <Box key={post.id} borderWidth="1px" borderRadius="lg" bg={"brand.white"} m={"auto"} p={4} w={"100%"}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    _hover={{
                                        bg: 'brand.darkGreen', boxShadow: 'md', color: 'brand.white'
                                    }}
                                >
                                    <Heading as="h2" color={isHovered ? "brand.amber" : "brand.darkGreen"} fontSize="xl" fontWeight="bold" mb={2}>
                                        {post.title}
                                    </Heading>
                                    <Text fontSize={['sm', 'md']}>{post.body}</Text>
                                    <Text fontSize="sm" color="teal">{post.userId}</Text>
                                </Box>
                            ))}
                      </>
                    )}
                </VStack>

                {/* Handle pagination */}
                <HStack spacing={4} m={[0, 4]} justifyContent="center">
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