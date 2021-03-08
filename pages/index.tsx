// import Head from 'next/head'

import { FormEvent, useState } from 'react'
import { Flex, Image, Button, Text } from '@chakra-ui/core'
import Input from '../components/Input'
import axios from 'axios'

export default function Home() {
  const [ email, setEmail ] = useState('');
  function handleSignUpToNewsletter(event: FormEvent) {
    event.preventDefault();

    axios.post('/api/subscribe', { email })
  }

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        as="form"
        onSubmit={handleSignUpToNewsletter}
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={8}
        marginTop={4}
        width="100%" 
        maxW="400px"
      >
        <Image marginBottom={8} src="/vercel.svg" alt="Vercel" />

        <Text textAlign="center" fontSize="sm" color="gray.400" marginBottom={2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>

        <Input
          placeholder="Seu melhor e-mail"
          marginTop={2}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          backgroundColor="purple.500"
          height="50px"
          borderRadius="sm"
          marginTop={6}
          _hover={{ backgroundColor: 'purple.600' }}
        >
          登録
        </Button>
      </Flex>
    </Flex>
  )
}
