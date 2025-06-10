import React, { useState, useMemo } from 'react';
import { api } from '../api/api';

import ThreadFilters from '../components/ThreadFilters';
import ThreadsTable from '../components/ThreadsTable';

import "./CVThreadsPage.css"

function formatDateForInput(dateObject) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

const initialEndDate = formatDateForInput(today);
const initialStartDate = formatDateForInput(oneMonthAgo);

const CVThreadsPage = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [filters, setFilters] = useState({
        startDate: initialStartDate,
        endDate: initialEndDate,
        searchTerm: '',
        groupBy: 'none',
    });
    const [sourceData, setSourceData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'creation_date', direction: 'DESC' });

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFetchData = async () => {
        if (!filters.startDate || !filters.endDate) {
            setError('Please enter both start and end dates.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await api.get('', {
                params: {division_name: 'Java', start_date: filters.startDate, end_date: filters.endDate }
            });
            setSourceData(response.data);
        } catch (err) {
            setError(`Failed to fetch data: ${err.message}`);
            setSourceData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = () => {
        const newDirection = sortConfig.direction === 'ASC' ? 'DESC' : 'ASC';
        setSortConfig({ key: 'creation_date', direction: newDirection });
    };

    const processedData = useMemo(() => {
        console.log("memo")
        let filtered = sourceData;
        if (filters.searchTerm) {
            const regex = new RegExp(filters.searchTerm, 'i');
            filtered = sourceData.filter(item => regex.test(item.rebus));
        }

        const sorted = [...filtered].sort((a, b) => {
            const dateA = new Date(a[sortConfig.key]);
            const dateB = new Date(b[sortConfig.key]);
            return sortConfig.direction === 'ASC' ? dateA - dateB : dateB - dateA;
        });

        if (filters.groupBy === 'none') {
            return sorted;
        }
        const groupKey = filters.groupBy === 'person' ? 'rebus' : 'deal_name';
        return sorted.reduce((acc, item) => {
            const key = item[groupKey];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});

    }, [sourceData, filters, sortConfig]);

    const hasData = filters.groupBy === 'none'
        ? processedData.length > 0
        : Object.keys(processedData).length > 0;

    return (
        <div>
            <div>
                <h2>CV Threads (Java)</h2>

                <ThreadFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onFetchData={handleFetchData}
                    isLoading={isLoading}
                />

                {error && (
                    <p className="error-message" role="alert">
                        {error}
                    </p>
                )}

                {hasData ? (
                    <ThreadsTable
                        data={processedData}
                        groupBy={filters.groupBy}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                    />
                ) : (
                    !isLoading && <p className="no-data-message">No data to display. Please select dates and load data.</p>
                )}
            </div>
        </div>
    );
};

export default CVThreadsPage;