import { useTranslation } from 'react-i18next';
import { AiOutlineRead } from 'react-icons/ai';
import { VscChecklist } from 'react-icons/vsc';
import { HiOutlineTrash } from 'react-icons/hi';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const CardContainer = styled.section`
    ${tw`grid grid-rows-2 gap-3  bg-custom-secondary rounded-md shadow-md p-5 pb-0 mt-5 hover:shadow-customMenu animate-fadeIn cursor-pointer items-center`}
    width: 402px;
    height: 212px;
`;

const MainContainer = styled.section`
    ${tw`grid grid-cols-1 gap-3`}
`;

const ActionContainer = styled.section`
    ${tw`flex gap-3 justify-end `}
    height: min-content;
`;

const TextHeader = styled.h5`
    ${tw`text-xl text-white font-medium`}
`;

const DescriptionHeader = styled(TextHeader)`
    ${tw`text-base`}
`;

const TermHeader = styled(DescriptionHeader)`
    ${tw`text-base text-custom-second-sub justify-end`}
`;

const IconActionButton = styled.button`
    ${tw`bg-custom-secondary rounded-md p-1 text-custom-sub`}
`;

function TestSetCard({ testSet }) {
    const { t } = useTranslation();

    return (
        <Link
            to={`${testSet.id}`}
            state={testSet}
        >
            <CardContainer>
                <MainContainer>
                    <TextHeader>{testSet.name}</TextHeader>
                    <DescriptionHeader>{testSet.description}</DescriptionHeader>
                    <TermHeader>
                        {testSet.terms.length}{' '}
                        {t('testSets.label.term').toLowerCase()}
                    </TermHeader>
                </MainContainer>
                <ActionContainer>
                    <Tooltip title={t('testSets.label.learn')}>
                        <IconActionButton>
                            <AiOutlineRead size={32}></AiOutlineRead>
                        </IconActionButton>
                    </Tooltip>
                    <Tooltip title={t('testSets.label.test')}>
                        <IconActionButton>
                            <VscChecklist
                                size={28}
                                stroke={'#4254FF'}
                            ></VscChecklist>
                        </IconActionButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                        <IconActionButton>
                            <HiOutlineTrash size={28}></HiOutlineTrash>
                        </IconActionButton>
                    </Tooltip>
                </ActionContainer>
            </CardContainer>
        </Link>
    );
}

export default TestSetCard;
