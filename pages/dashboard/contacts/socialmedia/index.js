import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactAPI from "../../../../api/contact";
import socialMediaAPI from "../../../../api/social_media";
import ContactAdd from "../../../../components/modal/add/contact_add";
import SocialMediaAdd from "../../../../components/modal/add/social_media_add";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import ContactEdit from "../../../../components/modal/edit/contact_edit";
import SocialMediaEdit from "../../../../components/modal/edit/social_media_edit";
import Table from "../../../../components/table";

const SocialMedias = () => {
    const [selectedData, setSelectedData] = useState({
        name: "test",
        url: "instagram.com",
        img_url: "instagram.png"
    })
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const { isError, isLoading, data: companies, status, error } = useQuery("socialmedias", socialMediaAPI.getAll);
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(socialMediaAPI.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("socialmedias")
        }
    });
    const data = useMemo(
        () => companies,
        [companies]
    )
    const columns = useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'social_media_id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Url',
            accessor: 'url',
          }
        ],
        []
    )
    const initialState = { hiddenColumns: ["social_media_id"] };

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
            <>
            <button
              className="bg-blue-400 px-5 py-2 mr-3 rounded"
              onClick={() =>{
                  setEditModal(true)
                  setSelectedData(row.original)
              }}>
              Edit
            </button>
            <button
            className="bg-red-400 px-5 py-2 rounded"
            onClick={() =>{
                setDeleteModal(true)
                setSelectedData(row.original)
            }}>
                Delete
            </button>
            </>
          ),
        },
      ]);
    };
    const handleCloseDeleteModal = () => {
      setDeleteModal(false)
    }
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.social_media_id)
        setDeleteModal(false)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return(
      <>
        <SocialMediaAdd isVisible={addModal} setIsVisible={setAddModal}/>
        <SocialMediaEdit isVisible={editModal} setIsVisible={setEditModal} socialMedia={selectedData}/>
        <DeleteConfirmationModal isVisible={deleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
        <div className="mx-5 py-10">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Social Media</button>
            {
              isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
            }
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
            {
              companies && (
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

export default SocialMedias