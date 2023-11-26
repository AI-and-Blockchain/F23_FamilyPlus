// pages/PersonalHealthPortalPage.tsx
import { Box, Grid } from "@chakra-ui/react";
import ViewDocumentsCard from "../component/ViewDocumentsCard";
import UploadDocumentsCard from "../component/UploadDocumentsCard";
import ManageMembersCard from "../component/ManageMembersCard";
import AskChatbotCard from "../component/AskChatbotCard";
import Header from '../component/header';
import Footer from '../component/footer';

const PersonalHealthPortalPage = () => {
    return (
        <Box>
            <Header /> 
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                p={50}
                placeItems="center"
                templateRows="auto"  // Adjust the size of rows
                height="80vh"        // Set the height of the grid
            >
                <ViewDocumentsCard to="/view-documents" />
                <UploadDocumentsCard to="/upload-documents" />
                <ManageMembersCard to="/manage-members" />
                <AskChatbotCard to="/ask-chatbot" />
            </Grid>
            <Footer /> 
        </Box>
    );
};

export default PersonalHealthPortalPage;
