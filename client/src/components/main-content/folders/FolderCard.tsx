import { css } from '@emotion/react';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { createRef, useEffect, useRef, useState } from 'react';
import { AiOutlineOrderedList, AiOutlineRead } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { VscChecklist } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
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
        display: flex;
        position: absolute;
        height: 30px;
        top: -31px;
        left: -2px;
        ${tw`bg-custom-secondary `};
        width: 40%;
        border-radius: 4px 75px 4px 0;
    }
`;

const FolderCardBelowView = styled.section<{ text: string }>`
    ${tw`w-80 h-48 bg-white  shadow-lg border-2 border-solid border-custom-secondary flex  flex-col relative `}
    border-radius: 0 8px 8px 8px;

    &::before {
        content: 'Most recent';
        display: flex;
        position: absolute;
        height: 30px;
        top: -30px;
        
        width: 40%;
        border-radius: 4px 75px 4px 0;
        padding-left: .5em;
        ${tw`bg-white text-gray-500 text-sm items-center`};
    }
}`;

const TestSetCard = styled.section<{ top; left; height?; width? }>`
    ${tw`w-64 h-40 text-black bg-white font-bold text-sm shadow-2xl border-solid rounded-lg  flex  flex-col absolute  p-1  gap-1 `}
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
    const belowView = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log(
        //     window
        //         .getComputedStyle(belowView.current, '::before')
        //         .getPropertyValue('content')
        // );
    });

    useEffect(() => {
        setElRefs((elRefs) =>
            Array(testSets.length)
                .fill(testSets)
                .map((_, i) => {
                    if (elRefs[i]) {
                        elRefs[i].classList.add('animate-showUp');
                        return elRefs[i];
                    } else {
                        return createRef();
                    }
                })
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

    const moveDown = (index) => {
        if (elRefs[index]) {
            elRefs[index].classList.add('animate-moveDown');
            elRefs[index].classList.remove('animate-moveUp');
        }
    };

    const moveCardUp = (index) => {
        if (elRefs[index]) {
            elRefs[index].classList.add('animate-moveUp');
            elRefs[index].classList.remove('animate-showUp');
        }
    };

    return (
        <FolderCardContainer
            // onMouseLeave={closeFolder}
            key={'container' + folder.id}
        >
            <FolderCardBelowView
                text="Most recent"
                className="BelowView"
                key={'below' + folder.id}
                ref={belowView}
            >
                {testSets.map((testSet, index) => {
                    console.log(testSet);
                    return (
                        <Link
                            to={`${folder.id}/testsets/${testSet.id}`}
                            state={testSet}
                        >
                            <TestSetCard
                                key={'testSet' + index}
                                top={index * 22}
                                left={index * 12 + 2}
                                height={160 - index * 40}
                                onMouseLeave={() => moveDown(index)}
                                onMouseOver={() => moveCardUp(index)}
                                ref={(e) => {
                                    elRefs[index] = e;
                                }}
                            >
                                <CardHeader>
                                    <CardText>{testSet.name}</CardText>
                                    <IconActions>
                                        <AiOutlineRead
                                            size={16}
                                            className="text-custom-sub"
                                        ></AiOutlineRead>
                                        <VscChecklist
                                            size={16}
                                            className="text-custom-sub"
                                        ></VscChecklist>
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
                        </Link>
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
