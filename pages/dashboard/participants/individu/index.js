import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useGlobalFilter, useTable } from "react-table"
import { participantAPI } from "../../../../api/participant"
import GlobalFilter from "../../../../components/globalFilter"
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation"
import IndividuDetailModal from "../../../../components/modal/detail/individu_detail"
import Table from "../../../../components/table"


const ParticipantsIndividu = () => {
    const [selectedData, setSelectedData] = useState({
      "participant_id": "",
      "name": "",
      "type": "",
      "createdAt": "",
      "updatedAt": "",
      "question_group": {
        "question_group_id": "",
        "question_set": {
          "type": "",
        }
      },
      "individu": {
          "individu_id": "",
          "participant_id": "",
          "age": "",
          "occupation": "",
          "income_monthly": "",
          "expense_monthly": "",
          "email": "",
          "no_hp": "",
          "createdAt": "",
          "updatedAt": ""
      }
    })
    const [loadingDownload, setLoadingDownload] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const { isError, isLoading, data: individus, status, error } = useQuery("participants", participantAPI.getIndividus);
    const data = useMemo(
        () => individus,
        [individus]
    )
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(participantAPI.deleteParticipant, {
      onSuccess: () => {
        queryClient.invalidateQueries("participants")
      }
    })

    const columns = useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'participant_id',
          },
          {
            Header: 'Name',
            accessor: 'name', 
          },
          {
            Header: 'Age',
            accessor: 'individu.age'
          },
          {
            Header: 'Occupation',
            accessor: 'individu.occupation'
          },
          {
            Header: 'Email',
            accessor: 'individu.email'
          },
          {
            Header: 'No HP',
            accessor: 'individu.no_hp'
          }
        ],
        []
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
                    className="bg-blue-400 px-5 py-2 rounded"
                    onClick={() =>{
                        setSelectedData(row.original);
                        setShowModal(true)
                    }}>
                    Detail
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

    const initialState = { hiddenColumns: ["participant_id"] };

    const handleClose = () => {
        setShowModal(false)
    }

    const handleDownload = (e) => {
        e.preventDefault()
        setLoadingDownload(true)
        participantAPI.downloadIndividus().then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'participants_individu.xlsx');
            document.body.appendChild(link);
            link.click();
            setLoadingDownload(false)
        })
    }
    const handleCloseDeleteModal = () => {
      setDeleteModal(false);
    }
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.participant_id);
        setDeleteModal(false);
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return(
      <>
        <DeleteConfirmationModal isVisible={deleteModal} handleDelete={handleDelete} handleClose={handleCloseDeleteModal} />
        <IndividuDetailModal isVisible={showModal} data={selectedData} handleClose={handleClose}/>
        <div className="mx-5 py-10">
            <h1 className="mb-5">Participants Individu</h1>
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={handleDownload}>Download</button>
            {
              isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
            }
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                {
                  individus && (
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

export default ParticipantsIndividu