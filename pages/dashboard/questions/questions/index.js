import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { questionAPI } from "../../../../api/question";
import QuestionAdd from "../../../../components/modal/add/question_add";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import QuestionEdit from "../../../../components/modal/edit/question_edit";
import Table from "../../../../components/table";

const Questions = () => {
    const { isError, isLoading, data: questions, status, error } = useQuery("questions", questionAPI.getQuestions);
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(questionAPI.deleteQuestion, {
        onSuccess: () => {
            queryClient.invalidateQueries("questions")
        }
    })
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "question_id": 1,
        "question_group_id": 1,
        "question": "Apakah anda memiliki kartu kredit?",
        "question_group": {
            "question_group_id": 1,
            "question_set": {
                "type": "INDIVIDU",
            }
        }
    });
    const data = useMemo(
        () => questions,
        [questions]
    )
    
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'question_id',
            },
            {
                Header: 'Question Set',
                accessor: 'question_group.question_set.type',
            },
            {
                Header: 'Group Name',
                accessor: 'question_group.name',
            },
            {
                Header: 'Question',
                accessor: 'question',
            }
        ]
    )

    const initialState = {
        hiddenColumns: ['question_id'],
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
                          setEditModal(true);
                          setSelectedData(row.original)
                      }}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-5 py-2 rounded"
                      onClick={() =>{
                          setDeleteModal(true)
                          setSelectedData(row.original)
                      }}>
                      Delete
                    </button>

                </div>
            ),
          },
        ]);
    };

    const handleDelete = (id) => {
        mutationDelete.mutate(id)
        setDeleteModal(false)
    }

    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
        setEditModal(false);
    }
    

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
        <QuestionAdd isVisible={addModal} setIsVisible={setAddModal}/>
        <QuestionEdit isVisible={editModal} question={selectedData} setIsVisible={setEditModal} handleEdit={() => {console.log(selectedData)}}/>
        <DeleteConfirmationModal isVisible={deleteModal} handleDelete={() => handleDelete(selectedData.question_id)} handleClose={handleCloseDeleteModal} />
        <div className="mx-5 py-10">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Question</button>
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
                    questions && (
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

export default Questions