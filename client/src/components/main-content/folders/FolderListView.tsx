import styled from 'styled-components';
import tw from 'twin.macro';
import FolderCard from './FolderCard';
import { BsSortDown, BsSortDownAlt, BsSortUp } from 'react-icons/bs';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { useForm } from 'react-hook-form';
import FolderForm from './FolderForm';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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
    ${tw`grid gap-3 h-full mt-9`}
    grid-row-gap: 1rem;
    grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    clear: both;
    margin-left: auto;
    margin-right: auto;
    grid-gap: 8em;

  
        
}
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
    const { register, getValues } = useForm();
    const { ref, ...rest } = register('searchBox');
    const [folderListAnimRef] = useAutoAnimate<any>();

    const searchBox = useRef<any>();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/folders`)
            .then((result) => {
                const responseBody = result.data;
                setFolderList(responseBody.data);
            })
            .catch();

        const searchSub = fromEvent(searchBox.current, 'keyup')
            .pipe(
                debounceTime(250),
                tap(() => {
                    axios
                        .get(
                            `http://localhost:3001/folders?` +
                                new URLSearchParams({
                                    name: getValues('searchBox'),
                                })
                        )
                        .then((result) => {
                            const responseBody = result.data;
                            setFolderList(responseBody.data);
                        })
                        .catch();
                })
            )
            .subscribe();

        return () => {
            searchSub.unsubscribe();
        };
    }, []);

    return (
        <ListViewWrapper>
            <SearchBoxContainer>
                <SearchBox
                    {...rest}
                    placeholder="Enter folder name to search"
                    ref={(element) => {
                        ref(element);
                        searchBox.current = element;
                    }}
                ></SearchBox>
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
            <FolderGridView ref={folderListAnimRef}>
                <FolderForm />
                {folderList.map((folder, index) => {
                    return (
                        <FolderCard
                            folder={folder}
                            key={index}
                        ></FolderCard>
                    );
                })}
            </FolderGridView>
        </ListViewWrapper>
    );
}

export default FolderListView;
