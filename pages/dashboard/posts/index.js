import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query"
import postAPI from "../../../api/post";
import DeleteConfirmationModal from "../../../components/modal/delete_confirmation";
import Table from "../../../components/table";


const Posts = () => {
    const queryClient = useQueryClient();
    const { isError, isLoading, data: posts, status, error } = useQuery("posts", () => postAPI.getPosts(null, 1, 30));
    const mutationDelete = useMutation(postAPI.delete,{
        onSuccess: () => {
            queryClient.invalidateQueries("posts")
        }
    })
    const [selectedData, setSelectedData] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const data = useMemo(
        () => posts && posts.data,
        [posts]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'post_id',
            },
            {
                Header: 'User',
                accessor: 'user.email',
            },
            {
                Header: 'Image',
                accessor: 'image',
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Category',
                accessor: 'category.name',
            }
        ]
    )
    const initialState = {
        hiddenColumns: ['post_id'],
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
            accessor: 'action',
            Cell: ({ row }) => (
                <div className="flex">
                    <Link href={`/dashboard/posts/edit/${row.original.post_id}`}>
                        <button
                          className="bg-blue-400 px-5 py-2 rounded mr-3"
                          >
                          Edit
                        </button>
                    </Link>
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
          }
        ])
    }
    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
    }
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.post_id)
        setDeleteModal(false)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
        <DeleteConfirmationModal isVisible={deleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
        <div className="mx-5 py-10">
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                <Link href="/dashboard/posts/add">
                    <a className="bg-blue-500 px-5 py-2 rounded mb-5">Add Post</a>
                </Link>
                {
                    mutationDelete.isError && <div onClick={() => {
                        mutationDelete.reset()
                    }} className="bg-red-500 text-white p-3 rounded mt-5 cursor-pointer">Error: {mutationDelete.error.message}</div>
                }
                {
                    mutationDelete.isSuccess && <div onClick={() => {
                        mutationDelete.reset()
                    }
                    } className="bg-green-500 text-white p-3 rounded mt-5 cursor-pointer">Success</div>
                }
                {
                    posts.data && (
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

export default Posts