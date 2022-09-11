import axios from 'axios';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CommonRevertColorInput from '../../../../common/CommonInput';
import { debounce } from 'lodash';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    fromEvent,
    map,
    tap,
} from 'rxjs';

function GeneralInformationGroup({ folderId }) {
    const methods = useFormContext();
    const { setError, getValues, register, clearErrors } = methods;
    const titleRef = useRef();

    const titleRegistration = register('title', {
        required: true,
    });

    useEffect(() => {
        let titleSub = fromEvent(titleRef.current, 'keyup')
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                map((_) => getValues('title')),
                filter((title) => title && title !== ''),
                tap((title) => {
                    axios
                        .get(
                            `http://localhost:3001/folders/${folderId}/testSets?` +
                                new URLSearchParams({
                                    title: title,
                                })
                        )
                        .then((res) => {
                            if (res.data.data && res.data.data.length === 0) {
                                clearErrors('title');
                            } else {
                                setError(
                                    'title',
                                    {
                                        types: {
                                            custom: 'Title already exists',
                                        },
                                    },
                                    {
                                        shouldFocus: true,
                                    }
                                );
                            }
                        });
                })
            )
            .subscribe();
        return () => {
            titleSub.unsubscribe();
        };
    });

    return (
        <>
            <CommonRevertColorInput
                placeHolder={'testSets.form.placeHolder.name'}
                label={'testSets.form.label.name'}
                {...methods}
                errorMessage={'testSets.form.errors.name'}
                registerKey={'title'}
                validations={{ required: true }}
                customRegistration={titleRegistration}
                shareRef={titleRef}
            ></CommonRevertColorInput>
            <CommonRevertColorInput
                placeHolder={'testSets.form.placeHolder.description'}
                label={'testSets.form.label.description'}
                {...methods}
                errorMessage={'testSets.form.errors.description'}
                registerKey={'description'}
            ></CommonRevertColorInput>
        </>
    );
}

export default GeneralInformationGroup;
