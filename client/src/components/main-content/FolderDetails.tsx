import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import TestSetForm from './test-sets/form/TestSetForm';
import TestSets from './test-sets/TestSets';

const DetailContainer = styled.section`
    ${tw`grid`}
`;

function FolderDetails() {
    const { folderId } = useParams();

    return (
        <DetailContainer>
            <Routes>
                <Route
                    path="testsets/*"
                    element={<TestSets folderId={folderId} />}
                ></Route>
                <Route
                    path="testsets/form"
                    element={<TestSetForm folderId={folderId} />}
                />
                <Route
                    path=":folderId/*"
                    element={<FolderDetails />}
                />
            </Routes>
        </DetailContainer>
    );
}

export default FolderDetails;
