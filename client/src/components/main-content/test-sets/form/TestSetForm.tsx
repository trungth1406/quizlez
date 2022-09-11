import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';
import PageHeader from '../../../common/PageHeader';
import DefinitionCard from './definition-card/DefinitionCard';
import { IoAddOutline } from 'react-icons/io5';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FormProvider, useForm } from 'react-hook-form';
import GeneralInformationGroup from './general-information/GeneralInfoGroup';
import axios from 'axios';

const FormContainer = styled.form`
    ${tw`grid  gap-5  h-full grid-rows-3 grid-cols-1 px-10 animate-fadeIn clear-both ml-auto mr-auto`}
    width: 80%;
`;

const CardListWrapper = styled.section`
    ${tw`grid grid-cols-1 gap-5 w-full h-full`}// grid-template-columns: minmax(250px, 1fr) minmax(250px, 1fr)
`;

const CardList = styled.ul`
    ${tw`grid gap-3 w-full min-h-0 grid-rows-1 grid-cols-1`}
`;

const AddButtonWrapper = styled.div`
    ${tw`grid justify-self-end grid-cols-1
     w-full bg-custom-secondary rounded-md justify-items-center h-full py-5`}
`;

const AddSection = styled.section`
    ${tw`flex m-3 items-center   justify-center  border-b-custom-sub border-b-8 w-max`}
`;
const AddButton = styled.button`
    ${tw`text-white bg-custom-secondary rounded-md p-1  font-light text-sm`}
`;

const PageHeaderContainer = styled.header`
    ${tw`grid w-full font-semibold  grid-cols-2 items-center sticky  z-10  bg-custom-primary h-full`}
    top: -12px;
`;

const SubmitContainer = styled.section`
    ${tw`flex justify-end`}
`;

const SubmitButton = styled.button`
    ${tw`text-white bg-custom-secondary rounded-md p-1 font-semibold text-sm w-1/6 items-end`}
`;

function TestSetForm({ folderId }) {
    const [cardDefinition, setCardDefinition] = useState([{}]);
    const { t } = useTranslation();
    const [cardList] = useAutoAnimate<any>();
    const methods = useForm();

    const addNewCard = () => {
        setCardDefinition([...cardDefinition, {}]);
    };

    const onCardRemove = (index) => {
        const newCardDefinition = cardDefinition.filter((_, i) => i !== index);
        methods.unregister(`definitionCards[${index}].term`);
        methods.unregister(`definitionCards[${index}].definition`);
        setCardDefinition(newCardDefinition);
    };

    const onSubmit = (data, e) => {
        data.folderId = Number(folderId);
        axios
            .post(`http://localhost:3001/folders/${folderId}/testSets`, data)
            .then((res) => {
                console.log(res);
            });
    };

    return (
        <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <PageHeaderContainer>
                    <PageHeader header={'testSets.header.create'}></PageHeader>
                    <SubmitContainer>
                        <SubmitButton type="submit">
                            {t('common.save').toUpperCase()}
                        </SubmitButton>
                    </SubmitContainer>
                </PageHeaderContainer>
                <GeneralInformationGroup
                    folderId={folderId}
                ></GeneralInformationGroup>
                <CardListWrapper>
                    <CardList ref={cardList}>
                        {cardDefinition.map((definition, index) => {
                            return (
                                <DefinitionCard
                                    key={index}
                                    index={index}
                                    definition={definition}
                                    removeCard={onCardRemove}
                                ></DefinitionCard>
                            );
                        })}
                    </CardList>
                </CardListWrapper>
                <AddButtonWrapper onClick={addNewCard}>
                    <AddSection>
                        <IoAddOutline></IoAddOutline>
                        <AddButton>
                            {t(
                                'testSets.form.definitionCards.add'
                            ).toLocaleUpperCase()}
                        </AddButton>
                    </AddSection>
                </AddButtonWrapper>
            </FormProvider>
        </FormContainer>
    );
}

export default TestSetForm;
