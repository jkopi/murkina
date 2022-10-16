import { Button, Input, Flex, FormControl, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Enter an email address"),
    password: Yup.string().min(8).required("Password has to be longer than 8 characters")
  })
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
      <Form>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input id="email" type="text" name="email" placeholder="email" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input id="password" type={show ? 'text' : 'password'} name="password" placeholder="Enter password" />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex>
          <Button type="submit" colorScheme="messenger">Submit</Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default LoginForm;
