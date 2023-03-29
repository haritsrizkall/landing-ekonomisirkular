import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import questionGroupAPI from "../../../api/question_group";
import { userAPI } from "../../../api/user";
import QuestionAdd from "../../../components/modal/add/question_add";
import QuestionGroupAdd from "../../../components/modal/add/question_group_add";
import UserAdd from "../../../components/modal/add/user_add";
import DeleteConfirmationModal from "../../../components/modal/delete_confirmation";
import QuestionGroupEdit from "../../../components/modal/edit/question_group_edit";
import UserEdit from "../../../components/modal/edit/user_edit";
import Table from "../../../components/table";

const UserManagement = () => {
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "user_id": 1,
        "email": "email@gmail.com",
        "password": "password",
        "role": "ADMIN"
    });
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(userAPI.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
        }
    })
    const { isError, error, isLoading, data: users, status } = useQuery("users", userAPI.getAll);
    const data = useMemo(
        () => users,
        [users]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'user_id',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: 'role',
            }
        ]
    )
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
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
        mutationDelete.mutate(selectedData.user_id);
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
            <UserAdd isVisible={addModal} setIsVisible={setAddModal}/>
            <UserEdit isVisible={editModal} setIsVisible={setEditModal} user={selectedData}/>
            <DeleteConfirmationModal isVisible={deleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
            <div className="mx-5 py-10">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add User</button>
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
                    users && (
                        <Table
                            data={data}
                            columns={columns}
                            tableHooks={tableHooks}
                        />
                    ) 
                }
            </div>
            </div>
        </>
    )
}

export default UserManagement