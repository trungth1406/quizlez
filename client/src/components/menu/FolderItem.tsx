import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

interface ItemCustomProps {
    isActive: boolean;
}

const GroupItem = styled.section`
    ${tw`mt-2 pl-2  items-center justify-between h-full w-full`}
`;

const SubItemContainer = styled.section<ItemCustomProps>`
    ${tw`mt-2 pl-2 flex  h-full items-center justify-between ml-3 pr-2
     bg-custom-secondary
     hover:shadow-customMenu 
     cursor-pointer
     `}
    box-shadow: ${(props) =>
        props.isActive ? '0px 0px 12px 4px rgba(66, 84, 255, 0.40)' : ''}
`;

const FolderText = styled.section`
    ${tw`flex justify-around w-full text-white font-light text-sm`}
`;

function FolderItem({ item }) {
    const location = useLocation();
    const defaultPath = '/folders';
    const isActive = location.pathname.includes(`${defaultPath}/${item.id}/`);

    return (
        <GroupItem className="group">
            <Link to={`${defaultPath}/${item.id}/testsets`}>
                <SubItemContainer isActive={isActive}>
                    <FolderText>{item.name}</FolderText>
                </SubItemContainer>
            </Link>
        </GroupItem>
    );
}

export default FolderItem;
