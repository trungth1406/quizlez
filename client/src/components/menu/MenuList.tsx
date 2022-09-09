import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MenuItem from './MenuItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';

const ListWrapper = styled.ul`
    ${tw`flex flex-col pt-3`}
`;

const ListItemWrapper = styled.li`
    ${tw`bg-custom-secondary h-10 w-full`}
`;

function MenuList() {
    const [menuItems, setMenuItems] = useState([]);
    const [parent] = useAutoAnimate<any>();
    useEffect(() => {
        axios
            .get('http://localhost:3001/menus')
            .then((result) => {
                setMenuItems(result.data.data);
            })
            .catch();
    }, []);

    const updateMenuItem = (newItem?: any) => {
        setMenuItems([...menuItems, newItem ? newItem : {}]);
    };

    return (
        <ListWrapper>
            <ListItemWrapper ref={parent} key={'wrapper'}>
                {menuItems.map((item, index) => {
                    return (
                        <MenuItem
                            key={'root' + index}
                            item={item}
                            updateRootMenu={updateMenuItem}
                        ></MenuItem>
                    );
                })}
            </ListItemWrapper>
        </ListWrapper>
    );
}

export default MenuList;
