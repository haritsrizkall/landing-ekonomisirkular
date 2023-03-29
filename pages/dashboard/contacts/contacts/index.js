import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactAPI from "../../../../api/contact";
import ContactAdd from "../../../../components/modal/add/contact_add";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import ContactEdit from "../../../../components/modal/edit/contact_edit";
import Table from "../../../../components/table";

const Contacts = () => {
    const [selectedData, setSelectedData] = useState({
        name: "test",
        value: "test",
    })
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const { isError, isLoading, data: companies, status, error } = useQuery("contacts", contactAPI.getAll);
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(contactAPI.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("contacts")
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
            accessor: 'contact_id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Value',
            accessor: 'value',
          }
        ],
        []
    )
    const initialState = { hiddenColumns: ["contact_id"] };

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
        mutationDelete.mutate(selectedData.contact_id)
        setDeleteModal(false)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return(
      <>
        <ContactAdd isVisible={addModal} setIsVisible={setAddModal}/>
        <ContactEdit isVisible={editModal} setIsVisible={setEditModal} contact={selectedData}/>
        <DeleteConfirmationModal isVisible={deleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
        <div className="mx-5 py-10">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Contact</button>
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

export default Contacts