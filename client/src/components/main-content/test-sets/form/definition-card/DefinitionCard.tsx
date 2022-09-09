import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import TestSetInput from '../common/TestSetInput';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdDragHandle } from 'react-icons/md';
import { useFormContext } from 'react-hook-form';

const CardContainer = styled.li`
    ${tw`grid gap-3 w-full 
     bg-custom-secondary text-white rounded-md `}
`;

const CardHeader = styled.section`
    ${tw`grid grid-cols-2 gap-3 p-3 px-5`}
`;

const HeaderContainer = styled.section`
    ${tw`border-b-custom-primary border-b-2 `}
`;
const HeaderLeft = styled.div`
    ${tw`grid grid-cols-1 gap-3 justify-self-start items-center`}
`;

const HeaderRight = styled.div`
    ${tw`grid grid-cols-2 gap-3 justify-self-end items-center`}
`;

const CardBody = styled.section`
    ${tw`grid grid-cols-1 gap-3 p-3 `}
`;

const DefinitionRow = styled.section`
    ${tw`grid grid-cols-2 gap-2 w-full`}
`;

const IconButton = styled.button`
    ${tw`text-white bg-custom-secondary 
    rounded-md p-1`}
`;

function DefinitionCard({ index, definition, removeCard }) {
    const methods = useFormContext();

    const onRemoveClick = (evt) => {
        if (index === 0) {
            evt.preventDefault();
        } else {
            removeCard(index);
        }
    };

    const onDragButtonClick = (evt) => {
        evt.preventDefault();
    };

   

    return (
        <CardContainer>
            <HeaderContainer>
                <CardHeader>
                    <HeaderLeft>{index + 1}</HeaderLeft>
                    <HeaderRight>
                        <IconButton
                            className="cursor-grab"
                            onClick={onDragButtonClick}
                        >
                            <MdDragHandle size={20}></MdDragHandle>
                        </IconButton>
                        <IconButton
                            className="cursor-pointer"
                            onClick={onRemoveClick}
                            disabled={index === 0}
                        >
                            <HiOutlineTrash size={20}></HiOutlineTrash>
                        </IconButton>
                    </HeaderRight>
                </CardHeader>
            </HeaderContainer>
            <CardBody className='CardBody'>
                <DefinitionRow>
                    <TestSetInput
                        label={'testSets.form.label.term'}
                        bgColor={'bg-custom-secondary'}
                        inputWidth={'w-full'}
                        {...methods}
                        registerKey={`definitionCards[${index}].term`}
                        validations={index === 0 ? { required: true } : {}}
                        errorMessage={
                            'testSets.form.errors.definition.atLeastOne'
                        }
                    ></TestSetInput>
                    <TestSetInput
                        label={'testSets.form.label.definition'}
                        bgColor={'bg-custom-secondary'}
                        inputWidth={'w-full'}
                        {...methods}
                        registerKey={`definitionCards[${index}].definition`}
                        validations={index === 0 ? { required: true } : {}}
                        errorMessage={
                            'testSets.form.errors.definition.atLeastOne'
                        }
                    ></TestSetInput>
                </DefinitionRow>
            </CardBody>
        </CardContainer>
    );
}

export default DefinitionCard;
