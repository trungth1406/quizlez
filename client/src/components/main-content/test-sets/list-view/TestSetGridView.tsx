import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import TestSetCard from './TestSetCard';

const GridView = styled.section`
    ${tw` clear-both ml-auto mr-auto`}
`;

const GridTestSet = styled.div`
    ${tw`grid gap-3  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    padding: 1em 0 0 3em
`;

const AddSection = styled.section`
    ${tw`grid grid-cols-2 grid-flow-row gap-2 items-center`}
    padding: 3em 0 0 3em;
`;

const DashBoardInfoSection = styled.section`
    ${tw`grid grid-cols-1 gap-3`}
`;

const AddTestSetButton = styled.button`
    ${tw` text-white py-2 px-2 rounded-xl font-light text-sm border-dashed border-custom-sub border-2`};
    width: 402px;
    height: 212px;
    box-shadow: 0px 0px 12px 4px rgba(66, 84, 255, 0.4);
`;

const EmptyTestSets = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full flex  justify-center items-center mb-5 font-light text-sm pb-5">
            <div className="text-center">
                <p>{t('testSets.empty')}</p>
            </div>
        </div>
    );
};

function TestSetGridView({ testSets, folderId }) {
    const { t } = useTranslation();
    return (
        <GridView>
            <AddSection>
                <Link to={`/folders/${folderId}/testsets/form`}>
                    <AddTestSetButton>{t('testSets.add')}</AddTestSetButton>
                </Link>
                <DashBoardInfoSection>
                    {testSets.length === 0 && <EmptyTestSets></EmptyTestSets>}
                </DashBoardInfoSection>
            </AddSection>
            <GridTestSet className="children-test-set ">
                {testSets.map((testSet, index) => {
                    return (
                        <TestSetCard
                            key={index}
                            testSet={testSet}
                        ></TestSetCard>
                    );
                })}
            </GridTestSet>
        </GridView>
    );
}

export default TestSetGridView;
