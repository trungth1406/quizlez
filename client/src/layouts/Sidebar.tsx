import * as React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MenuList from '../components/menu/MenuList';

const Container = styled.section`
    ${tw` h-full  left-0  bg-custom-primary text-white  flex-grow-0 flex-shrink`};
    box-shadow: 1px 0px 4px rgba(91, 90, 90, 0.25);
    max-width: 180px;
    width: 100%;
    z-index: 1;
`;

const MenuWrapper = styled.section`
    ${tw`flex flex-col gap-4`};
`;

function Sidebar() {
    return (
        <Container>
            <MenuWrapper>
                <MenuList></MenuList>
            </MenuWrapper>
        </Container>
    );
}

export default Sidebar;
