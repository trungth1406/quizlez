import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { VscChecklist } from 'react-icons/vsc';
import styled from 'styled-components';
import tw from 'twin.macro';

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

const TestSetCard = styled.section<{ top; left; height? }>`
    ${tw`w-64 h-40 text-black bg-white font-bold text-sm shadow-2xl border-solid rounded-lg  flex  flex-col absolute  p-1  gap-1 hover:animate-moveUp `}
    border-width: 1px;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    height: ${(props) => (props.height ? props.height : 160)}px;
`;

const CardHeader = styled.div`
    ${tw`w-full flex gap-2`}
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
    const testSetRef = useRef<HTMLDivElement>(null);

    const openFolder = () => {
        upperRef.current?.classList.add('animate-openFolder');
        upperRef.current?.classList.remove('animate-closeFolder');
    };

    const closeFolder = () => {
        if (upperRef.current?.classList.contains('animate-openFolder')) {
            upperRef.current?.classList.remove('animate-openFolder');
            upperRef.current?.classList.add('animate-closeFolder');
        }
    };

    const moveDown = () => {
        testSetRef.current?.classList.add('animate-moveDown');
        testSetRef.current?.classList.remove('animate-moveUp');
    };

    return (
        <FolderCardContainer
         onMouseLeave={closeFolder}
        >
            <FolderCardBelowView className="BelowView">
                <TestSetCard
                    top={0}
                    left={4}
                    onMouseLeave={moveDown}
                    ref={testSetRef}
                >
                    <CardHeader>
                        <p className="w-full">Card Header 1</p>
                        <IconActions>
                            <AiOutlineRead
                                size={20}
                                color="#D66853"
                            ></AiOutlineRead>
                            <VscChecklist
                                size={20}
                                color={'#D66853'}
                            ></VscChecklist>
                        </IconActions>
                    </CardHeader>
                </TestSetCard>
                <TestSetCard
                    top={32}
                    left={14}
                    height={140}
                    onMouseLeave={moveDown}
                    ref={testSetRef}
                >
                    <p>Card Header 2</p>
                </TestSetCard>
                <TestSetCard
                    top={64}
                    left={28}
                    height={100}
                    onMouseLeave={moveDown}
                    ref={testSetRef}
                >
                    <p>Card Header 2</p>
                </TestSetCard>
            </FolderCardBelowView>
            <FolderCardUpperView
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
