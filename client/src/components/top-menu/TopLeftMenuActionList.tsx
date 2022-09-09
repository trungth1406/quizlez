import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

const ActionList = styled.ul`
    ${tw`flex  w-full text-white text-sm gap-5`}
    & > * {
        flex: 0 0 20%;
    }
`;

const ActionItem = styled.li<{ active?: boolean }>`
    ${tw`w-full flex   items-center border-b-4 border-solid  
    border-custom-sub pt-3  h-full justify-center`}
    // border-color: ${(props) => (props.active ? '#3B82F6' : 'transparent')};
`;

const ButtonItem = styled.section`
    ${tw`w-full flex   items-center
    pt-3  h-full`}
`;

const ActinButton = styled.button`
    ${tw`bg-custom-sub px-2 py-2 rounded w-full`  }
`;

function TopLeftMenuActionList() {
    const { t } = useTranslation();
    return (
        <ActionList>
            <Link to={'/folders'}>
                <ActionItem active={true}>{t('folders.folders')}</ActionItem>
            </Link>
            <ButtonItem>
                <ActinButton>{t('common.create')}</ActinButton>
            </ButtonItem>
        </ActionList>
    );
}

export default TopLeftMenuActionList;
