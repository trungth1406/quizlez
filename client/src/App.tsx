import React, { useEffect } from 'react';
import './index.css';
import styled from 'styled-components';
import tw from 'twin.macro';
import TopMenu from './layouts/TopMenu';
import Sidebar from './layouts/Sidebar';
import MainContent from './layouts/MainContent';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import './i18n/i18n';

const Container = styled.main`
    ${tw`bg-custom-primary  h-screen`}
`;

const BodyContainer = styled.section`
    ${tw` w-full h-full flex `}
    padding-top: 70px;
`;

function App() {
    return (
        <>
            <Container>
                <BrowserRouter>
                    <TopMenu></TopMenu>
                    <BodyContainer>
                        <MainContent></MainContent>
                    </BodyContainer>
                </BrowserRouter>
            </Container>
        </>
    );
}

export default App;
