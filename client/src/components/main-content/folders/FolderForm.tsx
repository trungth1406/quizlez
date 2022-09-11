import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';
import CommonRevertColorInput from '../../common/CommonInput';
import AddButton from '../../common/AddButton';
import { useForm, useFormContext } from 'react-hook-form';

const FolderCardFromView = styled.section`
    ${tw`w-80 h-48 bg-custom-secondary  shadow-lg border-2 border-dashed border-custom-secondary flex  flex-col  `}
    border-radius: 0 8px 8px 8px;
    top: 0;

    &::before {
        content: '';
        display: flex;
        position: relative;
        height: 30px;
        top: -27px;
        left: -2px;
        ${tw`bg-custom-secondary `};
        width: 40%;
        border-radius: 4px 75px 4px 0;
    }
`;
const FolderAddButton = styled.section`
    ${tw`pt-0 w-full h-full flex mt-0 `}
    margin-top: -2em;
`;

const FormWrapper = styled.section`
    ${tw`h-full flex flex-col justify-start`}
    width: auto;
`;

function FolderForm() {
    const [isCreateMode, setIsCreateMode] = useState(false);
    const { t } = useTranslation();
    const methods = useForm();

    const addNewFolder = () => {};

    return (
        <FolderCardFromView className="FolderCardFormView">
            {isCreateMode ? (
                <FormWrapper>
                    <CommonRevertColorInput
                        placeHolder={'testSets.form.placeHolder.name'}
                        bgColor={'bg-custom-secondary'}
                        label={'testSets.form.label.name'}
                        inputWidth={'w-full'}
                        {...methods}
                        errorMessage={'testSets.form.errors.name'}
                        registerKey={'folderName'}
                    ></CommonRevertColorInput>
                    <CommonRevertColorInput
                        placeHolder={'testSets.form.placeHolder.description'}
                        label={'testSets.form.label.description'}
                        bgColor={'bg-custom-secondary'}
                        inputWidth={'w-full'}
                        {...methods}
                        errorMessage={'testSets.form.errors.description'}
                        registerKey={'folderName'}
                    ></CommonRevertColorInput>
                </FormWrapper>
            ) : (
                <FolderAddButton onClick={() => setIsCreateMode(true)}>
                    <AddButton
                        text={t(
                            'testSets.form.definitionCards.add'
                        ).toLocaleUpperCase()}
                        onClick={addNewFolder}
                    />
                </FolderAddButton>
            )}
        </FolderCardFromView>
    );
}

export default FolderForm;
