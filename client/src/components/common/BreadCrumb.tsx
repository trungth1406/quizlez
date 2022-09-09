import styled from 'styled-components';
import tw from 'twin.macro';
import { FaRegFolderOpen } from 'react-icons/fa';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderContainer = styled.section`
    ${tw`flex grid-rows-none gap-3 items-end animate-fadeIn`}
`;

const HeaderText = styled.header`
    ${tw`p-0 m-0 animate-fadeIn`}
`;

const IconContainer = styled.div`
    ${tw`flex items-center justify-start cursor-pointer `}
`;

function BreadCrumb({ selectedItem }) {
    const location = useLocation();
    const [breadCrumbItems, setBreadCrumbItems] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const { pathname } = location;
        const currentPathSplit = pathname.split('/');
        let currentPathKey = currentPathSplit.pop();
        const fixedPath = `breadCrumb.${currentPathKey}.current`;
        let newItem = t(fixedPath);
        let newBreadCrumbItems = breadCrumbItems.filter(
            (_, index) => index > 0
        );
        if (newBreadCrumbItems.length === 0) {
            if (newItem === fixedPath) {
                const currentPrev =
                    currentPathSplit[currentPathSplit.length - 1];
                newItem = t(`breadCrumb.${currentPrev}.next`);
            }

            if (selectedItem.id && Number.isSafeInteger(selectedItem.id)) {
                let prev = currentPathSplit.pop();
                while (
                    currentPathSplit.length > 0 &&
                    Number(prev) !== selectedItem.id
                ) {
                    newBreadCrumbItems.push(t(`breadCrumb.${prev}.current`));
                    prev = currentPathSplit.pop();
                }
            }

            newBreadCrumbItems.push(newItem);
        } else {
            const matched = newBreadCrumbItems.findIndex(
                (item) => item === newItem
            );
            if (matched === -1) {
                let prevItem = newBreadCrumbItems.length - 1;

                if (prevItem >= 0 && newItem && newItem === fixedPath) {
                    const currentPrev =
                        currentPathSplit[currentPathSplit.length - 1];
                    newBreadCrumbItems.push(
                        t(`breadCrumb.${currentPrev}.next`)
                    );
                } else {
                    newBreadCrumbItems.push(newItem);
                }
            } else {
                newBreadCrumbItems = newBreadCrumbItems.filter(
                    (_, index) => index <= matched
                );
            }
        }

        setBreadCrumbItems([selectedItem, ...newBreadCrumbItems]);
    }, [selectedItem, location]);

    return (
        <HeaderContainer
            className="group"
            key={'folderIcon'}
        >
            <IconContainer>
                <FaRegFolderOpen
                    className="relative pt-3"
                    size={40}
                    color={'#4254FF'}
                ></FaRegFolderOpen>
            </IconContainer>
            {breadCrumbItems
                .filter((item) => item !== null)
                .map((item, index) => {
                    return (
                        <IconContainer key={index}>
                            <HeaderText>
                                {item.name ? item.name : item}
                            </HeaderText>
                            {index !== breadCrumbItems.length - 1 && (
                                <IconContainer>
                                    <MdOutlineNavigateNext
                                        size={20}
                                        color={'#4254FF'}
                                    ></MdOutlineNavigateNext>
                                </IconContainer>
                            )}
                        </IconContainer>
                    );
                })}
        </HeaderContainer>
    );
}

export default BreadCrumb;
