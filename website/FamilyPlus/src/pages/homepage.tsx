import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';

const Homepage: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto mt-8 p-4">
                <h2 className="text-3xl font-bold mb-4">
                    Welcome to Family+
                </h2>
                <p>
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
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;
