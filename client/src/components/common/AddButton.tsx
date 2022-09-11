import { t } from 'i18next';
import { IoAddOutline } from 'react-icons/io5';
import styled from 'styled-components';
import tw from 'twin.macro';

const AddButtonWrapper = styled.div`
    ${tw`flex items-center justify-center grid-cols-1 w-full bg-custom-secondary rounded-md justify-items-center h-full py-5`}
`;

const AddSection = styled.section`
    ${tw`flex items-center   justify-center  border-b-custom-sub border-b-8 w-max`}
`;
const ActionButton = styled.button`
    ${tw`text-white bg-custom-secondary rounded-md p-1  font-light text-sm`}
`;

function AddButton({ text, onClick }) {
    return (
        <AddButtonWrapper onClick={onClick}>
            <AddSection>
                <IoAddOutline></IoAddOutline>
                <ActionButton>{text}</ActionButton>
            </AddSection>
        </AddButtonWrapper>
    );
}

export default AddButton;
