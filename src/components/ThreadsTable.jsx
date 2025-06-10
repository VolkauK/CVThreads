import React, {Fragment} from 'react';
import './ThreadsTable.css';

const SortIndicator = ({direction}) => (
    <span className="sort-indicator">{direction === 'ASC' ? '▲' : '▼'}</span>
);

const ThreadsTable = ({data, groupBy, sortConfig, onSort}) => {
    const isGrouped = groupBy !== 'none';

    return (
        <table className="threads-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Deal</th>
                <th>Task</th>
                <th
                    onClick={onSort}
                    onKeyDown={(e) => e.key === 'Enter' && onSort()}
                    tabIndex="0"
                >
                    <div>
                        Created
                        <SortIndicator direction={sortConfig.direction}/>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {isGrouped ? (
                Object.entries(data).map(([groupName, items]) => (
                    <Fragment key={groupName}>
                        <tr>
                            <td colSpan="4" className="group-header-cell">
                                {groupName} ({items.length} {items.length > 1 ? 'items' : 'item'})
                            </td>
                        </tr>
                        {items.map((item, index) => <ThreadRow key={index} item={item}/>)}
                    </Fragment>
                ))
            ) : (
                data.map((item, key) => <ThreadRow key={key} item={item}/>)
            )}
            </tbody>
        </table>
    );
};

const ThreadRow = ({item}) => (
    <tr>
        <td>{item.rebus}</td>
        <td>
            <a href={item.deal_url} target="_blank" rel="noopener noreferrer">{item.deal_name}</a>
        </td>
        <td>
            <a href={item.task_url} target="_blank" rel="noopener noreferrer">{item.task_name}</a>
        </td>
        <td>{new Date(item.creation_date).toLocaleString()}</td>
    </tr>
);

export default ThreadsTable;