import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import exploreApi from "../../../api/explore";
import ExploreAdd from "../../../components/modal/add/explore_add";
import DeleteConfirmationModal from "../../../components/modal/delete_confirmation";
import ExploreEdit from "../../../components/modal/edit/explore_edit";
import Table from "../../../components/table";


const Explore = () => {
    const queryClient = useQueryClient();
    const { isError, isLoading, data: explores, status, error } = useQuery("explores", exploreApi.getExplores);
    const mutationDelete = useMutation(exploreApi.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("explores")
        }
    })
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "explore_id": 1,
        "title": "explore 1",
        "content": "explore 1 content",
    });
    const data = useMemo(
        () => explores,
        [explores]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'explore_id',
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Content',
                accessor: 'content',
            },
        ],
    )

    const initialState = {
        hiddenColumns: ['explore_id'],
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
                        <button
                          className="bg-red-500 px-5 py-2 rounded"
                          onClick={() => {
                            setDeleteModal(true)
                            setSelectedData(row.original)
                          }}>
                          Delete
                        </button>
    
                    </div>
                ),
            },
        ]);
    }

    const handleCloseModal = () => {
        setAddModal(false);
        setDeleteModal(false);
    }
    
    const handleDelete = (id) => {
        mutationDelete.mutate(id)
        setDeleteModal(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <ExploreEdit
                isVisible={editModal}
                explore={selectedData}  
                setIsVisible={setEditModal}
            />
            <ExploreAdd
                isVisible={addModal}
                setIsVisible={setAddModal}
            />
            <DeleteConfirmationModal 
                isVisible={deleteModal}
                setIsVisible={setDeleteModal}
                handleClose={handleCloseModal}
                handleDelete={() => handleDelete(selectedData.explore_id)}
            />
            <div className="mx-5 py-10">
                <h1>Explore</h1>
                <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                    <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Explore</button>
                    {
                        explores && (
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
    )
}

export default Explore