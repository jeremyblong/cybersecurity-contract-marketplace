import React, { Fragment, useMemo, useCallback, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import "./styles.css";
import Breadcrumb from '../../../../layout/breadcrumb';
import axios from "axios";

const TableHelper = ({ columns: userColumns, data, renderRowSubComponent }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        state: {  }
    } = useTable(
    {
        columns: userColumns,
        data,
    },
        useSortBy
    )

    return (
    <>
        <Breadcrumb parent="View/Manage Leaderboard Data & Statistics!" title="These Are 'The Top' Ranked User's On Our Marketplace" />
        <table id={"full-stretch-table"} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                        <span>
                            {column.isSorted
                            ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                            : ''}
                        </span>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <React.Fragment {...row.getRowProps()}>
                            <tr>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                            {row.isExpanded ? (
                                <tr>
                                <td colSpan={visibleColumns.length}>
                                    {renderRowSubComponent({ row })}
                                </td>
                            </tr>
                        ) : null}
                        </React.Fragment>
                    )
                })}
            </tbody>
        </table>
    </>
    )
}

const LeaderboardHomepageHelper = (props) => {

    const [ hackers, setHackers ] = useState([]);

    const columns = useMemo(() => [
        {
            Header: 'Name + Username',
            columns: [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Username',
                accessor: 'username',
            }
            ],
        },
        {
            Header: 'Info & Other Related Statistics',
            columns: [
            {
                Header: 'Unique Profile View(s)',
                accessor: 'totalUniqueViews',
            },
            {
                Header: 'Review(s) Total Count',
                accessor:(data) => data.reviews.length
            },
            {
                Header: 'Profile Hearts/Saves',
                accessor:(data) => typeof data.profileLovesHearts !== "undefined" && data.profileLovesHearts.length > 0 ? data.profileLovesHearts.length : 0
            },
            {
                Header: 'Follow(ing)',
                accessor:(data) => typeof data.followingHackers !== "undefined" && data.followingHackers.length > 0 && typeof data.followingCompanies !== "undefined" && data.followingCompanies.length > 0 ? data.followingHackers.length + data.followingCompanies.length : 0
            },
            {
                Header: 'Follow(ers)',
                accessor:(data) => typeof data.currentlyFollowedBy !== "undefined" && data.currentlyFollowedBy.length > 0 ? data.currentlyFollowedBy.length : 0
            }
            ],
        },
        ],
        []
    );

    console.log("hackers", hackers);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hackers/random/general/leaderboards`).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                setHackers(hackers);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
    const renderRowSubComponent = useCallback(
        ({ row }) => (
            <pre
                style={{
                    fontSize: '10px',
                }}
            >
                <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
            </pre>
        ),
        []
    );
    return (
        <Fragment>
            <TableHelper
                columns={columns}
                data={hackers}
                renderRowSubComponent={renderRowSubComponent}
            />
        </Fragment>
    );
}

export default LeaderboardHomepageHelper;