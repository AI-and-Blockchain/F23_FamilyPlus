import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import Header from '../component/header';
import Footer from '../component/footer';

const Homepage: React.FC = () => {
    return (
        <div>
            <Header />
            <Container maxW="container.lg" mt="8" p="4">
                <Heading as="h2" size="xl" fontWeight="bold" mb="4" fontFamily="customFont" textAlign="center">
                    Welcome to Family+
                </Heading>
                <Text fontSize="lg" lineHeight="1.6" color="gray.700">
                    Family+ is an innovative web application that leverages the power of AI and 
                    blockchain technology to revolutionize the way individuals understand and 
                    utilize their medical documents. This platform brings together cutting-edge 
                    features such as AI-enhanced document comprehension, a secure blockchain 
                    network, and a unique role-based system with Doctors, Patients, and Family 
                    Members. It's a groundbreaking project that merges AI and blockchain to 
                    empower individuals with a deeper understanding of their medical documents. 
                    By providing users with greater control over their health information, we 
                    aim to improve healthcare outcomes and potentially reduce costs. With 
                    Family+, you'll gain better control over your health information and make 
                    more informed healthcare decisions.
                </Text>
            </Container>
            <Footer />
        </div>
    );
};

export default Homepage;
