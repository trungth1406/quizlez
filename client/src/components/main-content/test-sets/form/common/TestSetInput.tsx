import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';

interface InputProps {
    color?: string;
    inputWidth?: string;
}

const InputContainer = styled.div`
    ${tw`grid gap-3 p-2`}
`;

const Input = styled.input<InputProps>`
    ${tw`text-white outline-none border-b-2 
    border-white p-1 focus:border-custom-second-sub`};
`;

const InputLabel = styled.label`
    ${tw`text-sm font-light`}
    font-size: .775rem !important;
`;

const ErrorText = styled.span`
    ${tw`text-red-500`}
    font-size: .775rem !important;
`;

function TestSetInput({
    placeHolder = '',
    label,
    bgColor = 'bg-custom-primary',
    inputWidth = 'w-1/2',
    errorMessage = '',
    formState: { errors },
    register,
    registerKey,
    validations = {},
    customRegistration = null,
    shareRef = null,
}) {
    const { t } = useTranslation();
    const { ref, ...rest } =
        customRegistration && shareRef
            ? customRegistration
            : { ref: null, rest: null };

    const isRegisterKeyArray = () => {
        return /^([a-zA-Z])*\[(\d+?)\](\.)?([a-zA-Z])+$/.test(registerKey);
    };
    const isArrayError = () => {
        const hasArrayTypeErrors = (errorType: string) => {
            const openSquareBracket = registerKey.indexOf('[');
            const closeSquareBracket = registerKey.indexOf(']');

            const arrayPath = registerKey.substring(0, openSquareBracket);
            const arrayIndex = registerKey.substring(
                openSquareBracket + 1,
                closeSquareBracket
            );
            const keyPath = registerKey.substring(
                closeSquareBracket + 2,
                registerKey.length
            );
            return (
                errors[arrayPath] &&
                errors[arrayPath][arrayIndex] &&
                errors[arrayPath][arrayIndex][keyPath]?.type === errorType
            );
        };

        return errors && isRegisterKeyArray() && hasArrayTypeErrors('required');
    };

    return (
        <InputContainer className={`${inputWidth}`}>
            {!customRegistration && (
                <Input
                    {...register(registerKey, validations)}
                    placeholder={t(placeHolder)}
                    className={`${bgColor}`}
                />
            )}
            {customRegistration && shareRef && (
                <Input
                    {...rest}
                    ref={(e) => {
                        ref(e);
                        shareRef.current = e;
                    }}
                    placeholder={t(placeHolder)}
                    className={`${bgColor}`}
                />
            )}
            <InputLabel>
                {errors[registerKey]?.type === 'required' && (
                    <ErrorText className="text-red-500">
                        {t(errorMessage).toUpperCase()}
                    </ErrorText>
                )}
                {errors[registerKey] && errors[registerKey]?.types && (
                    <ErrorText className="text-red-500">
                        {t(errors[registerKey].types.custom).toUpperCase()}
                    </ErrorText>
                )}
                {isArrayError() && (
                    <ErrorText className="text-red-500">
                        {t(errorMessage).toUpperCase()}
                    </ErrorText>
                )}
                {!isArrayError() &&
                    !errors[registerKey] &&
                    t(`${label}`).toUpperCase()}
            </InputLabel>
        </InputContainer>
    );
}

export default TestSetInput;
