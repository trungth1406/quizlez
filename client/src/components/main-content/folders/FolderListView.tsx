import styled from 'styled-components';
import tw from 'twin.macro';
import FolderCard from './FolderCard';
import { BsSortDown, BsSortDownAlt, BsSortUp } from 'react-icons/bs';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ListViewWrapper = styled.main`
    ${tw` clear-both ml-auto mr-auto flex flex-col mt-5 gap-3`}
`;

const SearchBoxContainer = styled.section`
    ${tw`flex justify-center  w-full`}
`;

const SearchBox = styled.input`
    ${tw`border-b-2 border-b-custom-second-sub hocus:border-b-custom-sub  p-1  font-light text-sm bg-custom-primary  focus:outline-none pb-3`}
    width: 60%;
`;

const FolderGridView = styled.section`
    ${tw`grid gap-3 w-full h-full mt-9`}
    grid-row-gap: 3rem;
    grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
    // columns template that does not overflow
    grid-template-columns: repeat(4, minmax(250px, 1fr));
`;

const ActionContainer = styled.section`
    ${tw`flex justify-center gap-3`}
`;

const IconButton = styled.button`
    ${tw`text-white bg-custom-secondary rounded-md   font-light text-sm p-3 w-10 h-10`}
`;

function FolderListView() {
    const [favoriteFilter, setFavoriteFilter] = useState(false);
    const [sortFilter, setSortFilter] = useState(false);
    const [folderList, setFolderList] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/folders`)
        .then((result) => {
            const responseBody = result.data;
            setFolderList(responseBody.data);
        })
        .catch();
    }, []);

    return (
        <ListViewWrapper>
            <SearchBoxContainer>
                <SearchBox placeholder="Enter folder name to search"></SearchBox>
            </SearchBoxContainer>
            <ActionContainer>
                <IconButton onClick={() => setSortFilter(!sortFilter)}>
                    {sortFilter ? <BsSortDown /> : <BsSortUp />}
                </IconButton>
                <IconButton onClick={() => setFavoriteFilter(!favoriteFilter)}>
                    {favoriteFilter ? (
                        <MdOutlineFavoriteBorder />
                    ) : (
                        <MdOutlineFavorite />
                    )}
                </IconButton>
            </ActionContainer>
            <FolderGridView>
                {folderList.map((folder, index) => {
                    return <FolderCard folder={folder} key={index}></FolderCard>;
                })}
            </FolderGridView>
        </ListViewWrapper>
    );
}

export default FolderListView;
