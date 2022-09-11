import { Tooltip } from '@mui/material';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

const CardHeader = styled.div`
    ${tw`w-full flex gap-2 justify-evenly cursor-pointer`}
`;

function GuidanceCard({ folderId }) {
    return (
        <>
            <CardHeader>
                <Tooltip
                    title="View all Test Set"
                    placement="top"
                >
                    <sub>
                        <Link to={`${folderId}/testsets`}>
                            <AiOutlineOrderedList
                                size={22}
                                className="text-custom-sub"
                            ></AiOutlineOrderedList>
                        </Link>
                    </sub>
                </Tooltip>
                <Tooltip
                    title="Create new Test Set"
                    placement="top"
                >
                    <sub>
                        <Link to={`${folderId}/testsets/form`}>
                            <BiBookAdd
                                size={22}
                                className="text-custom-sub"
                            ></BiBookAdd>
                        </Link>
                    </sub>
                </Tooltip>
            </CardHeader>
        </>
    );
}

export default GuidanceCard;
