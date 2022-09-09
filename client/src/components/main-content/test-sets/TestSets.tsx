import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import TestSetCard from './list-view/TestSetCard';
import TestSetDetailView from './detail-view/TestSetDetailView';
import TestSetGridView from './list-view/TestSetGridView';

function TestSets({ folderId }) {
    const [testSets, setTestSets] = useState([]);
    const [selectedTestSet, setSelectedTestSet] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/folders/${folderId}/testSets`)
            .then((response) => {
                setTestSets(response.data.data);
            })
            .catch();
    }, [folderId]);
    return (
        <Routes>
            <Route
                path=""
                element={
                    <TestSetGridView
                        testSets={testSets}
                        folderId={folderId}
                        
                    />
                }
            />
            <Route
                path=":id"
                element={<TestSetDetailView />}
            />
        </Routes>
    );
}

export default TestSets;
