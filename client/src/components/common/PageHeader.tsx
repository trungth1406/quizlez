import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';

const HeaderContainer = styled.header`
    ${tw`grid w-full font-semibold pl-1 grid-rows-1 items-center`}
`;

const HeaderTitle = styled.h6`
    ${tw`text-xl text-white`}
`;

function PageHeader({ header }) {
    const { t } = useTranslation();
    return (
        <HeaderContainer>
            <HeaderTitle>{t(header)}</HeaderTitle>
        </HeaderContainer>
    );
}

export default PageHeader;
