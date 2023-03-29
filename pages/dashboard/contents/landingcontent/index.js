import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import landingApi from "../../../../api/landing";
import LandingEdit from "../../../../components/modal/edit/landing_edit";
import Table from "../../../../components/table";


const LandingContent = () => {
    const queryClient = useQueryClient();
    const [editModal, setEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "landing_id": 1,
        "position": "landing 1",
        "content": "landing 1 content",
    });
    const { isError, isLoading, data: landings, status, error } = useQuery("landings", landingApi.getAll);
    const data = useMemo(
        () => landings,
        [landings]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'landing_id',
            },
            {
                Header: 'Position',
                accessor: 'position',
            },
            {
                Header: 'Content',
                accessor: 'content',
            },
        ],
    )

    const initialState = {
        hiddenColumns: ['landing_id'],
    }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            {
                id: 'No',
                Header: 'No',
                accessor: 'index',
                Cell: ({ row }) => row.index + 1,
            },
            ...columns,
            {
                id: 'action',
                Header: 'Action',
                Cell: ({ row }) => (
                    <div className="flex">
                        <button
                          className="bg-blue-400 px-5 py-2 rounded mr-3"
                          onClick={() =>{
                            setEditModal(true);
                            setSelectedData(row.original)
                          }}>
                          Edit
                        </button>
                    </div>
                ),
            },
        ]);
    }
    
    return (
        <>
        <LandingEdit isVisible={editModal} setIsVisible={setEditModal} landing={selectedData}/>
        <div className="mx-5 py-10">
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
            <h1>Landing Content</h1>
            {
                landings && (
                    <Table
                        data={data}
                        columns={columns} 
                        tableHooks={tableHooks}
                        initialState={initialState}
                    />
                )
            }
            </div>
        </div>
        </>
    );
}

export default LandingContent;