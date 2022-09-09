import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const CardContainer = styled.section`
    ${tw`grid grid-cols-1 w-full h-full bg-custom-secondary rounded-xl shadow-md p-3  transform duration-500`}
    grid-template-rows: 1fr 6fr 1fr;
`;

const TopActionContainer = styled.section`
    ${tw`grid grid-cols-3 items-center justify-items-center `}
    grid-template-columns: 1fr 3fr 1fr;
`;

const TermType = styled.div`
    ${tw`flex text-gray-500 font-medium justify-items-start `}
`;

const CardIndex = styled.div`
    ${tw`flex font-semibold`}
`;

const CardContentContainer = styled.section``;

const CardContent = styled.div`
    ${tw`flex flex-col justify-center items-center clear-both ml-auto mr-auto text-3xl h-full `}
`;

const BottomActionContainer = styled.section`
    ${tw`flex  gap-5 justify-items-stretch`}
`;

const DirectionButton = styled.button<{ hasNext: boolean }>`
    ${tw`flex justify-center items-center w-full   text-white border-2 rounded-lg`}
    ${({ hasNext }) => (hasNext ? tw`border-gray-600` : tw`border-gray-400`)}
    height: 4em;
`;

function DefinitionCard({ term, index, totalLength, setCurrentCardIndex }) {
    const [isTerm, setIsTerm] = useState(true);
    const [isBackFlip, setBackFlip] = useState(false);
    const { t } = useTranslation();

    const changeType = () => {
        setIsTerm(!isTerm);
    };
    const directionClick = (direction: string) => {
        if (direction === 'next') {
            if (index + 1 < totalLength) {
                setCurrentCardIndex((prev) => prev + 1);
            }
        } else {
            if (index - 1 >= 0) {
                setCurrentCardIndex((prev) => prev - 1);
            }
        }
    };

    const flipStyle = isBackFlip ? '' : 'rotateX(360deg) ';

    const flipCard = () => {
        setBackFlip(!isBackFlip);
    };

    return (
        <CardContainer
            className={'CardContainer'}
            style={{
                transform: flipStyle,
                perspective: '1000px',
            }}
            onClick={flipCard}
        >
            <TopActionContainer className="TopActionContainer">
                <TermType>
                    {isTerm
                        ? t('testSets.label.term')
                        : t('testSets.label.definition')}
                </TermType>
                <CardIndex>
                    {index + 1} / {totalLength}
                </CardIndex>
            </TopActionContainer>
            <CardContentContainer
                onClick={changeType}
                className="CardContentContainer"
            >
                <CardContent>
                    {isTerm ? term.term : term.definition}
                </CardContent>
            </CardContentContainer>
            <BottomActionContainer>
                <DirectionButton
                    hasNext={index === 0}
                    disabled={index === 0}
                    onClick={(evt) => directionClick('prev')}
                >
                    <MdOutlineNavigateBefore
                        size={34}
                        style={
                            index === 0
                                ? {
                                      color: 'rgba(75, 85, 99, var(--tw-border-opacity))',
                                  }
                                : { color: 'white' }
                        }
                    ></MdOutlineNavigateBefore>
                </DirectionButton>
                <DirectionButton
                    hasNext={index + 1 === totalLength}
                    disabled={index === totalLength - 1}
                    onClick={(evt) => directionClick('next')}
                >
                    <MdOutlineNavigateNext
                        size={34}
                        style={
                            index + 1 === totalLength
                                ? {
                                      color: 'rgba(75, 85, 99, var(--tw-border-opacity))',
                                  }
                                : { color: 'white' }
                        }
                    ></MdOutlineNavigateNext>
                </DirectionButton>
            </BottomActionContainer>
        </CardContainer>
    );
}

export default DefinitionCard;
