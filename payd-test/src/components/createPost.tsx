import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Input, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

// Define the type for a Post
interface Post {
  id: number;
  title: string;
  body: string;
  userID: number | string;
}

const CreatePost: React.FC = () => {
  const toast = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '', userID: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewPost({ ...newPost, [name]: value });
  }

  const handleCreatePost = async () => {
      try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
          setPosts([response.data, ...posts]);
          setNewPost({ title: '', body: '', userID: '' });
        // success toast
        toast({
          title: "Post created.",
          description: "Your post has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
          console.error('Error creating post:', error);
      }
  }


  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mt={10} minW="350px" h={"100%"} position={{ base: 'static', lg: 'sticky' }} top={10}>
      <VStack spacing={4} className="mb-4">
        <Text fontSize="2xl" fontWeight="bold">Create Post</Text>
        <Input
        focusBorderColor='lime'
        placeholder="Enter Title"
        name="title"
        value={newPost.title}
        onChange={handleInputChange}
        className="mb-2"
        />
        <Textarea
        focusBorderColor="lime"
        placeholder="Enter Body"
        name="body"
        value={newPost.body}
        onChange={handleInputChange}
        className="mb-2"
        resize="vertical"
        />
        <Input
        focusBorderColor="lime"
        placeholder="Enter userID"
        name="userID"
        value={newPost.userID}
        onChange={handleInputChange}
        className="mb-2"
        />
        <Button colorScheme="teal" onClick={handleCreatePost}>Submit</Button>
      </VStack>
    </Box>
  )
}

export default CreatePost