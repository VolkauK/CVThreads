import React from 'react';
import './ThreadFilters.css';

const ThreadFilters = ({filters, onFilterChange, onFetchData, isLoading}) => {
    const {startDate, endDate, searchTerm, groupBy} = filters;

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        onFilterChange(name, value);
    };

    return (
        <section className="filters">
            <div className="filter-item">
                <label className="filter-label" htmlFor="startDate">Start Date</label>
                <input id="startDate" name="startDate" type="date" value={startDate} onChange={handleInputChange}
                       aria-label="Start Date"/>
            </div>
            <div className="filter-item">
                <label className="filter-label" htmlFor="endDate">End Date</label>
                <input id="endDate" name="endDate" type="date" value={endDate} onChange={handleInputChange}
                       aria-label="End Date"/>
            </div>
            <div className="filter-item">
                <label className="filter-label" htmlFor="searchTerm">Filter by Name</label>
                <input id="searchTerm" name="searchTerm" type="text" placeholder="e.g., John" value={searchTerm}
                       onChange={handleInputChange}
                       aria-label="Filter by Name"/>
            </div>
            <div className="filter-item">
                <label className="filter-label" htmlFor="groupBy">Group By</label>
                <select id="groupBy" name="groupBy" value={groupBy} onChange={handleInputChange}
                        className="filter-input" aria-label="Group By">
                    <option value="none">None</option>
                    <option value="person">Person</option>
                    <option value="ticket">Ticket</option>
                </select>
            </div>
            <div>
                <button onClick={onFetchData} disabled={isLoading} className="load-data-button" aria-live="polite">
                    {isLoading ? 'Loading...' : 'Load Data'}
                </button>
            </div>
        </section>
    );
};

export default ThreadFilters;