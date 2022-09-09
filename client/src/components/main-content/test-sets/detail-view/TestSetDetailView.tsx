import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRead } from 'react-icons/ai';
import { VscChecklist } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import DefinitionCard from './DefinitionCard';

const DetailViewContainer = styled.div`
    ${tw`grid grid-cols-1 gap-3 clear-both ml-auto mr-auto mt-5 w-9/12 h-full `}
    
`;

const Header = styled.header`
    ${tw`grid grid-cols-1 text-xl font-bold `}
`;

const ActionContainer = styled.section`
    ${tw`grid gap-5 w-full grid-flow-col cursor-pointer`}
`;

const IconButtonActionWrapper = styled.section`
    ${tw`flex  gap-3 content-between bg-custom-secondary p-3 rounded-md hover:border-b-custom-second-sub hover:border-b-2`}
`;

const Divider = styled.div`
    ${tw`border-b-2 border-b-gray-600 w-full`}
`;

const DefinitionCardContainer = styled.section`
    ${tw` grid  h-full`}
`;

function TestSetDetailView() {
    const { state }: any = useLocation();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { t } = useTranslation();

    return (
        <DetailViewContainer>
            <Header>{state.name}</Header>
            <ActionContainer>
                <IconButtonActionWrapper>
                    <AiOutlineRead
                        size={26}
                        color={'#4254FF'}
                    ></AiOutlineRead>
                    <button>{t('testSets.label.learn')}</button>
                </IconButtonActionWrapper>
                <IconButtonActionWrapper>
                    <VscChecklist
                        size={26}
                        color={'#4254FF'}
                    ></VscChecklist>
                    <button>{t('testSets.label.test')}</button>
                </IconButtonActionWrapper>
            </ActionContainer>
            <Divider></Divider>
            <DefinitionCardContainer>
                <DefinitionCard
                    key={currentCardIndex}
                    term={state.terms[currentCardIndex]}
                    index={currentCardIndex}
                    totalLength={state.terms.length}
                    setCurrentCardIndex={setCurrentCardIndex}
                ></DefinitionCard>
            </DefinitionCardContainer>
        </DetailViewContainer>
    );
}

export default TestSetDetailView;
