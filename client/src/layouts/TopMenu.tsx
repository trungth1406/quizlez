import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import TopLeftMenuActionList from '../components/top-menu/TopLeftMenuActionList';
import TopRightMenuActionList from '../components/top-menu/TopRightMenuActionList';

const Container = styled.section`
    ${tw`bg-custom-primary  h-6 absolute top-0 left-0 w-full flex content-between`};
    box-shadow: 0px 1px 4px rgba(91, 90, 90, 0.25);
    height: 70px;
    z-index: 999;
    gap: 3em;
`;

const Logo = styled.h2`
    ${tw`flex justify-items-center items-center justify-center w-full text-white text-3xl pt-3`}
    flex: 0 0 15%;
`;

const MenuAction = styled.section`
    ${tw`flex justify-items-center content-center justify-center w-full text-white text-sm gap-3`}
    flex: 0 0 30%;
`;

export const TopMenu = () => {
    return (
        <Container>
            <Logo>QUIZLEZ</Logo>
            <MenuAction>
                <TopLeftMenuActionList></TopLeftMenuActionList>
            </MenuAction>
            <MenuAction>
                <TopRightMenuActionList></TopRightMenuActionList>
            </MenuAction>
        </Container>
    );
};
export default TopMenu;
