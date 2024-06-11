import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Flex, HStack, Heading, Input, Skeleton, SkeletonText, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import CreatePost from './createPost';

// Define post type
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const POSTS_PER_PAGE = 10; // Number of posts to display per page

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

    // Handle search
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
            setTimeout(() => setLoading(false), 2000);
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
        <Stack className="p-3" marginTop={"auto"}>
            <Stack direction={['column', 'row']} spacing='30px' justify="space-evenly">
                <CreatePost onPostCreated={handlePostCreated} />

            <Box maxW="700px">
                <VStack spacing={6} className="mb-4">
                    <HStack mt={8} align={'center'} justifyContent={'space-between'}>
                        <Text fontSize="2xl" fontWeight="bold">Posts</Text>
                        <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        width="300px"
                        borderColor="brand.amber"
                        mt={4}
                        alignSelf={'flex-end'}
                        _placeholder={{ color: 'gray.500' }}
                        />
                    </HStack>

                    {/* Display posts */}
                    { loading ? (
                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='20' color={'black'} />
                    ) : (
                        <>
                            {filteredPosts.map((post) => (
                                <Box key={post.id} borderWidth="1px" borderRadius="lg" p={4}
                                    _hover={{
                                        bg: 'brand.darkGreen', boxShadow: 'md', color: 'brand.white'
                                    }}>
                                    <Heading as="h2" fontSize="xl" fontWeight="bold" mb={2}>{post.title}</Heading>
                                    <Text>{post.body}</Text>
                                    <Text fontSize="sm" color="teal">{post.userId}</Text>
                                </Box>
                            ))}
                      </>
                    )}
                </VStack>

                {/* Handle pagination */}
                <HStack spacing={4} m={[0,4]} justifyContent="center">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                    <Text>Page {currentPage} of {totalPages}</Text>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                </HStack>
            </Box>
        </Stack>
    </Stack>
  )
}

export default Posts