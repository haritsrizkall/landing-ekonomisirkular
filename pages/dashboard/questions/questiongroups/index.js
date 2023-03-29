import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import questionGroupAPI from "../../../../api/question_group";
import QuestionGroupAdd from "../../../../components/modal/add/question_group_add";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import QuestionGroupEdit from "../../../../components/modal/edit/question_group_edit";
import Table from "../../../../components/table";

const QuestionGroups = () => {
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "question_group_id": 1,
        "question_set_id": 1,
        "description": "Penghasilan",
        "name": "Penghasilan",
    });
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(questionGroupAPI.deleteQuestionGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries("questionGroups")
        }
    })
    const { isError, isLoading, data: questionGroups, status, error } = useQuery("questionGroups", () => questionGroupAPI.getAll(null, null));
    const data = useMemo(
        () => questionGroups,
        [questionGroups]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'question_group_id',
            },
            {
                Header: 'Question Set',
                accessor: 'question_set.name',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            }
        ]
    )
    const initialState = {
        hiddenColumns: ['question_group_id'],
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
            id: "Action",
            Header: "Action",
            Cell: ({ row }) => (
                <div className="flex">
                    
                    <button
                      className="bg-blue-400 px-5 py-2 rounded mr-3"
                      onClick={() =>{
                          setSelectedData(row.original);
                          setEditModal(true);
                      }}>
                      Edit
                    </button>
                    <button
                      className="bg-red-400 px-5 py-2 rounded"
                      onClick={() =>{
                          setSelectedData(row.original);
                          setDeleteModal(true);
                      }}>
                      Delete
                    </button>

                </div>
            ),
          },
        ]);
    };
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.question_group_id);
        setDeleteModal(false);
    }
    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <QuestionGroupAdd isVisible={addModal} setIsVisible={setAddModal}/>
            <QuestionGroupEdit isVisible={editModal} setIsVisible={setEditModal} questionGroup={selectedData}/>
            <DeleteConfirmationModal isVisible={deleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
            <div className="mx-5 py-10">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Question Group</button>
            {
                mutationDelete.isError && <div onClick={() => {
                    mutationDelete.reset()
                }} className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {mutationDelete.error.message}</div>
            }
            {
                mutationDelete.isSuccess && <div onClick={() => {
                    mutationDelete.reset()
                }
                } className="bg-green-500 text-white p-3 rounded mb-5 cursor-pointer">Success</div>
            }
            {
                isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
            }
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                {
                    questionGroups && (
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

export default QuestionGroups