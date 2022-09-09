import styled from 'styled-components';
import tw from 'twin.macro';
import { FaRegFolder, FaPlus } from 'react-icons/fa';

import axios from 'axios';
import { useState } from 'react';
import ItemForm from './ItemForm';
import FolderItem from './FolderItem';
import { useTranslation } from 'react-i18next';

const Container = styled.section`
    ${tw`flex  h-full items-center justify-between pl-2 pr-2`}
`;

const ItemText = styled.section`
    ${tw` w-full text-white font-light text-sm pl-4 `}
`;
function MenuItem({ item, updateRootMenu }) {
    const { subMenus } = item;
    const [childrenMenu, setChildrenMenu] = useState(subMenus);

    const updateChildren = (newItem?: any) => {
        setChildrenMenu([...childrenMenu, newItem ? newItem : {}]);
    };

    const reloadChildren = () => {
        axios
            .get(`http://localhost:3001/menus/${item.id}/folders`)
            .then((result) => {
                const responseBody = result.data;
                setChildrenMenu(responseBody.data.subMenus);
            })
            .catch();
    };

    return (
        <>
            {item.type === 1 && (
                <RootItem
                    key={'root' + item.id}
                    item={item}
                    updateItems={updateChildren}
                ></RootItem>
            )}
            {childrenMenu !== null &&
                childrenMenu.map((sub, index) => (
                    <>
                        {sub.menuId === item.id && (
                            <FolderItem
                                key={'item' + sub.id}
                                item={sub}
                            ></FolderItem>
                        )}
                        {sub.id === undefined && (
                            <ItemForm
                                key={index}
                                item={sub}
                                parent={item}
                                reloadChildren={reloadChildren}
                            ></ItemForm>
                        )}
                    </>
                ))}
        </>
    );
}

const RootItem = ({ item, updateItems }) => {
    const { t } = useTranslation();
    const translated = `folders.${item.name.toLowerCase()}`;
    const addNewFolder = (event) => {
        updateItems();
    };
    return (
        <Container>
            <FaRegFolder
                size={30}
                color={'#4254FF'}
            ></FaRegFolder>
            <ItemText>{t(translated)}</ItemText>
            <button onClick={addNewFolder}>
                <FaPlus
                    size={16}
                    color={'#4254FF'}
                ></FaPlus>
            </button>
        </Container>
    );
};

export default MenuItem;
