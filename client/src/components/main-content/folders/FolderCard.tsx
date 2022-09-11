import { css } from '@emotion/react';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { createRef, useEffect, useRef, useState } from 'react';
import { AiOutlineOrderedList, AiOutlineRead } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { VscChecklist } from 'react-icons/vsc';
import styled from 'styled-components';
import tw from 'twin.macro';
import GuidanceCard from './GuidanceCard';

const FolderCardContainer = styled.div`
    ${tw`relative`}
`;

const FolderCardUpperView = styled.section`
    ${tw`w-80 h-48 bg-custom-secondary  shadow-lg border-2 border-solid border-custom-secondary flex  flex-col absolute `}
    border-radius: 0 8px 8px 8px;
    top: 0;

    &::before {
        content: '';
        display: inline-block;
        position: absolute;
        height: 30px;
        top: -31px;
        left: -2px;
        ${tw`bg-custom-secondary`};
        width: 40%;
        border-radius: 4px 75px 4px 0;
    }
`;

const FolderCardBelowView = styled.section`
    ${tw`w-80 h-48 bg-white  shadow-lg border-2 border-solid border-custom-secondary flex  flex-col relative `}
    border-radius: 0 8px 8px 8px;

    &::before {
        content: 'Most view';
        display: inline-block;
        position: absolute;
        height: 30px;
        top: -30px;
        ${tw`bg-white`};
        width: 40%;
        border-radius: 4px 75px 4px 0;
    }
}`;

const TestSetCard = styled.section<{ top; left; height?; width? }>`
    ${tw`w-64 h-40 text-black bg-white font-bold text-sm shadow-2xl border-solid rounded-lg  flex  flex-col absolute  p-1  gap-1 hover:animate-moveUp `}
    border-width: 1px;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    height: ${(props) => (props.height ? props.height : 160)}px;
    width: ${(props) => (props.width ? props.width + 'px' : '16rem')};
`;

const GuidanceCardRef = styled(TestSetCard)`
    ${tw`bg-custom-primary`}
`;

const CardHeader = styled.div`
    ${tw`w-full flex gap-2 justify-evenly cursor-pointer`}
`;

const CardText = styled.p`
    ${tw`w-full pl-3`}
`;

const FolderHeaderContainer = styled.section`
    ${tw`w-full flex  pt-5 px-3 font-semibold`}
    justify-content: flex-end;
`;

const FolderHeader = styled.section`
    ${tw` w-full h-1/4  flex justify-center items-start  text-white font-semibold text-lg pt-3`}
    flex: 0 0 80%;
`;

const FavButton = styled.button`
    ${tw`w-1/4 h-full flex justify-end items-end text-custom-sub`}
`;

const IconActions = styled.section`
    ${tw`w-full flex items-center justify-end gap-1`}
`;

function FolderCard({ folder }) {
    const upperRef = useRef<HTMLDivElement>(null);
    const [testSets, setTestSets] = useState([]);
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((elRefs) =>
            Array(testSets.length)
                .fill(testSets)
                .map((_, i) => elRefs[i] || createRef())
        );
    }, [testSets]);

    const openFolder = () => {
        upperRef.current?.classList.add('animate-openFolder');
        upperRef.current?.classList.remove('animate-closeFolder');

        axios
            .get(
                `http://localhost:3001/folders/${folder.id}?` +
                    new URLSearchParams({
                        size: '3',
                    })
            )
            .then((res) => {
                const responseBody = res.data;
                setTestSets(responseBody.data.testSet);
            })
            .catch();
    };

    const closeFolder = () => {
        if (upperRef.current?.classList.contains('animate-openFolder')) {
            upperRef.current?.classList.remove('animate-openFolder');
            upperRef.current?.classList.add('animate-closeFolder');
        }
    };

    const moveDown = () => {
        // elRefs.current[].classList.add('animate-moveDown');
        // elRefs.current[i]..classList.remove('animate-moveUp');
    };

    return (
        <FolderCardContainer
            // onMouseLeave={closeFolder}
            key={'container' + folder.id}
        >
            <FolderCardBelowView
                className="BelowView"
                key={'below' + folder.id}
            >
                {testSets.map((testSet, index) => {
                    return (
                        <>
                            <TestSetCard
                                key={'testSet' + index}
                                top={index * 22}
                                left={index * 12}
                                height={160 - index * 40}
                                onMouseLeave={moveDown}
                                ref={(e) => {
                                    elRefs[index] = e;
                                }}
                            >
                                <CardHeader>
                                    <CardText>{testSet.name}</CardText>
                                    <IconActions>
                                        <AiOutlineRead
                                            size={18}
                                        ></AiOutlineRead>
                                        <VscChecklist size={18}></VscChecklist>
                                    </IconActions>
                                </CardHeader>
                            </TestSetCard>
                            {index === testSets.length - 1 && (
                                <GuidanceCardRef
                                    key={'belowGuidance' + folder.id}
                                    top={80}
                                    left={144}
                                    height={160 - (index + 1 * 40) - 40}
                                    width={172}
                                    onMouseLeave={moveDown}
                                    ref={(e) => elRefs.push(e)}
                                >
                                    <GuidanceCard
                                        folderId={folder.id}
                                    ></GuidanceCard>
                                </GuidanceCardRef>
                            )}
                        </>
                    );
                })}
                {testSets.length === 0 && (
                    <GuidanceCardRef
                        key={'keyForm'}
                        top={80}
                        left={144}
                        height={80}
                        width={172}
                        onMouseLeave={moveDown}
                        ref={(e) => elRefs.push(e)}
                    >
                        <GuidanceCard folderId={folder.id}></GuidanceCard>
                    </GuidanceCardRef>
                )}
            </FolderCardBelowView>
            <FolderCardUpperView
                key={'upper' + folder.id}
                className="UpperView"
                onMouseOver={openFolder}
                ref={upperRef}
            >
                <FolderHeaderContainer>
                    <FavButton>
                        <MdOutlineFavoriteBorder
                            size={24}
                        ></MdOutlineFavoriteBorder>
                    </FavButton>
                </FolderHeaderContainer>
                <FolderHeader>{folder.name}</FolderHeader>
            </FolderCardUpperView>
        </FolderCardContainer>
    );
}

export default FolderCard;
