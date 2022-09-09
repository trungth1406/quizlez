import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';
import styled from 'styled-components';
import tw from 'twin.macro';

const FormWrapper = styled.section`
    ${tw`w-full pt-3 pl-3 h-12`}
`;

const Form = styled.form`
    ${tw`flex items-center`}
    box-shadow: 0px 0px 12px 4px #2E3856;
    height: 2.5em;
`;

const FormInput = styled.input`
    ${tw`border-none  rounded-tl-md  h-10
    rounded-bl-md w-full text-sm outline-none bg-custom-primary `}
    box-shadow: -10px 0px 12px 4px #2E3856;
    text-indent: 1em;
`;

const ToolTips = styled.div`
    ${tw`
     relative left-44 p-2  w-full 
     text-custom-sub rounded-md  
     invisible group-hocus:visible 
     transition ease-in duration-500
     `};
    box-shadow: 0px 0px 12px 4px rgba(66, 84, 255, 0.25);
    font-size: 12px;
    top: -2.95em;
    width: max-content;
`;

const Triangle = styled.sub`
    ${tw`relative left-3`}
    width: 0;
    height: 0;
    top: 0.5em;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 4px solid rgba(66, 84, 255, 0.25);
    box-shadow: 0px 0px 12px 4px rgba(66, 84, 255, 0.25);
    display: none;
`;

function ItemForm({ item, parent, reloadChildren }) {
    const [toolTipText, settoolTipText] = useState('Fill in your folder name');
    const [folderNameStatus, setFolderNameStatus] = useState('LOADING');

    const toolTipRef = useRef();
    const inputRef: any = useRef();
    const formRef: any = useRef();
    const [toolTipAnimation] = useAutoAnimate<any>();

    useEffect(() => {
        const formSubscription = fromEvent(inputRef.current, 'keyup')
            .pipe(
                debounceTime(150),
                map((_) => {
                    const form = formRef.current;
                    if (form && form['folderName'].value) {
                        return form['folderName'].value;
                    } else {
                        setFolderNameStatus('');
                        return null;
                    }
                }),
                filter((query) => query !== null),
                map(async (query) => {
                    return fetch(
                        'http://localhost:3001/menus?' +
                            new URLSearchParams({
                                name: query,
                            })
                    );
                }),
                tap((promise) => {
                    promise
                        .then((res) => res.json())
                        .then((result) => {
                            let status = '';
                            if (result.data) {
                                settoolTipText('Folder name already exists');
                                status = 'ERROR';
                            } else {
                                status = 'SUCCESS';
                            }
                            setFolderNameStatus(status);
                        });
                })
            )
            .subscribe();

        return () => {
            formSubscription.unsubscribe();
        };
    }, []);

    const updateTooltipText = (event) => {
        let text = toolTipText;
        if (event.target.value) {
            text = 'Now press enter to create new folder';
        } else {
            text = 'Fill in your folder name';
        }
        settoolTipText(text);
    };

    const onFolderNameChanges = (event) => {
        updateTooltipText(event);
    };

    const showToolTip = () => {
        const currentTooltip: any = toolTipRef.current;
        if (currentTooltip) {
            currentTooltip['classList'].add('group');
        }
    };

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        const form = formRef.current;
        console.log(parent);

        axios
            .post('http://localhost:3001/folders', {
                parentMenuId: parent.id,
                type: 2,
                name: form['folderName'].value,
            })
            .then((response) => {
                if (response.data) {
                    reloadChildren();
                }
            })
            .catch();
    };

    return (
        <FormWrapper ref={toolTipRef}>
            <Form
                ref={formRef}
                onSubmit={onFormSubmit}
            >
                <FormInput
                    ref={inputRef}
                    onChange={onFolderNameChanges}
                    onFocus={showToolTip}
                    name={'folderName'}
                ></FormInput>
                {folderNameStatus === 'SUCCESS' && (
                    <AiOutlineCheckCircle
                        size={20}
                        style={{
                            color: 'green',
                            marginRight: '1em',
                        }}
                    ></AiOutlineCheckCircle>
                )}
                {folderNameStatus === 'ERROR' && (
                    <GiCancel
                        size={20}
                        style={{
                            color: 'red',
                            display: 'flex',
                            marginRight: '1em',
                        }}
                    ></GiCancel>
                )}
            </Form>
            <Triangle></Triangle>
            <ToolTips ref={toolTipAnimation}>{toolTipText}</ToolTips>
        </FormWrapper>
    );
}

export default ItemForm;
