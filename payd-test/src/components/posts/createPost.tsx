import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Input, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

// Define the type for a Post
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const CreatePost: React.FC<{ onPostCreated: (post: Post) => void }> = ({ onPostCreated }) => {
  const toast = useToast();
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewPost({ ...newPost, [name]: value });
  }

  const handleCreatePost = async () => {
      try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
          onPostCreated(response.data); // Notify parent component
          setNewPost({ title: '', body: '', userId: '' });
          // Success toast
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
    <Box borderWidth="1px" borderRadius="lg" p={4} mt={10} minW="300px"  bg={"brand.white"}
      w={{ base: '100%', lg: '400px' }} h={"100%"}
      position={{ base: 'static', sm: 'static', md: 'sticky', lg: 'sticky' }} top={10}
    >
      <VStack spacing={4} className="mb-4">
        <Text fontSize="2xl" fontWeight="bold" color="brand.darkGreen">Create Post</Text>
        <Input
          focusBorderColor='lime'
          placeholder="Enter Title"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <Textarea
          focusBorderColor="lime"
          placeholder="Enter Body"
          name="body"
          value={newPost.body}
          onChange={handleInputChange}
          resize="vertical"
        />
        <Input
          focusBorderColor="lime"
          placeholder="Enter userId"
          name="userId"
          value={newPost.userId}
          onChange={handleInputChange}
        />
        <Button fontWeight={"normal"} onClick={handleCreatePost}>Submit</Button>
      </VStack>
    </Box>
  )
}

export default CreatePost;
