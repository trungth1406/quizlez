import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import FolderDetails from '../components/main-content/FolderDetails';

const Container = styled.main`
    ${tw`p-3 pl-5 w-full h-full relative text-white overflow-y-scroll`}
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        --tw-bg-opacity: 1;
        background-color: rgba(10, 9, 45, var(--tw-bg-opacity));
    }

    ::-webkit-scrollbar-thumb {
        --tw-bg-opacity: 1;
        background-color: rgba(46, 56, 86, var(--tw-bg-opacity));
        border-radius: 10px;
    }
    }
`;

function MainContent() {
    return (
        <Container >
            <Routes>
                <Route
                    path="/folders/*"
                    element={<FolderDetails />}
                />
               
            </Routes>
        </Container>
    );
}

export default MainContent;
